const FixedSidebar = () => {
  const FixedSidebar = document.querySelector("#sidebarInner");
  const docEl = document.documentElement;

  const docHeight = Math.round(
    Math.max(docEl.scrollHeight, docEl.offsetHeight)
  );
  const ref = docHeight !== "undefined" ? (docHeight / 10) * 3.2 : "";
  let scrollPos = docEl.scrollTop; //viewport의 top이 doument의 Top에서 얼마나 멀어졌나.
  window.addEventListener("scroll", () => {
    scrollPos = docEl.scrollTop; //viewport의 top이 doument의 Top에서 얼마나 멀어졌나.
    if (scrollPos > ref) {
      FixedSidebar.classList.add("fixed");
    } else {
      FixedSidebar.classList.remove("fixed");
    }
  });
};

export default FixedSidebar;
