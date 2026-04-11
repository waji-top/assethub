import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Asset,
  AssetFilter,
  AssetPage,
  AssetType,
  PageRequest,
  SortOrder,
} from "../types";
import { SortOrder as SortOrderEnum } from "../types";
import { useBackend } from "./use-backend";

const DEFAULT_PAGE: PageRequest = { offset: 0n, limit: 20n };

const EMPTY_FILTER: AssetFilter = {
  tags: [],
};

export function useListAssets(
  filter: AssetFilter = EMPTY_FILTER,
  sort: SortOrder = SortOrderEnum.newest,
  page: PageRequest = DEFAULT_PAGE,
) {
  const { actor, isFetching } = useBackend();
  return useQuery<AssetPage>({
    queryKey: ["assets", filter, sort, page],
    queryFn: async () => {
      if (!actor) return { total: 0n, offset: 0n, items: [] };
      return actor.listAssets(filter, sort, page);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchAssets(
  keyword: string,
  page: PageRequest = DEFAULT_PAGE,
) {
  const { actor, isFetching } = useBackend();
  return useQuery<AssetPage>({
    queryKey: ["search", keyword, page],
    queryFn: async () => {
      if (!actor) return { total: 0n, offset: 0n, items: [] };
      return actor.searchAssets(keyword, page);
    },
    enabled: !!actor && !isFetching && keyword.length > 0,
  });
}

export function useAsset(id: bigint | null) {
  const { actor, isFetching } = useBackend();
  return useQuery<Asset | null>({
    queryKey: ["asset", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getAsset(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useIncrementDownload() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assetId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return actor.incrementDownloadCount(assetId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}

export function useTrackDownload() {
  const { actor } = useBackend();
  return useMutation({
    mutationFn: async ({
      assetId,
      format,
    }: { assetId: bigint; format: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.trackDownload(assetId, format);
    },
  });
}

export function useAssetsByType(
  assetType: AssetType,
  page: PageRequest = DEFAULT_PAGE,
) {
  const filter: AssetFilter = { tags: [], assetType };
  return useListAssets(filter, SortOrderEnum.newest, page);
}
