import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiGet } from "../utils/api";
import { AWS_URL } from '../../env.json';

const API_URL =
 AWS_URL

export const useGetCountriesQuery = () => {
  return useQuery(["country"], [`${API_URL}/country`], () =>
    apiGet(`${API_URL}/country`)
   )}
 
export const useGetCountriesMutation = () => {
  const queryClient = useQueryClient();
  return useMutation([`${API_URL}/country`],() =>
    apiGet(`${API_URL}/country`),
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
      queryClient.setQueryData(["country"], newUser);
    },
    onError: (error, payload, { prevUserData }) => {
      queryClient.setQueryData(["country"], prevUserData);
    },
  });
};
