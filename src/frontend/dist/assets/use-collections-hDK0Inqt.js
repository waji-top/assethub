import { c as createLucideIcon, G as useBackend, H as useQuery, J as useQueryClient, K as useMutation } from "./index-AQ6D2SeO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
];
const FolderOpen = createLucideIcon("folder-open", __iconNode);
function useMyCollections() {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyCollections();
    },
    enabled: !!actor && !isFetching
  });
}
function useCollection(id) {
  const { actor, isFetching } = useBackend();
  return useQuery({
    queryKey: ["collection", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === null) return null;
      return actor.getCollectionWithAssets(id);
    },
    enabled: !!actor && !isFetching && id !== null
  });
}
function useCreateCollection() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name) => {
      if (!actor) throw new Error("Not connected");
      return actor.createCollection(name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    }
  });
}
function useDeleteCollection() {
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteCollection(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    }
  });
}
export {
  FolderOpen as F,
  useCreateCollection as a,
  useDeleteCollection as b,
  useCollection as c,
  useMyCollections as u
};
