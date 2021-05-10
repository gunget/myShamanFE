import React from "react";

const SearchStepFinish = () => {
  return (
    <div className="container search2">
      {" "}
      <div className="alt2">
        <sup className="korean"> Search&New Finished</sup>
        <p
          className="korean"
          style={{
            color: "#f56a6a",
            fontSize: "1.5em",
            marginBottom: "1.5em",
            fontWeight: "700",
          }}
        >
          정상적으로 저장됐나요?
        </p>
        <blockquote>처음으로 돌아가려면 reset을 눌러주세요.</blockquote>
      </div>
    </div>
  );
};

export default SearchStepFinish;
