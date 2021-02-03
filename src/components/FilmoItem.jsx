import React from "react";

const FilmoItem = ({ peopleCode }) => {
  const url =
    peopleCode !== "Not assigned"
      ? `https://movie.naver.com/movie/bi/pi/filmoMission.nhn?peopleCode=${peopleCode}&year=0`
      : null;
  return (
    <iframe
      title="Filmo"
      src={url}
      style={{ border: "none", width: "100%", height: "100vh" }}
    ></iframe>
  );
};

export default FilmoItem;
