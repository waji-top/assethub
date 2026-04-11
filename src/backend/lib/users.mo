import Common "../types/common";
import Types "../types/users";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

module {
  public let FREE_DOWNLOAD_LIMIT : Nat = 10;
  public let PREMIUM_DOWNLOAD_LIMIT : Nat = 1_000_000;

  public func getUser(
    users : Map.Map<Common.UserId, Types.User>,
    id : Common.UserId,
  ) : ?Types.User {
    users.get(id);
  };

  public func upsertUser(
    users : Map.Map<Common.UserId, Types.User>,
    id : Common.UserId,
    username : Text,
    email : Text,
    createdAt : Common.Timestamp,
  ) : Types.User {
    switch (users.get(id)) {
      case (?existing) {
        existing.username := username;
        existing.email := email;
        existing;
      };
      case null {
        let user : Types.User = {
          id;
          var username;
          var email;
          var tier = #free;
          var downloadCount = 0;
          downloadLimit = FREE_DOWNLOAD_LIMIT;
          createdAt;
        };
        users.add(id, user);
        user;
      };
    };
  };

  public func toPublic(user : Types.User) : Types.UserPublic {
    {
      id = user.id;
      username = user.username;
      email = user.email;
      tier = user.tier;
      downloadCount = user.downloadCount;
      downloadLimit = user.downloadLimit;
      createdAt = user.createdAt;
    };
  };

  public func canDownload(user : Types.User) : Bool {
    switch (user.tier) {
      case (#premium) true;
      case (#free) user.downloadCount < user.downloadLimit;
    };
  };

  public func trackDownload(
    users : Map.Map<Common.UserId, Types.User>,
    downloads : Map.Map<Common.UserId, List.List<Types.DownloadRecord>>,
    userId : Common.UserId,
    assetId : Common.AssetId,
    assetTitle : Text,
    format : Text,
    downloadedAt : Common.Timestamp,
  ) : () {
    switch (users.get(userId)) {
      case null { () };
      case (?user) {
        user.downloadCount += 1;
        let record : Types.DownloadRecord = {
          assetId;
          assetTitle;
          downloadedAt;
          format;
        };
        let list = switch (downloads.get(userId)) {
          case (?existing) existing;
          case null {
            let newList = List.empty<Types.DownloadRecord>();
            downloads.add(userId, newList);
            newList;
          };
        };
        list.add(record);
      };
    };
  };

  public func listDownloads(
    downloads : Map.Map<Common.UserId, List.List<Types.DownloadRecord>>,
    userId : Common.UserId,
  ) : [Types.DownloadRecord] {
    switch (downloads.get(userId)) {
      case null { [] };
      case (?list) { list.toArray() };
    };
  };

  public func activatePremium(
    users : Map.Map<Common.UserId, Types.User>,
    userId : Common.UserId,
  ) : () {
    switch (users.get(userId)) {
      case null { () };
      case (?user) {
        user.tier := #premium;
      };
    };
  };
};
