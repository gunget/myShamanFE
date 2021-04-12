import { useEffect } from "react";
const ImportScript = (resourceUrl) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = resourceUrl;
    script.aysnc = true;
    document.body.appendChild(script);
    return () => {
      // document.body.removeChild(script);
    };
  }, [resourceUrl]);
};
export default ImportScript;
