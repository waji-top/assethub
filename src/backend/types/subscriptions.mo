import Common "common";

module {
  public type StripeSession = {
    sessionId : Text;
    userId : Common.UserId;
    createdAt : Common.Timestamp;
  };

  public type SubscriptionStatus = {
    tier : Common.UserTier;
    sessionId : ?Text;
  };
};
