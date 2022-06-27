const collapseBtn = document.querySelectorAll(".custom-collapse-btn");

const changeBtnText = (btn) => {
  if (!btn.classList.contains("open")) {
    btn.innerHTML = "Менше";
    btn.classList.add("open");
  } else {
    btn.innerHTML = "Більше";
    btn.classList.remove("open");
  }
};

collapseBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    changeBtnText(btn);
  })
);
