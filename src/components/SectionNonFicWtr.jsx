import React from "react";
import NonFicWriterList from "./NonFicWriterList";
// import SearchNonFictionWriter from "./SearchNonFicWtr";
import SearchTot from "./SearchTot";

const SectionNonFicWtr = ({ fetchNonFicWriterInfo, handleAdd }) => {
  const sectionType = "nwrt";

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
          <NonFicWriterList fetchNonFicWriterInfo={fetchNonFicWriterInfo} />
        </div>
      </section>
      {/* <!-- Section Search and Add --> */}
      <section>
        <header id="searchNadd" className="major">
          <h2>Search & Add New</h2>
        </header>
        <div className="searchNadd">
          {/* <SearchNonFictionWriter
            fetchNonFicWriterInfo={fetchNonFicWriterInfo}
          /> */}
          <SearchTot
            fetchTotalInfo={fetchNonFicWriterInfo}
            sectionType={sectionType}
          />
        </div>
      </section>
    </>
  );
};

export default SectionNonFicWtr;
