document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.textContent = open ? "✕" : "☰";
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const topic = data.get("topic");

    formMessage.textContent = `Thanks, ${name}! Your ${topic.toLowerCase()} request has been received.`;
    form.reset();

    toast.textContent = "Demo contact form submitted successfully.";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
  });

  document.querySelectorAll("details").forEach(detail => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        document.querySelectorAll("details").forEach(other => {
          if (other !== detail) other.open = false;
        });
      }
    });
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
