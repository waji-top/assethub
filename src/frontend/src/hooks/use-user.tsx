import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SubscriptionStatus, UserPublic } from "../types";
import { UserTier } from "../types";
import { useBackend } from "./use-backend";

export function useMyProfile() {
  const { actor, isFetching } = useBackend();
  return useQuery<UserPublic | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMyProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpsertUser() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      email,
    }: { username: string; email: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.upsertUser(username, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useDownloadHistory() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["downloads"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyDownloads();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCanDownload() {
  const { actor, isFetching } = useBackend();
  return useQuery<boolean>({
    queryKey: ["canDownload"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.canDownload();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscriptionStatus() {
  const { actor, isFetching } = useBackend();
  return useQuery<SubscriptionStatus>({
    queryKey: ["subscription"],
    queryFn: async () => {
      if (!actor) return { tier: UserTier.free } as SubscriptionStatus;
      return actor.getSubscriptionStatus();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useActivatePremium() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sessionId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.activatePremium(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
