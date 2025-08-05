import { useMutation } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import axiosPrivate from "../api/axiosPrivate";

function injectParamsIntoUrl(url, urlParams) {
  if (!urlParams) return url;
  let finalUrl = url;
  Object.entries(urlParams).forEach(([key, value]) => {
    finalUrl = finalUrl.replace(`:${key}`, value);
  });
  return finalUrl;
}

function useMutate(key, deps, url, headers = null, reqType, isPrivate = false) {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  const baseMutation = useMutation({
    mutationKey: [key, deps],

    mutationFn: ({ data, finalUrl }) => {
      const config = headers ? { headers } : undefined;
      return client[reqType](finalUrl, data, config).then((res) => res.data);
    },
  });

  const mutate = (data = null, options = {}) => {
    const finalUrl = injectParamsIntoUrl(url, options.urlParams);
    baseMutation.mutate({ data, finalUrl }, options);
  };

  return {
    ...baseMutation,
    mutate,
  };
}

export default useMutate;
