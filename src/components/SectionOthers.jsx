import React from "react";
import SearchOthers from "./SearchOthers";
import OthersList from "./OthersList";

const SectionOthers = ({ fetchOthersInfo, handleAdd }) => {
  return (
    <>
      {" "}
      {/* <!-- Section Director --> */}
      <section>
        <header id="TheOthersList" className="major">
          <h2>The Others</h2>
          <a onClick={() => handleAdd("searchNadd")}>
            <i class="fas fa-plus-circle"> NEW</i>
          </a>
        </header>
        <div className="posts">
          <OthersList fetchOthersInfo={fetchOthersInfo} />
        </div>
      </section>
      {/* <!-- Section Search and Add --> */}
      <section>
        <header id="searchNadd" className="major">
          <h2>Search & Add New</h2>
        </header>
        <div className="searchNadd">
          <SearchOthers fetchOthersInfo={fetchOthersInfo} />
        </div>
      </section>
    </>
  );
};

export default SectionOthers;
