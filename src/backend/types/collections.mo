import Common "common";
import Assets "assets";

module {
  public type Collection = {
    id : Common.CollectionId;
    userId : Common.UserId;
    var name : Text;
    var assetIds : [Common.AssetId];
    createdAt : Common.Timestamp;
  };

  public type CollectionPublic = {
    id : Common.CollectionId;
    userId : Common.UserId;
    name : Text;
    assetIds : [Common.AssetId];
    createdAt : Common.Timestamp;
  };

  public type CollectionWithAssets = {
    id : Common.CollectionId;
    userId : Common.UserId;
    name : Text;
    assets : [Assets.Asset];
    createdAt : Common.Timestamp;
  };
};
