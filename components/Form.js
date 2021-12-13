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
import { callApi } from "../graphql/CallApi";

const english = {
  phrase: "Type any word to get an answer",
  formPlaceHolder: "your question...",
};

const deutsch = {
  phrase: "Geben sie ein beliebiges wort ein, um eine antwort zu erhalten",
  formPlaceHolder: "ihre frage...",
};

const Form = ({ setSearch, search, setAnswerData }) => {
  const router = useRouter();

  const searchHandler = async (event) => {
    event.preventDefault();
    const data = await callApi(search);
    if (data) {
      setAnswerData(data);
    } else {
      return <p>Answer not found..</p>;
    }
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
