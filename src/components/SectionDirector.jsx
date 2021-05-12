import React from "react";
import DirectorsList from "./DirectorsList";
// import SearchDirector from "./SearchDirector";
import SearchTot from "./SearchTot";

const SectionDirector = ({ fetchDirectorInfo, handleAdd }) => {
  const sectionType = "drt";
  return (
    <>
      {" "}
      {/* <!-- Section Director --> */}
      <section>
        <header id="DirectorList" className="major">
          <h2>Movie Director</h2>
          <a onClick={() => handleAdd("searchNadd")}>
            <i class="fas fa-plus-circle"> NEW</i>
          </a>
        </header>
        <div className="posts">
          <DirectorsList fetchDirectorInfo={fetchDirectorInfo} />
        </div>
      </section>
      {/* <!-- Section Search and Add --> */}
      <section>
        <header id="searchNadd" className="major">
          <h2>Search & Add New</h2>
        </header>
        <div className="searchNadd">
          {/* <SearchDirector fetchDirectorInfo={fetchDirectorInfo} /> */}
          <SearchTot
            fetchTotalInfo={fetchDirectorInfo}
            sectionType={sectionType}
          />
        </div>
      </section>
    </>
  );
};

export default SectionDirector;
