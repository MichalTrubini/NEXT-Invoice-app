import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = ({ statusCode }: { statusCode: number | null }) => {
  const router = useRouter();

  // Redirect to the root ("/") for 404 errors
  useEffect(() => {
    if (statusCode === 404) router.push("/");
  }, [router, statusCode]);
  return null;
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;
