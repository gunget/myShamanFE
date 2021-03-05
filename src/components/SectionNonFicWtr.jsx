import React from "react";
import DirectorsList from "./DirectorsList";
import SearchDirector from "./SearchDirector";

const SectionNonFicWtr = ({ fetchDirectorInfo, handleAdd }) => {
  return (
    <>
      {" "}
      {/* <!-- Section Director --> */}
      <section>
        <header id="NonFictionWriterList" className="major">
          <h2>NonFiction Writers</h2>
          <a onClick={() => handleAdd("searchNadd")}>
            <i class="fas fa-plus-circle"> NEW</i>
          </a>
        </header>
        <div className="posts">
          <article>NonFiction Writers</article>
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

export default SectionNonFicWtr;