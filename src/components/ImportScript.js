const ImportScript = (resourceUrl) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = resourceUrl;
  document.body.appendChild(script);

  return () => {
    document.body.removeChild(script);
  };
};
export default ImportScript;
