import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

export const callApi = async (target) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer NmE1OTc3MzAtZjkwYy00ODE2LThmMjctN2Q3MzAzOGU3MGQ4"
  );

  const restLink = new RestLink({
    uri: "https://api.m3o.com/v1/answer/Question",
    headers: myHeaders,
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
  });

  const query = gql`
    query {
     answer(input: { query: "${target}"})
       @rest(method: "POST", path: "") {
       answer
       url
     }
   }
  `;

  const newData = await client.query({ query });
  return await newData.data.answer;
};
