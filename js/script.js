/* ====== DADOS DO SITE ======
  Para adicionar novas experiências,
   basta incluir um novo item nas listas abaixo. */
const CONFIG = {
  email: "paulojferrreira1999@outlook.com",
};

const EXPERIENCES = [
  {
    empresa: "Instituto das Cidades Inteligentes (ICI)",
    cargo: "Técnico de TI",
    periodo: "Agosto de 2022 – atual",
    atividades: [
      "Atendimento técnico presencial e remoto.",
      "Suporte a usuários e sistemas corporativos.",
      "Diagnóstico e resolução de problemas de software, hardware e conectividade.",
      "Instalação, configuração e manutenção de equipamentos.",
      "Suporte a aplicações e análise de erros de acesso.",
      "Configuração de impressoras, softwares e recursos de rede.",
      "Manutenção preventiva de equipamentos e máquinas virtuais.",
      "Registro de ocorrências, documentação técnica e acompanhamento de chamados.",
      "Orientação aos usuários e acompanhamento das soluções aplicadas."
    ]
  }
];

const EDUCATION = [
  { nivel: "Graduação", itens: ["Análise e Desenvolvimento de Sistemas"] },
  { nivel: "Pós-graduações", itens: [
    "Gestão da Tecnologia da Informação",
    "Segurança e Defesa Cibernética"
  ]}
];

const SKILLS = [
  { categoria: "Suporte e infraestrutura", itens: [
    "Suporte técnico presencial e remoto", "Windows e ambientes computacionais",
    "Redes de computadores", "Configuração e manutenção de equipamentos",
    "Diagnóstico e resolução de incidentes", "Sistemas corporativos"
  ]},
  { categoria: "Sistemas e processos", itens: [
    "Análise de incidentes", "Documentação técnica",
    "Atendimento e acompanhamento de solicitações",
    "Análise de problemas e validação de soluções"
  ]},
  { categoria: "Desenvolvimento", itens: [
    "HTML, CSS e JavaScript", "Java (em aprendizado)",
    "Spring Boot e APIs REST (em estudos)", "Git e GitHub"
  ]}
];

/* ====== RENDERIZAÇÃO ====== */
const $ = (s) => document.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = (arr) => `<ul>${arr.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;

EXPERIENCES.forEach(x => {
  const item = el("div", "tl-item reveal");
  item.innerHTML = `<div class="card"><h3>${esc(x.cargo)} — ${esc(x.empresa)}</h3><p class="period">${esc(x.periodo)}</p>${list(x.atividades)}</div>`;
  $("#timeline").appendChild(item);
});

EDUCATION.forEach(x => $("#formacaoCards").appendChild(el("article", "card reveal", `<h4>${esc(x.nivel)}</h4>${list(x.itens)}`)));
SKILLS.forEach(x => $("#skillsCards").appendChild(el("article", "card reveal", `<h4>${esc(x.categoria)}</h4>${list(x.itens)}`)));



/* ====== MENU, TEMA, ANO ====== */
const toggle = document.querySelector(".nav-toggle"), menu = $("#menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));

const root = document.documentElement;
try { const saved = localStorage.getItem("tema"); if (saved) root.dataset.theme = saved; } catch {}
$("#themeToggle").addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("tema", next); } catch {}
});
$("#year").textContent = new Date().getFullYear();

/* ====== ANIMAÇÃO AO ROLAR ====== */
const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
}, { threshold: .12 }) : null;
document.querySelectorAll(".reveal").forEach(n => io ? io.observe(n) : n.classList.add("visible"));
