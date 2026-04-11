import CommonTypes "types/common";
import AssetTypes "types/assets";
import UserTypes "types/users";
import CollectionTypes "types/collections";
import SubscriptionTypes "types/subscriptions";
import AssetsMixin "mixins/assets-api";
import UsersMixin "mixins/users-api";
import CollectionsMixin "mixins/collections-api";
import SubscriptionsMixin "mixins/subscriptions-api";
import AssetLib "lib/assets";
import List "mo:core/List";
import Map "mo:core/Map";

actor {
  // Asset state
  let assets = List.empty<AssetTypes.Asset>();
  var nextAssetId : Nat = AssetLib.seedAssets(assets, 0);

  // User state
  let users = Map.empty<CommonTypes.UserId, UserTypes.User>();
  let downloads = Map.empty<CommonTypes.UserId, List.List<UserTypes.DownloadRecord>>();

  // Collection state
  let collections = List.empty<CollectionTypes.Collection>();

  // Subscription state
  let sessions = Map.empty<Text, SubscriptionTypes.StripeSession>();

  include AssetsMixin(assets, nextAssetId);
  include UsersMixin(users, downloads, assets);
  include CollectionsMixin(collections, assets);
  include SubscriptionsMixin(sessions, users);
};
