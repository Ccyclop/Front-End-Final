document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const scrollBtn = document.getElementById("scrollToTop");
    const burger = document.getElementById("burger");
    const navLinks = document.querySelector(".nav-links");
    const contactForm = document.getElementById("contactForm");
    const togglePass = document.getElementById("togglePass");
    const passwordField = document.getElementById("password");
  
    // Scroll events
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 50);
      scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });
  
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // Burger menu
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  
    // Show/hide password
    togglePass.addEventListener("click", () => {
      if (passwordField.type === "password") {
        passwordField.type = "text";
        togglePass.textContent = "Hide";
      } else {
        passwordField.type = "password";
        togglePass.textContent = "Show";
      }
    });
  
    // Form validation
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
      if (!name || !email || !message || !emailRegex.test(email)) {
        alert("Please fill all fields correctly.");
      } else {
        alert("Form submitted successfully!");
        contactForm.reset();
      }
    });
  
    // Cookie banner
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookies = document.getElementById("accept-cookies");
  
    if (!localStorage.getItem("cookiesAccepted")) {
      cookieBanner.style.display = "flex";
    }
  
    acceptCookies.addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "true");
      cookieBanner.style.display = "none";
    });
  
    // Fetch random user reviews
    fetch("https://randomuser.me/api/?results=4")
      .then(res => res.json())
      .then(data => {
        const reviews = document.getElementById("reviews");
        data.results.forEach(user => {
          const div = document.createElement("div");
          div.classList.add("item");
          div.innerHTML = `
            <img src="${user.picture.medium}" alt="${user.name.first}" style="border-radius:50%"><br>
            <strong>${user.name.first} ${user.name.last}</strong><br>
            "Amazing food and service!"
          `;
          reviews.appendChild(div);
        });
      });
  });
  