import { useActor } from "@caffeineai/core-infrastructure";
import type { createActorFunction } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

// Wrap createActor to match the createActorFunction<T> signature expected by useActor
const createBackendActor: createActorFunction<backendInterface> = (
  canisterId,
  uploadFile,
  downloadFile,
  options,
) => createActor(canisterId, uploadFile, downloadFile, options);

export function useBackend() {
  return useActor<backendInterface>(createBackendActor);
}
