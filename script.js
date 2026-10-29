
document.documentElement.classList.replace("no-js", "js");

/* ==== ANIMAÇÕES DE ENTRADA ==== */
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

/* ==== CABEÇALHO ==== */
const topo = document.querySelector("header");

if (topo) {
  window.addEventListener("scroll", () => {
    topo.classList.toggle("rolou", window.scrollY > 10);
  }, { passive: true });
}

/* ==== MASCOTE ==== */
const mascote = document.getElementById("mascote");
const balao = document.getElementById("balao");

if (mascote && balao) {
  let jaViu = false;

  try {
    jaViu = sessionStorage.getItem("balao-visto") === "1";
  } catch (e) {}

  if (!jaViu) {
    setTimeout(() => balao.classList.add("mostrar"), 3000);
    setTimeout(() => balao.classList.remove("mostrar"), 11000);

    try {
      sessionStorage.setItem("balao-visto", "1");
    } catch (e) {}
  }

  const semMovimento = matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!semMovimento && matchMedia("(hover: hover)").matches) {
    const img = mascote.querySelector(".boneco img");

    if (img) {
      document.addEventListener("mousemove", (e) => {
        const r = img.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;

        img.style.transform =
          `perspective(300px) rotateY(${dx * 24}deg) rotateX(${-dy * 24}deg)`;
      }, { passive: true });
    }
  }
}

