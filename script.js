document.documentElement.classList.replace("no-js", "js");

const itens = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visivel");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  itens.forEach((el) => obs.observe(el));
} else {
  itens.forEach((el) => el.classList.add("visivel"));
}

const topo = document.querySelector("header");
window.addEventListener("scroll", () => {
  topo.classList.toggle("rolou", window.scrollY > 10);
}, { passive: true });
