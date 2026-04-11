import Common "../types/common";
import Types "../types/collections";
import AssetTypes "../types/assets";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

module {
  public func createCollection(
    collections : List.List<Types.Collection>,
    nextId : Nat,
    userId : Common.UserId,
    name : Text,
    createdAt : Common.Timestamp,
  ) : Types.Collection {
    let collection : Types.Collection = {
      id = nextId;
      userId;
      var name;
      var assetIds = [];
      createdAt;
    };
    collections.add(collection);
    collection;
  };

  public func getCollection(
    collections : List.List<Types.Collection>,
    id : Common.CollectionId,
  ) : ?Types.Collection {
    collections.find(func(c) { c.id == id });
  };

  public func listUserCollections(
    collections : List.List<Types.Collection>,
    userId : Common.UserId,
  ) : [Types.CollectionPublic] {
    let filtered = collections.filter(func(c) { c.userId == userId });
    filtered.map<Types.Collection, Types.CollectionPublic>(func(c) { toPublic(c) }).toArray();
  };

  public func addAssetToCollection(
    collections : List.List<Types.Collection>,
    id : Common.CollectionId,
    userId : Common.UserId,
    assetId : Common.AssetId,
  ) : () {
    switch (collections.find(func(c) { c.id == id })) {
      case null { Runtime.trap("Collection not found") };
      case (?col) {
        if (col.userId != userId) { Runtime.trap("Unauthorized") };
        // Only add if not already present
        let alreadyPresent = col.assetIds.find(func(a) { a == assetId });
        switch (alreadyPresent) {
          case (?_) { () };
          case null {
            col.assetIds := col.assetIds.concat<Common.AssetId>([assetId]);
          };
        };
      };
    };
  };

  public func removeAssetFromCollection(
    collections : List.List<Types.Collection>,
    id : Common.CollectionId,
    userId : Common.UserId,
    assetId : Common.AssetId,
  ) : () {
    switch (collections.find(func(c) { c.id == id })) {
      case null { Runtime.trap("Collection not found") };
      case (?col) {
        if (col.userId != userId) { Runtime.trap("Unauthorized") };
        col.assetIds := col.assetIds.filter<Common.AssetId>(func(a) { a != assetId });
      };
    };
  };

  public func deleteCollection(
    collections : List.List<Types.Collection>,
    id : Common.CollectionId,
    userId : Common.UserId,
  ) : () {
    switch (collections.findIndex(func(c) { c.id == id })) {
      case null { Runtime.trap("Collection not found") };
      case (?idx) {
        let col = collections.at(idx);
        if (col.userId != userId) { Runtime.trap("Unauthorized") };
        // Shift remaining elements: filter by removing the one at idx
        let arr = collections.toArray();
        let filtered = arr.filter(func(c) { c.id != id });
        collections.clear();
        for (c in filtered.values()) {
          collections.add(c);
        };
      };
    };
  };

  public func getCollectionWithAssets(
    collections : List.List<Types.Collection>,
    assets : List.List<AssetTypes.Asset>,
    id : Common.CollectionId,
    userId : Common.UserId,
  ) : ?Types.CollectionWithAssets {
    switch (collections.find(func(c) { c.id == id })) {
      case null { null };
      case (?col) {
        if (col.userId != userId) { null } else {
          let resolvedAssets = col.assetIds.filterMap(
            func(aid) {
              assets.find(func(a) { a.id == aid });
            },
          );
          ?{
            id = col.id;
            userId = col.userId;
            name = col.name;
            assets = resolvedAssets;
            createdAt = col.createdAt;
          };
        };
      };
    };
  };

  public func toPublic(collection : Types.Collection) : Types.CollectionPublic {
    {
      id = collection.id;
      userId = collection.userId;
      name = collection.name;
      assetIds = collection.assetIds;
      createdAt = collection.createdAt;
    };
  };
};
