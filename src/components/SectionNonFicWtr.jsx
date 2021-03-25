import React from "react";
import NonFicWriterList from "./NonFicWriterList";
import SearchNonFictionWriter from "./SearchNonFicWtr";

const SectionNonFicWtr = ({ fetchNonFicWriterInfo, handleAdd }) => {
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
          <SearchNonFictionWriter
            fetchNonFicWriterInfo={fetchNonFicWriterInfo}
          />
        </div>
      </section>
    </>
  );
};

export default SectionNonFicWtr;
