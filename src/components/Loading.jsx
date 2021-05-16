import React from "react";
import globalImgs from "../images/globalImgs";

const styles = {
  article: {
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  image: {
    height: "70px",
    width: "70px",
    marginBottom: "10px",
    marginTop: "50px",
  },
  text: {
    textAlign: "center",
  },
};

const Loading = () => {
  return (
    <article className="loadingImg" style={styles.article}>
      <div style={styles.item}>
        <img src={globalImgs.loading} style={styles.image} alt="loading" />
        <p style={styles.text}>&nbsp;</p>
      </div>
      <div style={styles.item}>
        <img src={globalImgs.loading} style={styles.image} alt="loading" />
        <p style={styles.text}>LOADING...</p>
      </div>
      <div style={styles.item}>
        <img src={globalImgs.loading} style={styles.image} alt="loading" />
        <p style={styles.text}>&nbsp;</p>
      </div>
    </article>
  );
};

export default Loading;
