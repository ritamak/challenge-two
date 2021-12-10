import React from "react";
import { Box, Text } from "@chakra-ui/react";
import LocaleButton from "./LocaleButton";
import classes from "../styles/Header.module.css";

const Header = () => {
  return (
    <Box
      bg="#2E3D58"
      w="100%"
      p={4}
      color="white"
      className={classes.container}
    >
      <Text className={classes.text}>Rita Mak / Challenge</Text>
      <Box className={classes.buttons}>
        <LocaleButton lang={"en"} />
        <LocaleButton lang={"de"} />
      </Box>
    </Box>
  );
};

export default Header;
