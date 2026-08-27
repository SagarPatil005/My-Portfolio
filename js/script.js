document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const progress = document.getElementById("scrollProgress");
  const year = document.getElementById("year");
  const typedText = document.getElementById("typedText");

  year.textContent = new Date().getFullYear();

  // Navbar + scroll progress
  const handleScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);

    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Typing effect
  const roles = [
    "Java Full Stack Developer",
    "Java Backend Developer",
    "Spring Boot Developer",
    "Software Engineer"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const current = roles[roleIndex];

    if (!deleting) {
      typedText.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeRole, 1600);
        return;
      }
    } else {
      typedText.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    setTimeout(typeRole, deleting ? 45 : 85);
  }
  typeRole();

  // Reveal animation
  const revealItems = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
    observer.observe(item);
  });

  // Close mobile menu after clicking a nav link
  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navbarContent");
      if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Smooth tilt on desktop cards
  if (window.matchMedia("(min-width: 992px)").matches) {
    document.querySelectorAll(".project-card, .skill-card").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -3;
        const rotateY = ((x / rect.width) - 0.5) * 3;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }
});
