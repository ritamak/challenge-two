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

const Answer = ({ tagText, resetSearchHandler, link, answerData }) => {
  const [translated, setTranslated] = useState("");
  const router = useRouter();
  translate.engine = "google";
  translate.key = process.env.GOOGLE_KEY;

  translate(answerData.answer, "de")
    .then((result) => setTranslated(result))
    .catch((err) => console.error(err));

  return (
    <Stack className={classes.wrapper}>
      <Box p={5} className={classes.box}>
        {!link && (
          <Tag
            className={classes.tag}
            borderRadius="full"
            size="lg"
            onClick={resetSearchHandler}
            mb={5}
          >
            <TagLabel>{tagText}</TagLabel> <TagCloseButton />
          </Tag>
        )}
        {link && (
          <Tag className={classes.tag} borderRadius="full" size="lg" mb={5}>
            <TagLabel>{tagText}</TagLabel>
          </Tag>
        )}
        <Box className={classes.text}>
          <Text className={classes.answer}>
            {router.locale === "en" ? answerData.answer : translated}
          </Text>
          {answerData.url && (
            <Box className={classes.linkBox}>
              <Text fontSize="s" className={classes.more}>
                <b>{router.locale === "en" ? "More: " : "Mehr: "}</b>
              </Text>
              <Link passHref href={answerData.url}>
                <Text color="rgb(77, 102, 147)">{answerData.url}</Text>
              </Link>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default Answer;
