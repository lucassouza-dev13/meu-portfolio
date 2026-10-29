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

// faixa de tecnologias: repete a lista para o loop ficar contínuo
const trilho = document.querySelector(".faixa-trilho");
if (trilho) {
  const originais = [...trilho.children];
  for (let i = 0; i < 3; i++) {
    originais.forEach((el) => {
      const copia = el.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      trilho.appendChild(copia);
    });
  }
}

// barra de progresso de rolagem
const barra = document.getElementById("progresso");
if (barra) {
  const atualizar = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
}

// luz que segue o mouse e cards que se inclinam (só com mouse e sem "reduzir movimento")
const podeMover = matchMedia("(hover: hover)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;

if (podeMover) {
  // inclinação dos cards (projetos e repositórios do GitHub)
  const GRAUS = 15;
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".card, .repo");
    if (!card) return;
    card.classList.add("tilt");
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty("--ry", `${x * GRAUS * 2}deg`);
    card.style.setProperty("--rx", `${-y * GRAUS * 2}deg`);
  }, { passive: true });

  document.addEventListener("mouseout", (e) => {
    const card = e.target.closest(".card, .repo");
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });

  // luz que acompanha o cursor com um atraso suave
  const luz = document.getElementById("luz-mouse");
  if (luz) {
    let alvoX = 0, alvoY = 0, x = 0, y = 0, rodando = false, primeiro = true;

    const mover = () => {
      x += (alvoX - x) * 0.12;
      y += (alvoY - y) * 0.12;
      luz.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(alvoX - x) + Math.abs(alvoY - y) > 0.5) requestAnimationFrame(mover);
      else rodando = false;
    };

    window.addEventListener("mousemove", (e) => {
      alvoX = e.clientX;
      alvoY = e.clientY;
      if (primeiro) { x = alvoX; y = alvoY; primeiro = false; luz.style.opacity = "1"; }
      if (!rodando) { rodando = true; requestAnimationFrame(mover); }
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => { luz.style.opacity = "0"; });
    document.documentElement.addEventListener("mouseenter", () => { luz.style.opacity = "1"; });
  }
}

/* ==== IDIOMAS ==== */
const traducoes = {
  pt: {
    nav_projects: "Projetos",
    nav_about: "Sobre",
    nav_services: "Serviços",
    nav_contact: "Contato"
  },
  en: {
    nav_projects: "Projects",
    nav_about: "About",
    nav_services: "Services",
    nav_contact: "Contact"
  },
  es: {
    nav_projects: "Proyectos",
    nav_about: "Sobre mí",
    nav_services: "Servicios",
    nav_contact: "Contacto"
  }
};

function aplicarIdioma(idioma) {
  if (!traducoes[idioma]) return;

  document;documentElement.lang = idioma === "pt"
  ? "pt-BR"
  : idioma === "en"
  ? "en"
  : "es";

 document.querySelectorAll("[data-i18n]").forEach((elemento) => {
    const chave = elemento.dataset.i18n;
    const texto = traducoes[idioma][chave];

    if (texto) elemento.textContent = texto;
  });

  document.querySelectorAll(".idioma-btn").forEach((botao) => {
    const selecionado = botao.dataset.lang === idioma;

    botao.classList.toggle("ativo", selecionado);
    botao.setAttribute("aria-pressed", String(selecionado));
  });

  try {
    localStorage.setItem("idioma-portfolio", idioma);
  } catch (e) {}
}

document.querySelectorAll(".idioma-btn").forEach((botao) => {
  botao.addEventListener("click", () => {
    aplicarIdioma(botao.dataset.lang);
  });
});

let idiomaInicial = "pt";

try {
  const idiomaSalvo = localStorage.getItem("idioma-portfolio");
  if (idiomaSalvo && traducoes[idiomaSalvo]) {
    idiomaInicial = idiomaSalvo;
  }
} catch (e) {}

aplicarIdioma(idiomaInicial);