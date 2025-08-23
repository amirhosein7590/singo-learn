/**
 * Handles mutations (POST, PUT, DELETE, etc.) with optional headers and dynamic URL parameters.
 * Wraps React Query's useMutation.
 *
 * @param {string} key - Unique key for mutation.
 * @param {Array} deps - Dependencies to include in the queryKey.
 * @param {string} url - URL endpoint; supports dynamic params (e.g., '/users/:id').
 * @param {Object|null} headers - Optional headers for the request.
 * @param {string} reqType - HTTP method (e.g., 'post', 'put', 'delete').
 * @param {boolean} [isPrivate=false] - Use private axios instance if true.
 * @returns {Object} - Returns mutation object with mutate, mutateAsync, isPending, data, and error.
 */

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
  
  const mutateAsync = (data = null , options = {})=>{
    const finalUrl = injectParamsIntoUrl(url, options.urlParams);
    return baseMutation.mutateAsync({data , finalUrl} , options)
  }

  return {
    ...baseMutation,
    mutate,
    mutateAsync
  };
}

export default useMutate;
