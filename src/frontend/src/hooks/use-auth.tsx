import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Identity } from "@icp-sdk/core/agent";

export interface AuthState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  identity: Identity | undefined;
  principal: string | undefined;
  login: () => void;
  logout: () => void;
}

export function useAuth(): AuthState {
  const { identity, login, clear, loginStatus, isInitializing, isLoggingIn } =
    useInternetIdentity();

  const isAuthenticated =
    loginStatus === "success" || (!!identity && loginStatus === "idle");
  const principal = identity?.getPrincipal()?.toString();

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principal,
    login,
    logout: clear,
  };
}
