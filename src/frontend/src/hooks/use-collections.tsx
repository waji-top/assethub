import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AssetId,
  CollectionId,
  CollectionPublic,
  CollectionWithAssets,
} from "../types";
import { useBackend } from "./use-backend";

export function useMyCollections() {
  const { actor, isFetching } = useBackend();
  return useQuery<CollectionPublic[]>({
    queryKey: ["collections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyCollections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCollection(id: CollectionId | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<CollectionWithAssets | null>({
    queryKey: ["collection", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCollectionWithAssets(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useCreateCollection() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCollection(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}

export function useDeleteCollection() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: CollectionId) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteCollection(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}

export function useAddToCollection() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      collectionId,
      assetId,
    }: { collectionId: CollectionId; assetId: AssetId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addAssetToCollection(collectionId, assetId);
    },
    onSuccess: (_data, { collectionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["collection", collectionId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}

export function useRemoveFromCollection() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      collectionId,
      assetId,
    }: { collectionId: CollectionId; assetId: AssetId }) => {
      if (!actor) throw new Error("Not connected");
      return actor.removeAssetFromCollection(collectionId, assetId);
    },
    onSuccess: (_data, { collectionId }) => {
      queryClient.invalidateQueries({
        queryKey: ["collection", collectionId.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
  });
}
