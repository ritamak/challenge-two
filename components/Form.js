import {
  Input,
  Container,
  FormLabel,
  FormControl,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import classes from "../styles/Form.module.css";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const english = {
  phrase: "Type any word to get an answer",
  formPlaceHolder: "your question...",
};

const deutsch = {
  phrase: "Geben sie ein beliebiges wort ein, um eine antwort zu erhalten",
  formPlaceHolder: "ihre frage...",
};

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

const Form = ({ setSearch, search, setAnswerData }) => {
  const router = useRouter();

  const searchHandler = async (event) => {
    event.preventDefault();
    const query = gql`
    query {
      answer(input: { query:"${search}" }) @rest(method: "POST", path: "") {
        answer
        url
      }
    }
  `;

    client
      .query({ query })
      .then((response) => {
        setAnswerData(response.data.answer);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container className={classes.container}>
      <form onSubmit={searchHandler} className={classes.form}>
        <FormLabel className={classes.formLabel}>
          <b>{router.locale === "de" ? deutsch.phrase : english.phrase}</b>
        </FormLabel>
        <FormControl className={classes.formControl}>
          <Input
            size="lg"
            placeholder={
              router.locale === "de"
                ? deutsch.formPlaceHolder
                : english.formPlaceHolder
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={classes.input}
            name="question"
          />
          <IconButton
            type="submit"
            disabled={search === ""}
            icon={<ArrowForwardIcon />}
            colorScheme="teal"
            aria-label="Search Database"
          />
        </FormControl>
      </form>
    </Container>
  );
};

export default Form;
