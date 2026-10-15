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

// mascote: balão uma vez por visita e leve inclinação seguindo o mouse
const mascote = document.getElementById("mascote");
const balao = document.getElementById("balao");
if (mascote && balao) {
  let jaViu = false;
  try { jaViu = sessionStorage.getItem("balao-visto") === "1"; } catch (e) {}
  if (!jaViu) {
    setTimeout(() => balao.classList.add("mostrar"), 3000);
    setTimeout(() => balao.classList.remove("mostrar"), 11000);
    try { sessionStorage.setItem("balao-visto", "1"); } catch (e) {}
  }
  const semMovimento = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!semMovimento && matchMedia("(hover: hover)").matches) {
    const img = mascote.querySelector(".boneco img");
    document.addEventListener("mousemove", (e) => {
      const r = img.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      img.style.transform = `perspective(300px) rotateY(${dx * 24}deg) rotateX(${-dy * 24}deg)`;
    }, { passive: true });
  }
}