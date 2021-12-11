import {
  Box,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import classes from "../styles/Answer.module.css";
import translate from "translate";
import { useRouter } from "next/router";
import { useState } from "react";

const Answer = ({ search, resetSearchHandler, answerData }) => {
  const [translated, setTranslated] = useState("");
  const router = useRouter();
  translate.engine = "google";
  translate.key = process.env.GOOGLE_KEY;

  translate(answerData.answer, "de")
    .then((result) => setTranslated(result))
    .catch((err) => console.log(err));

  return (
    <Stack className={classes.wrapper}>
      <Box p={5} className={classes.box}>
        {search && (
          <Tag
            className={classes.tag}
            borderRadius="full"
            size="lg"
            onClick={resetSearchHandler}
            mb={5}
          >
            <TagLabel>{search}</TagLabel> <TagCloseButton />
          </Tag>
        )}

        <Box className={classes.text}>
          <Text>{router.locale === "en" ? answerData.answer : translated}</Text>
        </Box>
        {answerData.url && (
          <Box className={classes.link}>
            <Text fontSize="s" className={classes.more}>
              <b>{router.locale === "en" ? "More: " : "Mehr: "}</b>
            </Text>
            <Text fontSize="s" color="rgb(77, 102, 147)">
              <Link href={answerData.url}>{answerData.url}</Link>
            </Text>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Answer;
