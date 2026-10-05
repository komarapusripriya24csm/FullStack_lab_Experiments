const loginForm = document.querySelector("#loginForm");
const loginPage = document.querySelector("#loginPage");
const successPage = document.querySelector("#successPage");
const loginTime = document.querySelector("#loginTime");
const greeting = document.querySelector("#greeting");
const portalContent = document.querySelector("#portal-content");

function formatLoginTime(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const displayHour = hour % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const period = hour >= 12 ? "pm" : "am";

  return `${day}/${month}/${year}, ${displayHour}:${minutes}:${seconds} ${period}`;
}

function getGreeting(hour) {
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  return "Good Night";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const now = new Date();
  loginTime.textContent = formatLoginTime(now);
  greeting.textContent = getGreeting(now.getHours());
  loginPage.hidden = true;
  successPage.hidden = false;
  portalContent.focus();
});