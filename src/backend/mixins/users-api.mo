import Common "../types/common";
import Types "../types/users";
import AssetTypes "../types/assets";
import UserLib "../lib/users";
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  users : Map.Map<Common.UserId, Types.User>,
  downloads : Map.Map<Common.UserId, List.List<Types.DownloadRecord>>,
  assets : List.List<AssetTypes.Asset>,
) {
  public shared ({ caller }) func upsertUser(
    username : Text,
    email : Text,
  ) : async Types.UserPublic {
    let user = UserLib.upsertUser(users, caller, username, email, Time.now());
    UserLib.toPublic(user);
  };

  public shared query ({ caller }) func getMyProfile() : async ?Types.UserPublic {
    switch (UserLib.getUser(users, caller)) {
      case null { null };
      case (?user) { ?UserLib.toPublic(user) };
    };
  };

  public shared ({ caller }) func trackDownload(
    assetId : Common.AssetId,
    format : Text,
  ) : async Bool {
    switch (UserLib.getUser(users, caller)) {
      case null { false };
      case (?user) {
        if (not UserLib.canDownload(user)) { return false };
        let assetTitle = switch (assets.find(func(a) { a.id == assetId })) {
          case null { "" };
          case (?a) { a.title };
        };
        UserLib.trackDownload(users, downloads, caller, assetId, assetTitle, format, Time.now());
        true;
      };
    };
  };

  public shared query ({ caller }) func listMyDownloads() : async [Types.DownloadRecord] {
    UserLib.listDownloads(downloads, caller);
  };

  public shared query ({ caller }) func canDownload() : async Bool {
    switch (UserLib.getUser(users, caller)) {
      case null { false };
      case (?user) { UserLib.canDownload(user) };
    };
  };
};
