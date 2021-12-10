import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/merriweather";
import theme from "../components/Theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