/* ==== IDIOMAS ==== */
const traducoes = {
  pt: {
    nav_projects: "Projetos",
    nav_about: "Sobre",
    nav_services: "Serviços",
    nav_contact: "Contato",

    hero_available: "Disponível para novos projetos",
    hero_description: "Sou Lucas, desenvolvedor full-stack. Crio landing pages, sites institucionais e sistemas com login e integração de APIs, do layout ao deploy.",
    hero_projects: "Ver projetos",
    hero_contact: "Entrar em contato",
    hero_resume: "Verificar currículo",
    hero_title_start: "Transformo",
    hero_title_highlight: "ideias",
    hero_title_middle: "em",
    hero_title_end: "soluções de software",

    about_title: "Sobre mim",
    about_p1: "Sou formado em Análise e Desenvolvimento de Sistemas e gosto de transformar ideias em projetos que funcionam de verdade. Desenvolvo soluções do banco de dados até a publicação, sempre buscando aprender algo novo pelo caminho.",
    about_p2: "Gosto de um código organizado, sites rápidos e experiências que funcionam bem tanto no computador quanto no celular.",

    services_title: "Serviços",
    service_landing_title: "Landing pages",
    service_landing_desc: "Páginas rápidas, focadas em conversão e com botão de WhatsApp.",
    service_sites_title: "Sites institucionais",
    service_sites_desc: "Site completo para sua empresa, responsivo e publicado.",
    service_systems_title: "Sistemas com login",
    service_systems_desc: "Cadastro, painel e banco de dados com autenticação segura.",
    service_api_title: "Integração de APIs",
    service_api_desc: "Pagamentos, catálogos e serviços de terceiros conectados ao seu projeto.",

    projects_title: "Projetos",
    lustv_desc: "Plataforma para catalogar e avaliar filmes, séries, animes e jogos, com contas de usuário, listas personalizadas, feed da comunidade, perfis públicos e conquistas.",
    lustv_feature1: "Scroll infinito em todas as abas com IntersectionObserver e paginação real na API de jogos.",
    lustv_feature2: "Autenticação JWT e recuperação de senha por e-mail.",
    lustv_feature3: "Front na Vercel e back na Render, com CORS e variáveis de ambiente configurados.",
    lustv_feature4: "Integração com duas APIs: TMDB (filmes, séries e animes) e IGDB (jogos).",
    project_view_site: "Ver o site",
    project_github: "Código no GitHub",
    sales_title: "App Vendas Diárias - Empresa de Turismo",
    sales_desc: "Aplicação web real para gerenciamento e acompanhamento de vendas diárias. Conta com uma API REST em Node.js e Express, banco de dados PostgreSQL para armazenamento persistente e integração entre frontend e backend. Feito para controle interno da empresa.",
    intranet_title: "Intranet corporativa - Empresa de Turismo",
    intranet_desc: "Intranet para empresa de turismo, reunindo informações internas, metas e dashboards. Modelei o banco de dados do zero e conduzi a migração de todas as informações. Também feito para controle interno da empresa.",
    tag_database: "Banco de dados",
    tag_migration: "Migração de dados",
    github_title: "Atividade no GitHub",
    github_profile: "Ver perfil completo no GitHub",

    contact_title: "Vamos conversar?",
    contact_desc: "Tem uma oportunidade, uma ideia ou quer trocar experiências sobre tecnologia? Vamos conversar! 🚀",
    contact_whatsapp: "WhatsApp",
    contact_email: "E-mail",
    footer_text: "© 2026 Lucas Souza. Feito à mão com HTML, CSS e JavaScript.",
    mascot_message: "Olá! Vamos falar sobre seu interesse? Entre em contato!",
    mascot_aria: "Falar com o Lucas no WhatsApp",

    repo_updated: "atualizado em",
    repo_no_description: "Sem descrição."
  },

  en: {
    nav_projects: "Projects",
    nav_about: "About",
    nav_services: "Services",
    nav_contact: "Contact",

    hero_available: "Available for new projects",
    hero_description: "I'm Lucas, a full-stack developer. I build landing pages, business websites, and systems with login functionality and API integrations, from design to deployment.",
    hero_projects: "View projects",
    hero_contact: "Get in touch",
    hero_resume: "View resume",
    hero_title_start: "I turn",
    hero_title_highlight: "ideas",
    hero_title_middle: "into",
    hero_title_end: "software solutions",

    about_title: "About me",
    about_p1: "I have a degree in Systems Analysis and Development, and I enjoy turning ideas into projects that work in the real world. I build solutions from the database to deployment, always looking to learn something new along the way.",
    about_p2: "I value clean code, fast websites, and experiences that work well on both desktop and mobile.",

    services_title: "Services",
    service_landing_title: "Landing pages",
    service_landing_desc: "Fast, conversion-focused pages with a WhatsApp contact button.",
    service_sites_title: "Business websites",
    service_sites_desc: "Complete, responsive websites for your business, ready to go live.",
    service_systems_title: "Login systems",
    service_systems_desc: "User registration, dashboards, and databases with secure authentication.",
    service_api_title: "API integration",
    service_api_desc: "Payments, catalogs, and third-party services connected to your project.",

    projects_title: "Projects",
    lustv_desc: "A platform for cataloging and rating movies, TV shows, anime, and games, featuring user accounts, custom lists, a community feed, public profiles, and achievements.",
    lustv_feature1: "Infinite scrolling across all tabs using IntersectionObserver, with real pagination for the games API.",
    lustv_feature2: "JWT authentication and email password recovery.",
    lustv_feature3: "Frontend hosted on Vercel and backend on Render, with CORS and environment variables configured.",
    lustv_feature4: "Integration with two APIs: TMDB (movies, TV shows, and anime) and IGDB (games).",
    project_view_site: "Visit website",
    project_github: "View code on GitHub",
    sales_title: "Daily Sales App - Travel Company",
    sales_desc: "A real-world web application for managing and tracking daily sales. It features a REST API built with Node.js and Express, a PostgreSQL database for persistent storage, and frontend-backend integration. Built for internal company use.",
    intranet_title: "Corporate Intranet - Travel Company",
    intranet_desc: "An intranet for a travel company, bringing together internal information, goals, and dashboards. I designed the database from scratch and led the migration of all information. Built for internal company use.",
    tag_database: "Database",
    tag_migration: "Data migration",
    github_title: "GitHub Activity",
    github_profile: "View full GitHub profile",

    contact_title: "Let's talk?",
    contact_desc: "Have an opportunity, an idea, or want to exchange thoughts about technology? Let's talk! 🚀",
    contact_whatsapp: "WhatsApp",
    contact_email: "Email",
    footer_text: "© 2026 Lucas Souza. Crafted with HTML, CSS, and JavaScript.",
    mascot_message: "Hello! Want to talk about your project? Get in touch!",
    mascot_aria: "Contact Lucas on WhatsApp",

    repo_updated: "updated on",
    repo_no_description: "No description."
  },

  es: {
    nav_projects: "Proyectos",
    nav_about: "Sobre mí",
    nav_services: "Servicios",
    nav_contact: "Contacto",

    hero_available: "Disponible para nuevos proyectos",
    hero_description: "Soy Lucas, desarrollador full-stack. Creo landing pages, sitios web corporativos y sistemas con inicio de sesión e integración de APIs, desde el diseño hasta el despliegue.",
    hero_projects: "Ver proyectos",
    hero_contact: "Contactar",
    hero_resume: "Ver currículum",
    hero_title_start: "Transformo",
    hero_title_highlight: "ideas",
    hero_title_middle: "en",
    hero_title_end: "soluciones de software",

    about_title: "Sobre mí",
    about_p1: "Soy graduado en Análisis y Desarrollo de Sistemas y me gusta transformar ideas en proyectos que funcionan de verdad. Desarrollo soluciones desde la base de datos hasta la publicación, siempre buscando aprender algo nuevo en el camino.",
    about_p2: "Me gusta el código organizado, los sitios rápidos y las experiencias que funcionan bien tanto en el ordenador como en el móvil.",

    services_title: "Servicios",
    service_landing_title: "Landing pages",
    service_landing_desc: "Páginas rápidas, enfocadas en la conversión y con botón de WhatsApp.",
    service_sites_title: "Sitios web corporativos",
    service_sites_desc: "Sitios completos y adaptables para tu empresa, listos para publicarse.",
    service_systems_title: "Sistemas con inicio de sesión",
    service_systems_desc: "Registro de usuarios, paneles y bases de datos con autenticación segura.",
    service_api_title: "Integración de APIs",
    service_api_desc: "Pagos, catálogos y servicios de terceros conectados a tu proyecto.",

    projects_title: "Proyectos",
    lustv_desc: "Plataforma para catalogar y valorar películas, series, anime y videojuegos, con cuentas de usuario, listas personalizadas, feed de la comunidad, perfiles públicos y logros.",
    lustv_feature1: "Desplazamiento infinito en todas las pestañas mediante IntersectionObserver y paginación real en la API de videojuegos.",
    lustv_feature2: "Autenticación JWT y recuperación de contraseña por correo electrónico.",
    lustv_feature3: "Frontend alojado en Vercel y backend en Render, con CORS y variables de entorno configurados.",
    lustv_feature4: "Integración con dos APIs: TMDB (películas, series y anime) e IGDB (videojuegos).",
    project_view_site: "Ver sitio web",
    project_github: "Ver código en GitHub",
    sales_title: "App de Ventas Diarias - Empresa de Turismo",
    sales_desc: "Aplicación web real para gestionar y supervisar las ventas diarias. Incluye una API REST con Node.js y Express, una base de datos PostgreSQL para almacenamiento persistente e integración entre frontend y backend. Desarrollada para uso interno de la empresa.",
    intranet_title: "Intranet corporativa - Empresa de Turismo",
    intranet_desc: "Intranet para una empresa de turismo que reúne información interna, objetivos y paneles de control. Diseñé la base de datos desde cero y coordiné la migración de toda la información. Desarrollada para uso interno de la empresa.",
    tag_database: "Base de datos",
    tag_migration: "Migración de datos",
    github_title: "Actividad en GitHub",
    github_profile: "Ver perfil completo de GitHub",

    contact_title: "¿Hablamos?",
    contact_desc: "¿Tienes una oportunidad, una idea o quieres intercambiar experiencias sobre tecnología? ¡Hablemos! 🚀",
    contact_whatsapp: "WhatsApp",
    contact_email: "Correo electrónico",
    footer_text: "© 2026 Lucas Souza. Hecho a mano con HTML, CSS y JavaScript.",
    mascot_message: "¡Hola! ¿Quieres hablar sobre tu proyecto? ¡Contáctame!",
    mascot_aria: "Contactar con Lucas por WhatsApp",

    repo_updated: "actualizado el",
    repo_no_description: "Sin descripción."
  }
};

