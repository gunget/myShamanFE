import React, { useRef } from "react";

const PageSearch = () => {
  const inputRef = useRef();

  const handleFind = (e) => {
    e.preventDefault();
    const element = document.createElement("a");
    element.setAttribute("href", `#${inputRef.current.value}`);
    element.click();
  };

  return (
    <section id="search" className="alt">
      <form method="post" action="#" onSubmit={handleFind}>
        <input
          type="text"
          name="query"
          id="query"
          placeholder="이름 검색 (Full Name)"
          ref={inputRef}
        />
      </form>
    </section>
  );
};

export default PageSearch;
