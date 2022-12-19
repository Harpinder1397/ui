import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGet } from "../utils/api";
import { AWS_URL } from '../../env.json';
import qs from "query-string";

const API_URL =
 AWS_URL

export const useGetStateQuery = () => {
  return useQuery(["state"], [`${API_URL}/state`], () =>
    apiGet(`${API_URL}/state`)
   )}
 
export const useGetStateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/state`],(payload) =>
    apiGet(`${API_URL}/state?${qs.stringify(payload)}`),
    {
    // onMutate: async () => {
    //   await queryClient.cancelQueries("user");

    //   const prevUserData = queryClient.getQueryData(["user"]);

    //   queryClient.setQueryData(["user"], (prevData) => ({
    //     ...prevData,
    //   }));

    //   return { prevUserData };
    // },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["state"], newUser);
    },
    onError: (error, payload, { prevUserData }) => {
      queryClient.setQueryData(["state"], prevUserData);
    },
  });
};
