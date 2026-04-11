module {
  public type AssetId = Nat;
  public type UserId = Principal;
  public type CollectionId = Nat;
  public type Timestamp = Int;

  public type SortOrder = {
    #relevance;
    #newest;
    #mostDownloaded;
  };

  public type AssetType = {
    #vector;
    #photo;
    #illustration;
    #template;
    #icon;
    #threeD;
    #font;
  };

  public type License = {
    #free;
    #premium;
  };

  public type UserTier = {
    #free;
    #premium;
  };

  public type PageRequest = {
    offset : Nat;
    limit : Nat;
  };
};
