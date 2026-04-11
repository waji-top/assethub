import { S as SortOrder, G as useBackend, H as useQuery, J as useQueryClient, K as useMutation } from "./index-AQ6D2SeO.js";
const DEFAULT_PAGE = { offset: 0n, limit: 20n };
const EMPTY_FILTER = {
  tags: []
};
function useListAssets(filter = EMPTY_FILTER, sort = SortOrder.newest, page = DEFAULT_PAGE) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["assets", filter, sort, page],
    queryFn: async () => {
      if (!actor) return { total: 0n, offset: 0n, items: [] };
      return actor.listAssets(filter, sort, page);
    },
    enabled: !!actor && !isFetching
  });
}
function useSearchAssets(keyword, page = DEFAULT_PAGE) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["search", keyword, page],
    queryFn: async () => {
      if (!actor) return { total: 0n, offset: 0n, items: [] };
      return actor.searchAssets(keyword, page);
    },
    enabled: !!actor && !isFetching && keyword.length > 0
  });
}
function useAsset(id) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["asset", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getAsset(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useIncrementDownload() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assetId) => {
      if (!actor) throw new Error("Not connected");
      return actor.incrementDownloadCount(assetId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    }
  });
}
function useTrackDownload() {
  const { actor } = useBackend();
  return useMutation({
    mutationFn: async ({
      assetId,
      format
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.trackDownload(assetId, format);
    }
  });
}
export {
  useSearchAssets as a,
  useAsset as b,
  useIncrementDownload as c,
  useTrackDownload as d,
  useListAssets as u
};
