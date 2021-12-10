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

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer NmE1OTc3MzAtZjkwYy00ODE2LThmMjctN2Q3MzAzOGU3MGQ4"
    );

    let raw = JSON.stringify({
      query: search,
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
    } else {
      setAnswerData(data);
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
          />
          <IconButton
            type="submit"
            disabled={search === ""}
            icon={<ArrowForwardIcon />}
            colorScheme="gray"
            variant="outline"
            aria-label="Search Database"
          />
        </FormControl>
      </form>
    </Container>
  );
};

export default Form;
