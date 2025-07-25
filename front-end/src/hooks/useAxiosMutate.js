import { useMutation } from "@tanstack/react-query";
import axiosPublic from "../api/axiosPublic";
import axiosPrivate from "../api/axiosPrivate";

function useMutate(key, deps, url , headers = null, reqType, isPrivate = false) {
  const client = isPrivate ? axiosPrivate : axiosPublic;

  return useMutation({
    mutationKey: [key, deps],
    mutationFn: (data) => {
      if (!headers){
        return client[reqType](url, data).then((res) => res.data)
      }
      else {
        return client[reqType](url, data , {headers}).then((res) => res.data)
      }
    }
  });
}

export default useMutate;
