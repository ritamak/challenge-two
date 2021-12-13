import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Answer from "../components/Answer";
import Header from "../components/Header";
import { Box, Stack, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { callApi } from "../graphql/CallApi";

export const getServerSideProps = async (context) => {
  const gqlData = await callApi(context.query.question);
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
          <Answer answerData={gqlData} tagText={router.query.question} link />
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
