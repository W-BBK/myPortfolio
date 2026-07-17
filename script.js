// Swap the page theme to whichever section currently crosses the viewport
// center. rootMargin shrinks the observation zone to a horizontal line at
// 50% viewport height, so exactly one section "owns" the page at a time —
// this also works for sections taller than the viewport, where a visibility
// threshold like 0.5 would never fire.
const sections = document.querySelectorAll("section[data-theme]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.body.dataset.theme = entry.target.dataset.theme;
      for (const link of navLinks) {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + entry.target.id
        );
      }
    }
  },
  { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