/* ==== TRADUÇÕES MANUAIS DOS REPOSITÓRIOS ==== */
const descricoesRepos = {
  "Atividades-Faculdade": {
    pt: "Algumas atividades básicas para teste, enquanto estava no meu período da faculdade...",
    en: "Some basic test activities from my time in college...",
    es: "Algunas actividades básicas de prueba, durante mi etapa universitaria..."
  },

  "catalogo-filmes": {
    pt: "Plataforma para catalogar e avaliar filmes, séries, animes e jogos.",
    en: "Platform for cataloging and rating movies, TV shows, anime, and games.",
    es: "Plataforma para catalogar y valorar películas, series, anime y videojuegos."
  },

  "meu-portfolio": {
    pt: "Portfólio pessoal para apresentar meus projetos e habilidades como desenvolvedor.",
    en: "Personal portfolio showcasing my projects and developer skills.",
    es: "Portafolio personal para presentar mis proyectos y habilidades como desarrollador."
  }
};

function obterIdiomaAtual() {
  try {
    const idioma = localStorage.getItem("idioma-portfolio");
    if (idioma && traducoes[idioma]) return idioma;
  } catch (e) {}

  return "pt";
}

function obterDescricaoRepo(repo, idioma) {
  const traducoesRepo = descricoesRepos[repo.name];

  if (traducoesRepo) {
    return traducoesRepo[idioma]
      || traducoesRepo.pt
      || repo.description
      || traducoes[idioma].repo_no_description;
  }

  // Para repositórios sem tradução cadastrada, mantém a descrição original do GitHub.
  return repo.description || traducoes[idioma].repo_no_description;
}

