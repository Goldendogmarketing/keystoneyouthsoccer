import { u as useBaseQuery, Q as QueryObserver, d as defaultThrowOnError } from "./useBaseQuery-DdO5QD3T.mjs";
function useSuspenseQuery(options, queryClient) {
  return useBaseQuery(
    {
      ...options,
      enabled: true,
      suspense: true,
      throwOnError: defaultThrowOnError,
      placeholderData: void 0
    },
    QueryObserver
  );
}
export {
  useSuspenseQuery as u
};
