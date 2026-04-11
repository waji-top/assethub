import Common "../types/common";
import Types "../types/subscriptions";
import UserTypes "../types/users";
import SubscriptionLib "../lib/subscriptions";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  sessions : Map.Map<Text, Types.StripeSession>,
  users : Map.Map<Common.UserId, UserTypes.User>,
) {
  public shared ({ caller }) func recordStripeSession(sessionId : Text) : async () {
    SubscriptionLib.recordStripeSession(sessions, sessionId, caller, Time.now());
  };

  public shared ({ caller }) func activatePremium(sessionId : Text) : async Bool {
    SubscriptionLib.activatePremium(sessions, users, sessionId);
  };

  public shared query ({ caller }) func getSubscriptionStatus() : async Types.SubscriptionStatus {
    SubscriptionLib.getStatus(users, sessions, caller);
  };
};
