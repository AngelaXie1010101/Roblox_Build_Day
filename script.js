const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const modal = document.querySelector("#register-modal");
const openButtons = document.querySelectorAll("[data-open-register]");
const closeButtons = document.querySelectorAll("[data-close-register]");
const registerForm = document.querySelector("#register-form");
const formMessage = document.querySelector("#form-message");
const schoolForm = document.querySelector(".school-form");
const scheduleTabs = document.querySelectorAll("[data-schedule-tab]");
const schedulePanels = document.querySelectorAll("[data-schedule-panel]");
let lastFocusedElement = null;

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-open");
  const firstInput = modal.querySelector("input");
  firstInput.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
  formMessage.textContent = "";
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const studentName = formData.get("student-name").toString().trim();
  formMessage.textContent = `Thanks, ${studentName}! Your Build Day registration has been received.`;
  registerForm.reset();
});

if (schoolForm) {
  schoolForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const schoolName = new FormData(schoolForm).get("school-name").toString().trim();
    const message = schoolForm.querySelector(".school-message");
    message.textContent = `Thanks. We received your request for ${schoolName} and will prepare the school program packet.`;
    schoolForm.reset();
  });
}

scheduleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const panelId = tab.dataset.scheduleTab;

    scheduleTabs.forEach((item) => {
      const isSelected = item === tab;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-selected", String(isSelected));
    });

    schedulePanels.forEach((panel) => {
      const isSelected = panel.id === panelId;
      panel.hidden = !isSelected;
      panel.classList.toggle("is-active", isSelected);
    });
  });
});