/* ==== ATIVIDADE NO GITHUB ==== */
let repositoriosEscolhidos = [];
let githubDisponivel = false;

function renderizarRepositorios(idioma = obterIdiomaAtual()) {
  const lista = document.getElementById("gh-repos");
  const secao = document.getElementById("github");

  if (!lista || !secao || !githubDisponivel) return;

  lista.replaceChildren();

  repositoriosEscolhidos.forEach((repo) => {
    const a = document.createElement("a");
    a.className = "repo";
    a.href = repo.html_url;
    a.target = "_blank";
    a.rel = "noopener";

    const nome = document.createElement("strong");
    nome.textContent = repo.name;

    const desc = document.createElement("span");
    desc.className = "desc";
    desc.textContent = obterDescricaoRepo(repo, idioma);

    const meta = document.createElement("span");
    meta.className = "meta";

    const locale = idioma === "pt"
      ? "pt-BR"
      : idioma === "en"
        ? "en-US"
        : "es-ES";

    const data = new Date(repo.pushed_at).toLocaleDateString(locale, {
      month: "short",
      year: "numeric"
    });

    const prefixo = traducoes[idioma].repo_updated;

    meta.textContent =
      (repo.language ? repo.language + " · " : "") +
      prefixo + " " + data;

    a.append(nome, desc, meta);
    lista.appendChild(a);
  });

  secao.hidden = false;
}

async function carregarRepositorios() {
  const USUARIO = "lucassouza-dev13";
  const secao = document.getElementById("github");
  const lista = document.getElementById("gh-repos");

  if (!secao || !lista) return;

  try {
    let repos = null;

    try {
      const salvo = JSON.parse(
        sessionStorage.getItem("gh-repos") || "null"
      );

      if (salvo && Date.now() - salvo.t < 600000) {
        repos = salvo.d;
      }
    } catch (e) {}

    if (!repos) {
      const resposta = await fetch(
        `https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=30`
      );

      if (!resposta.ok) {
        throw new Error("GitHub " + resposta.status);
      }

      repos = await resposta.json();

      try {
        sessionStorage.setItem(
          "gh-repos",
          JSON.stringify({ t: Date.now(), d: repos })
        );
      } catch (e) {}
    }

    const proprios = repos.filter(
      (repo) =>
        !repo.fork &&
        repo.name.toLowerCase() !== USUARIO.toLowerCase()
    );

    const comDescricao = proprios.filter((repo) => repo.description);

    repositoriosEscolhidos = (
      comDescricao.length >= 2 ? comDescricao : proprios
    ).slice(0, 4);

    if (!repositoriosEscolhidos.length) return;

    githubDisponivel = true;
    renderizarRepositorios(obterIdiomaAtual());
  } catch (e) {
    // Se a API falhar, a seção continua escondida.
  }
}

