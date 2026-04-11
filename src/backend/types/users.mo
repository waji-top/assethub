import Common "common";

module {
  public type User = {
    id : Common.UserId;
    var username : Text;
    var email : Text;
    var tier : Common.UserTier;
    var downloadCount : Nat;
    downloadLimit : Nat;
    createdAt : Common.Timestamp;
  };

  public type UserPublic = {
    id : Common.UserId;
    username : Text;
    email : Text;
    tier : Common.UserTier;
    downloadCount : Nat;
    downloadLimit : Nat;
    createdAt : Common.Timestamp;
  };

  public type DownloadRecord = {
    assetId : Common.AssetId;
    assetTitle : Text;
    downloadedAt : Common.Timestamp;
    format : Text;
  };
};
