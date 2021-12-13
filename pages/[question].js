import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Answer from "../components/Answer";
import Header from "../components/Header";
import { Box, Stack, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

export const getServerSideProps = async (context) => {
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
   answer(input: { query: ${context.query.question}})
     @rest(method: "POST", path: "") {
     answer
     url
   }
 }
`;

  const newData = await client.query({ query });
  const gqlData = await newData.data.answer;

  if (!gqlData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      gqlData,
    },
  };
};

const english = "More questions";
const deutsch = "Mehr fragen";

const Question = ({ gqlData }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>RitaMak-Challenge</title>
        <meta name="description" content="coding challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        spacing={8}
        flexDirection="column"
        align="center"
        justify="center"
        alignSelf="center"
      >
        <Header />
        <Stack
          spacing={8}
          flexDirection="column"
          align="center"
          justify="center"
          alignSelf="center"
          mt={20}
          width="80%"
        >
          <Answer answerData={gqlData} />
          <Link href="/" passHref>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              bg="teal"
              color="white"
            >
              {router.locale === "de" ? deutsch : english}
            </Button>
          </Link>
        </Stack>
      </Box>
    </>
  );
};

export default Question;
