document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme");
  const icon = themeToggle.querySelector("i");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    icon.className = "fas fa-moon";
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  });

  const navDropdown = document.querySelector("nav .dropdown");
  if (navDropdown) {
    const dropdownLink = navDropdown.querySelector("a");
    const dropdownContent = navDropdown.querySelector(".dropdown-content");

    dropdownLink.addEventListener("click", function (e) {
      e.preventDefault();
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (e) {
      if (!navDropdown.contains(e.target)) {
        dropdownContent.style.display = "none";
      }
    });
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = {
        name: contactForm.name.value.trim(),
        email: contactForm.email.value.trim(),
        subject: contactForm.subject.value.trim(),
        message: contactForm.message.value.trim(),
      };

      try {
        const response = await fetch("http://localhost:3000/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        alert(result.message || "Message sent!");

        contactForm.reset();
      } catch (error) {
        console.error("Form submission error:", error);
        alert("Something went wrong. Please try again later.");
      }
    });
  }
});
