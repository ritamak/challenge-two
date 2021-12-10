import Answer from "../components/Answer";
import Header from "../components/Header";
import Link from "next/link";
import { Box, Stack, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const getServerSideProps = async (context) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer NmE1OTc3MzAtZjkwYy00ODE2LThmMjctN2Q3MzAzOGU3MGQ4"
  );

  let raw = JSON.stringify({
    query: context.query.question,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const res = await fetch(
    "https://api.m3o.com/v1/answer/Question",
    requestOptions
  );
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

const english = "More questions";

const deutsch = "Mehr fragen";

const Question = ({ data }) => {
  const router = useRouter();
  return (
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
      >
        <Answer answerData={data} />
        <Link href="/" passHref>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="white"
            variant="outline"
          >
            {router.locale === "de" ? deutsch : english}
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default Question;
