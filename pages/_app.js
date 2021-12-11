import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/merriweather";
import theme from "../components/Theme";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://api.m3o.com/v1/answer/Question/graphql",
  request: (operation) => {
    operation.setContext({
      headers: {
        "Content-Type": "application/json",

        Authorization:
          "Bearer NmU3YzMzZmYtNzQyZS00OGM1LTk4MDQtN2I2ZTBhYTFlOGVi",
      },
    });
  },
});

const client = new ApolloClient({
  uri: httpLink,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
