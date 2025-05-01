const clearScreen = () => {
  document.getElementById("screen").value = "";
};

const screen = document.getElementById("screen");
const buttonsNum = document.querySelectorAll("button.num");
const operators = document.querySelectorAll("button.operator");
const abs = document.getElementById('abs')
const removeNum = document.getElementById('removeNum')

abs.onclick = function () {
    screen.value = screen.value * (-1)
}

removeNum.onclick = function () {
    screen.value = screen.value.slice(0, -1);
}



buttonsNum.forEach((button) => {
  button.addEventListener("click", () => {
    screen.value += button.value.trim();
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    screen.value += operator.value.trim();
  });
});

const calcule = () => {
  try {
    screen.value = Function('"use strict";return (' + screen.value + ")")();
  } catch {
    screen.value = "Error";
  }
};

// Keyboard support
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    screen.value += key;
  } else if (["+", "-", "*", "/"].includes(key)) {
    screen.value += key;
  } else if (key === "Enter") {
    calcule();
  } else if (key === "Backspace") {
    screen.value = screen.value.slice(0, -1);
  } else if (key === "Escape") {
    clearScreen();
  }
});

// Theme toggle
const toggleSwitch = document.getElementById("themeSwitch");
const switchMode = document.getElementById("textSwitch");

// Function to update the icon and switch state
const updateThemeIcon = () => {
  if (document.body.classList.contains("dark-mode")) {
    switchMode.innerText = "🌕";
    toggleSwitch.checked = true;
  } else {
    switchMode.innerText = "🌚";
    toggleSwitch.checked = false;
  }
};

// Check saved mode on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}
updateThemeIcon();

// Toggle mode and save preference
toggleSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

