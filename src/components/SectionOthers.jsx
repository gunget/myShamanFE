import React from "react";
import DirectorsList from "./DirectorsList";
import SearchDirector from "./SearchDirector";

const SectionOthers = ({ fetchDirectorInfo, handleAdd }) => {
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
          <article>The Others</article>
        </div>
      </section>
      {/* <!-- Section Search and Add --> */}
      <section>
        <header id="searchNadd" className="major">
          <h2>Search & Add New</h2>
        </header>
        <div className="searchNadd">
          <SearchDirector fetchDirectorInfo={fetchDirectorInfo} />
        </div>
      </section>
    </>
  );
};

export default SectionOthers;
