const FloatingText = () => {
  const floatingText = document.querySelector("#floating-text");
  const docEl = document.documentElement;

  const docHeight = Math.round(
    Math.max(docEl.scrollHeight, docEl.offsetHeight)
  );
  const ref = docHeight !== "undefined" ? (docHeight / 10) * 4 : "";
  let scrollPos = docEl.scrollTop; //viewport의 top이 doument의 Top에서 얼마나 멀어졌나.
  window.addEventListener("scroll", () => {
    scrollPos = docEl.scrollTop; //viewport의 top이 doument의 Top에서 얼마나 멀어졌나.
    if (scrollPos > ref) {
      floatingText.classList.add("visible");
    } else {
      floatingText.classList.remove("visible");
    }
  });
};

export default FloatingText;
