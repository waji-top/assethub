import Common "../types/common";
import Types "../types/subscriptions";
import UserTypes "../types/users";
import Map "mo:core/Map";

module {
  public func recordStripeSession(
    sessions : Map.Map<Text, Types.StripeSession>,
    sessionId : Text,
    userId : Common.UserId,
    createdAt : Common.Timestamp,
  ) : () {
    let session : Types.StripeSession = {
      sessionId;
      userId;
      createdAt;
    };
    sessions.add(sessionId, session);
  };

  public func activatePremium(
    sessions : Map.Map<Text, Types.StripeSession>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    sessionId : Text,
  ) : Bool {
    switch (sessions.get(sessionId)) {
      case null { false };
      case (?session) {
        switch (users.get(session.userId)) {
          case null { false };
          case (?user) {
            user.tier := #premium;
            true;
          };
        };
      };
    };
  };

  public func getStatus(
    users : Map.Map<Common.UserId, UserTypes.User>,
    sessions : Map.Map<Text, Types.StripeSession>,
    userId : Common.UserId,
  ) : Types.SubscriptionStatus {
    let tier = switch (users.get(userId)) {
      case null { #free };
      case (?user) { user.tier };
    };
    // Find any session for the user
    var foundSessionId : ?Text = null;
    for ((key, session) in sessions.entries()) {
      if (session.userId == userId) {
        foundSessionId := ?session.sessionId;
      };
    };
    { tier; sessionId = foundSessionId };
  };
};
