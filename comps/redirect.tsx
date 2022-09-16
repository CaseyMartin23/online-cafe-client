import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Redirect: React.FC<{ url: string }> = ({ url }) => {
  const { push } = useRouter();
  useEffect(() => {
    push(url);
  }, [url]);

  return <></>;
};

export default Redirect;
