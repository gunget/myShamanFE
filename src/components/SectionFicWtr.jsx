import React from "react";
import FicWriterList from "./FicWriterList";
// import SearchFictionWriter from "./SearchFicWtr";
import SearchTot from "./SearchTot";

const SectionFicWtr = ({ fetchFicWriterInfo, handleAdd }) => {
  const sectionType = "wrt";
  return (
    <>
      {" "}
      {/* <!-- Section FicWriter --> */}
      <section>
        <header id="FictionWriterList" className="major">
          <h2>Fiction Writers</h2>
          <a onClick={() => handleAdd("searchNadd")}>
            <i class="fas fa-plus-circle"> NEW</i>
          </a>
        </header>
        <div className="posts">
          <FicWriterList fetchFicWriterInfo={fetchFicWriterInfo} />
        </div>
      </section>
      {/* <!-- Section Search and Add --> */}
      <section>
        <header id="searchNadd" className="major">
          <h2>Search & Add New</h2>
        </header>
        <div className="searchNadd">
          {/* <SearchFictionWriter fetchFicWriterInfo={fetchFicWriterInfo} /> */}
          <SearchTot
            fetchTotalInfo={fetchFicWriterInfo}
            sectionType={sectionType}
          />
        </div>
      </section>
    </>
  );
};

export default SectionFicWtr;
