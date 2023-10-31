import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = ({ statusCode }: { statusCode: number | null }) => {
  const router = useRouter();

  if (statusCode === 404) {
    // Redirect to the root ("/") for 404 errors
    useEffect(() => {
        router.push('/')
      }, [])
    return null;
  }

  // Handle other error status codes or display a custom error page
  return (
    <div>
      <p>Error {statusCode || "An error occurred"}</p>
    </div>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;