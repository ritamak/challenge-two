import React from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LocaleButton = ({ lang }) => {
  const router = useRouter();

  const { question } = router.query;
  let redirect = question ? `/${question}` : "/";

  return (
    <Button
      colorScheme="white"
      border="none"
      variant="ghost"
      isActive={router.locale === lang}
      p="1px"
      color="white"
      _active={{
        transform: "scale(0.98)",
        bg: "white",
        color: "#2E3D58",
        p: "1px",
      }}
      onClick={() => {
        router.push(redirect, redirect, { locale: lang });
      }}
    >
      {lang.toUpperCase()}
    </Button>
  );
};

export default LocaleButton;
