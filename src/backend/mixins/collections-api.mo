import Common "../types/common";
import Types "../types/collections";
import AssetTypes "../types/assets";
import CollectionLib "../lib/collections";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  collections : List.List<Types.Collection>,
  assets : List.List<AssetTypes.Asset>,
) {
  var nextCollectionId : Nat = 0;

  public shared ({ caller }) func createCollection(name : Text) : async Types.CollectionPublic {
    let col = CollectionLib.createCollection(collections, nextCollectionId, caller, name, Time.now());
    nextCollectionId += 1;
    CollectionLib.toPublic(col);
  };

  public shared ({ caller }) func addAssetToCollection(
    id : Common.CollectionId,
    assetId : Common.AssetId,
  ) : async () {
    CollectionLib.addAssetToCollection(collections, id, caller, assetId);
  };

  public shared ({ caller }) func removeAssetFromCollection(
    id : Common.CollectionId,
    assetId : Common.AssetId,
  ) : async () {
    CollectionLib.removeAssetFromCollection(collections, id, caller, assetId);
  };

  public shared query ({ caller }) func listMyCollections() : async [Types.CollectionPublic] {
    CollectionLib.listUserCollections(collections, caller);
  };

  public shared ({ caller }) func getCollectionWithAssets(
    id : Common.CollectionId,
  ) : async ?Types.CollectionWithAssets {
    CollectionLib.getCollectionWithAssets(collections, assets, id, caller);
  };

  public shared ({ caller }) func deleteCollection(id : Common.CollectionId) : async () {
    CollectionLib.deleteCollection(collections, id, caller);
  };
};
