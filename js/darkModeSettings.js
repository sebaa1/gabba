document.addEventListener("DOMContentLoaded", () => {
  let savedTheme = localStorage.getItem("theme");

  if (!savedTheme) {
    savedTheme = "dark";
    localStorage.setItem("theme", savedTheme);
  }

  document.body.classList.add(savedTheme + "-mode");

  const radio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
  if (radio) {
    radio.checked = true;
  }
});



function showDarkModeModal() {
    document.getElementById("settingsOverlay").classList.remove("hidden");
    const modal = document.getElementById("darkModeModal");
    const arrow = document.getElementById("darkModeArrow");
    modal.classList.remove("hidden");
    arrow.classList.add("rotated");
    setTimeout(() => modal.classList.add("show"), 10);
  }

  function closeDarkModeModal() {
    const modal = document.getElementById("darkModeModal");
    const arrow = document.getElementById("darkModeArrow");
    modal.classList.remove("show");
    arrow.classList.remove("rotated");
    document.getElementById("settingsOverlay").classList.add("hidden");
    setTimeout(() => modal.classList.add("hidden"), 300);
  }

  function setDarkMode(mode) {
  document.body.classList.remove("dark-mode", "light-mode");

  if (mode === "dark") {
    document.body.classList.add("dark-mode");
  } else if (mode === "light") {
    document.body.classList.add("light-mode");
  }

  localStorage.setItem("theme", mode);
  closeDarkModeModal();
}
