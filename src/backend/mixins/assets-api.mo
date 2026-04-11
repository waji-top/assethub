import Common "../types/common";
import Types "../types/assets";
import AssetLib "../lib/assets";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  assets : List.List<Types.Asset>,
  nextAssetId : Nat,
) {
  public shared query func listAssets(
    filter : Types.AssetFilter,
    sort : Common.SortOrder,
    page : Common.PageRequest,
  ) : async Types.AssetPage {
    AssetLib.listAssets(assets, filter, sort, page);
  };

  public shared query func getAsset(id : Common.AssetId) : async ?Types.Asset {
    AssetLib.getAsset(assets, id);
  };

  public shared query func searchAssets(
    keyword : Text,
    page : Common.PageRequest,
  ) : async Types.AssetPage {
    AssetLib.searchAssets(assets, keyword, page);
  };

  public shared func incrementDownloadCount(id : Common.AssetId) : async () {
    AssetLib.incrementDownloadCount(assets, id);
  };
};
