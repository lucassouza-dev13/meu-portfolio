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

// atividade no Github (cache de 10 min)

(async function () {
  const USUARIO = "lucassouza-dev13";
  const secao = document.getElementById("github");
  const lista = document.getElementById("gh-repos");
  if (!secao || !lista) return;

  try {
    let repos = null;
    try {
      const salvo = JSON.parse(sessionStorage.getItem("gh-repos") || "null");
      if (salvo && Date.now() - salvo.t < 600000) repos = salvo.d;
    } catch (e) {}

    if (!repos) {
      const r = await fetch(`https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=30`);
      if (!r.ok) throw new Error("GitHub " + r.status);
      repos = await r.json();
      try { sessionStorage.setItem("gh-repos", JSON.stringify({ t: Date.now(), d: repos })); } catch (e) {}
    }

    const proprios = repos.filter(r => !r.fork && r.name.toLowerCase() !== USUARIO.toLowerCase());
    const comDescricao = proprios.filter(r => r.description);
    const escolhidos = (comDescricao.length >= 2 ? comDescricao : proprios).slice(0, 4);
    if (!escolhidos.length) return;

    escolhidos.forEach(r => {
      const a = document.createElement("a");
      a.className = "repo";
      a.href = r.html_url;
      a.target = "_blank";
      a.rel = "noopener";

      const nome = document.createElement("strong");
      nome.textContent = r.name;

      const desc = document.createElement("span");
      desc.className = "desc";
      desc.textContent = r.description || "Sem descrição.";

      const meta = document.createElement("span");
      meta.className = "meta";
      const data = new Date(r.pushed_at).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
      meta.textContent = (r.language ? r.language + " · " : "") + "atualizado em " + data;

      a.append(nome, desc, meta);
      lista.appendChild(a);
    });

    secao.hidden = false;
  } catch (e) {
    // se a API falhar, a seção continua escondida
  }
})();