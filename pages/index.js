import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Questions from "../components/Questions";

export default function Home() {
  const initialState = {};
  const [answerData, setAnswerData] = useState(initialState);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const { locale } = router;

  const resetSearchHandler = async () => {
    setSearch("");
    setAnswerData(initialState);
  };

  return (
    <>
      <Head>
        <title>RitaMak-Challenge</title>
        <meta name="description" content="coding challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header locale={locale} />
      <Questions
        setSearch={setSearch}
        search={search}
        setAnswerData={setAnswerData}
        answerData={answerData}
        resetSearchHandler={resetSearchHandler}
      />
    </>
  );
}

/*

export const getServerSideProps = async (context) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer NmE1OTc3MzAtZjkwYy00ODE2LThmMjctN2Q3MzAzOGU3MGQ4"
  );

  let raw = JSON.stringify({
    query: "microsoft",
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

*/
