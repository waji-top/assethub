import Common "common";

module {
  public type AssetFile = {
    format : Text;
    url : Text;
    license : Common.License;
  };

  public type Asset = {
    id : Common.AssetId;
    title : Text;
    description : Text;
    assetType : Common.AssetType;
    category : Text;
    tags : [Text];
    thumbnailUrl : Text;
    previewUrls : [Text];
    fileFormats : [AssetFile];
    dimensions : ?{ width : Nat; height : Nat };
    license : Common.License;
    downloadCount : Nat;
    authorId : Common.UserId;
    authorName : Text;
    createdAt : Common.Timestamp;
  };

  public type AssetFilter = {
    assetType : ?Common.AssetType;
    category : ?Text;
    license : ?Common.License;
    orientation : ?{ #landscape; #portrait; #square };
    tags : [Text];
  };

  public type AssetPage = {
    items : [Asset];
    total : Nat;
    offset : Nat;
  };
};