carregarRepositorios();

/* ==== FAIXA DE TECNOLOGIAS ==== */
const trilho = document.querySelector(".faixa-trilho");

if (trilho && !trilho.dataset.clonado) {
  const originais = [...trilho.children];

  for (let i = 0; i < 3; i++) {
    originais.forEach((el) => {
      const copia = el.cloneNode(true);
      copia.setAttribute("aria-hidden", "true");
      trilho.appendChild(copia);
    });
  }

  trilho.dataset.clonado = "true";
}

/* ==== BARRA DE PROGRESSO ==== */
const barra = document.getElementById("progresso");

if (barra) {
  const atualizar = () => {
    const max =
      document.documentElement.scrollHeight - window.innerHeight;

    barra.style.transform =
      `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };

  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
}

/* ==== LUZ DO MOUSE E INCLINAÇÃO DOS CARDS ==== */
const podeMover =
  matchMedia("(hover: hover)").matches &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches;

if (podeMover) {
  const GRAUS = 15;

  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".card, .repo");
    if (!card) return;

    card.classList.add("tilt");

    const r = card.getBoundingClientRect();
    if (!r.width || !r.height) return;

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

  const luz = document.getElementById("luz-mouse");

  if (luz) {
    let alvoX = 0;
    let alvoY = 0;
    let x = 0;
    let y = 0;
    let rodando = false;
    let primeiro = true;

    const mover = () => {
      x += (alvoX - x) * 0.12;
      y += (alvoY - y) * 0.12;

      luz.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (Math.abs(alvoX - x) + Math.abs(alvoY - y) > 0.5) {
        requestAnimationFrame(mover);
      } else {
        rodando = false;
      }
    };

    window.addEventListener("mousemove", (e) => {
      alvoX = e.clientX;
      alvoY = e.clientY;

      if (primeiro) {
        x = alvoX;
        y = alvoY;
        primeiro = false;
        luz.style.opacity = "1";
      }

      if (!rodando) {
        rodando = true;
        requestAnimationFrame(mover);
      }
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", () => {
      luz.style.opacity = "0";
    });

    document.documentElement.addEventListener("mouseenter", () => {
      luz.style.opacity = "1";
    });
  }
}

/* ==== APLICAR IDIOMA ==== */
function aplicarIdioma(idioma) {
  if (!traducoes[idioma]) return;

  document.documentElement.lang =
    idioma === "pt" ? "pt-BR" : idioma;

  document.querySelectorAll("[data-i18n-aria]").forEach((elemento) => {
    const chave = elemento.dataset.i18nAria;
    const texto = traducoes[idioma][chave];

    if (texto) {
      elemento.setAttribute("aria-label", texto);
    }
  });

  document.querySelectorAll("[data-i18n]").forEach((elemento) => {
    const chave = elemento.dataset.i18n;
    const texto = traducoes[idioma][chave];

    if (texto) {
      elemento.textContent = texto;
    }
  });

  document.querySelectorAll(".idioma-btn").forEach((botao) => {
    const selecionado = botao.dataset.lang === idioma;

    botao.classList.toggle("ativo", selecionado);
    botao.setAttribute("aria-pressed", String(selecionado));
  });

  try {
    localStorage.setItem("idioma-portfolio", idioma);
  } catch (e) {}

  // Atualiza os cards já carregados, sem fazer outra chamada à API.
  renderizarRepositorios(idioma);
}

/* ==== BOTÕES DE IDIOMA ==== */
document.querySelectorAll(".idioma-btn").forEach((botao) => {
  botao.addEventListener("click", () => {
    aplicarIdioma(botao.dataset.lang);
  });
});

/* ==== IDIOMA INICIAL ==== */
aplicarIdioma(obterIdiomaAtual());
