export const getQuestion = async (question) => {
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
