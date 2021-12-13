import React from "react";
import { Stack, Spacer } from "@chakra-ui/react";
import Form from "./Form";
import Answer from "./Answer";
import classes from "../styles/Questions.module.css";

const Questions = ({
  setSearch,
  search,
  setAnswerData,
  answerData,
  resetSearchHandler,
}) => {
  return (
    <Stack className={classes.stack}>
      <Form
        setSearch={setSearch}
        search={search}
        setAnswerData={setAnswerData}
      />
      {answerData.answer && (
        <Answer
          search={search}
          resetSearchHandler={resetSearchHandler}
          answerData={answerData}
          tagText={search}
        />
      )}
    </Stack>
  );
};

export default Questions;
