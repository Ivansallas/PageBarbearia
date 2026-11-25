/* =========================================================
   Barbearia do Luiz — scripts do site
   ========================================================= */

const WHATSAPP_NUMERO = "5511999999999";

// Horários de atendimento por dia da semana (0 = domingo).
// Cada número é a hora de início de um atendimento.
const HORARIOS_POR_DIA = {
  0: [], // domingo fechado
  1: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  2: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  3: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  4: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  5: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  6: [8, 9, 10, 11], // sábado até 12h
};

const MESES_A_FRENTE = 2; // quantos meses além do atual podem ser agendados

const SERVICOS = {
  cabelo: "Corte de cabelo (R$ 40,00)",
  barba: "Barba (R$ 35,00)",
  "cabelo+barba": "Cabelo + Barba (R$ 70,00)",
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenuMobile();
  iniciarVoltarTopo();
  iniciarAnimacoes();
  iniciarMascaraTelefone();
  atualizarAno();
  iniciarFormularioContato();
  iniciarAgenda();
});

/* ---------- Menu mobile ---------- */
function iniciarMenuMobile() {
  const botao = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");
  if (!botao || !menu) return;

  const alternar = (abrir) => {
    menu.classList.toggle("menu-ativo", abrir);
    botao.classList.toggle("menu-mobile-ativo", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  };

  botao.addEventListener("click", () => alternar(!menu.classList.contains("menu-ativo")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => alternar(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("menu-ativo")) {
      alternar(false);
      botao.focus();
    }
  });
}

/* ---------- Voltar ao topo ---------- */
function iniciarVoltarTopo() {
  const botao = document.getElementById("voltar-topo");
  if (!botao) return;

  const atualizar = () => botao.classList.toggle("visivel", window.scrollY > 400);
  window.addEventListener("scroll", atualizar, { passive: true });
  atualizar();

  botao.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- Animação de entrada ---------- */
function iniciarAnimacoes() {
  const elementos = document.querySelectorAll(".revelar");
  if (!elementos.length) return;

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((el) => observador.observe(el));
}

/* ---------- Ano no rodapé ---------- */
function atualizarAno() {
  document.querySelectorAll(".ano-atual").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- Máscara de telefone ---------- */
function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  if (digitos.length <= 2) return digitos.length ? `(${digitos}` : "";
  const ddd = digitos.slice(0, 2);
  const resto = digitos.slice(2);
  if (resto.length <= 4) return `(${ddd}) ${resto}`;
  const corte = resto.length === 9 ? 5 : 4;
  return `(${ddd}) ${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

function iniciarMascaraTelefone() {
  document.querySelectorAll('[data-mascara="telefone"]').forEach((campo) => {
    campo.addEventListener("input", () => {
      campo.value = formatarTelefone(campo.value);
    });
  });
}

/* ---------- Validação ---------- */
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONE = /^\(\d{2}\) \d{4,5}-\d{4}$/;

function mostrarErro(elemento, mensagem) {
  const campo = elemento.closest(".campo");
  if (!campo) return;
  const erro = campo.querySelector(".erro-mensagem");
  campo.classList.toggle("invalido", Boolean(mensagem));
  if (erro) erro.textContent = mensagem || "";
  if (elemento.matches("input, textarea, select")) {
    elemento.setAttribute("aria-invalid", mensagem ? "true" : "false");
  }
}

function validarCampos(regras) {
  let primeiroInvalido = null;
  regras.forEach(({ elemento, validar }) => {
    if (!elemento) return;
    const mensagem = validar((elemento.value || "").trim());
    mostrarErro(elemento, mensagem);
    if (mensagem && !primeiroInvalido) primeiroInvalido = elemento;
  });
  if (primeiroInvalido) {
    const alvo = primeiroInvalido.type === "hidden" ? primeiroInvalido.closest(".campo") : primeiroInvalido;
    alvo.scrollIntoView({ behavior: "smooth", block: "center" });
    if (alvo.focus && primeiroInvalido.type !== "hidden") alvo.focus({ preventScroll: true });
  }
  return !primeiroInvalido;
}

// Limpa o erro assim que o usuário corrige o campo
function limparErroAoDigitar(formulario) {
  formulario.querySelectorAll("input, textarea, select").forEach((el) => {
    el.addEventListener("input", () => mostrarErro(el, ""));
    el.addEventListener("change", () => mostrarErro(el, ""));
  });
}

function linkWhatsApp(texto) {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}

function exibirAviso(formulario, mensagemWhatsApp) {
  const aviso = formulario.querySelector(".aviso");
  const link = aviso.querySelector("[data-whatsapp]");
  link.href = linkWhatsApp(mensagemWhatsApp);
  aviso.classList.add("visivel");
  aviso.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* ---------- Formulário de contato ---------- */
function iniciarFormularioContato() {
  const formulario = document.getElementById("formulario-contato");
  if (!formulario) return;
  limparErroAoDigitar(formulario);

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = formulario.elements;

    const valido = validarCampos([
      { elemento: f.nome, validar: (v) => (v.length < 3 ? "O nome deve ter pelo menos 3 letras." : "") },
      { elemento: f.sobrenome, validar: (v) => (v.length < 2 ? "Informe seu sobrenome." : "") },
      { elemento: f.email, validar: (v) => (!REGEX_EMAIL.test(v) ? "Digite um e-mail válido." : "") },
      { elemento: f.telefone, validar: (v) => (!REGEX_TELEFONE.test(v) ? "Digite um telefone válido, ex.: (11) 99999-9999." : "") },
      { elemento: f.mensagem, validar: (v) => (v.length < 10 ? "A mensagem deve ter pelo menos 10 caracteres." : "") },
    ]);
    if (!valido) return;

    const texto =
      `Olá! Sou ${f.nome.value.trim()} ${f.sobrenome.value.trim()}.\n\n` +
      `${f.mensagem.value.trim()}\n\n` +
      `Prefiro retorno por ${f.contato.value}, no período da ${f.periodo.value.toLowerCase()}.\n` +
      `Telefone: ${f.telefone.value} · E-mail: ${f.email.value.trim()}`;

    exibirAviso(formulario, texto);
  });
}

/* ---------- Agenda ---------- */
function iniciarAgenda() {
  const formulario = document.getElementById("formulario-agenda");
  const grade = document.getElementById("calendario-dias");
  if (!formulario || !grade) return;

  const titulo = document.getElementById("calendario-titulo");
  const btnAnterior = document.getElementById("mes-anterior");
  const btnSeguinte = document.getElementById("mes-seguinte");
  const campoData = document.getElementById("data");
  const resumoData = document.getElementById("data-resumo");
  const slots = document.getElementById("slots");
  const slotsVazio = document.getElementById("slots-vazio");
  const campoServico = document.getElementById("servico");

  const hoje = inicioDoDia(new Date());
  const primeiroMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoMes = new Date(hoje.getFullYear(), hoje.getMonth() + MESES_A_FRENTE, 1);
  let mesVisivel = new Date(primeiroMes);
  let dataSelecionada = null;

  // Destaca o dia de hoje na lista de horários
  const itemHoje = document.querySelector(`#lista-horarios [data-dia="${hoje.getDay()}"]`);
  if (itemHoje) itemHoje.classList.add("hoje");

  // Pré-seleciona o serviço vindo do link (ex.: agenda.html?servico=barba)
  const servicoUrl = new URLSearchParams(location.search).get("servico");
  if (servicoUrl) {
    const valor = servicoUrl.replace(/ /g, "+"); // "+" vira espaço na URL
    if (SERVICOS[valor]) campoServico.value = valor;
  }

  limparErroAoDigitar(formulario);

  function inicioDoDia(data) {
    return new Date(data.getFullYear(), data.getMonth(), data.getDate());
  }

  function paraISO(data) {
    const m = String(data.getMonth() + 1).padStart(2, "0");
    const d = String(data.getDate()).padStart(2, "0");
    return `${data.getFullYear()}-${m}-${d}`;
  }

  function horariosLivres(data) {
    const horas = HORARIOS_POR_DIA[data.getDay()] || [];
    if (data.getTime() !== hoje.getTime()) return horas;
    const agora = new Date();
    // Hoje: só horários que ainda não começaram
    return horas.filter((h) => h > agora.getHours());
  }

  function diaDisponivel(data) {
    return data >= hoje && horariosLivres(data).length > 0;
  }

  function renderizarCalendario() {
    const ano = mesVisivel.getFullYear();
    const mes = mesVisivel.getMonth();
    const nomeMes = mesVisivel.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    titulo.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    btnAnterior.disabled = mesVisivel <= primeiroMes;
    btnSeguinte.disabled = mesVisivel >= ultimoMes;

    grade.innerHTML = "";
    const deslocamento = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < deslocamento; i++) {
      grade.appendChild(document.createElement("div"));
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const data = new Date(ano, mes, dia);
      const disponivel = diaDisponivel(data);
      const celula = document.createElement(disponivel ? "button" : "div");
      celula.textContent = dia;
      celula.className = "dia " + (disponivel ? "disponivel" : "indisponivel");

      if (data.getTime() === hoje.getTime()) celula.classList.add("hoje");

      if (disponivel) {
        celula.type = "button";
        celula.setAttribute(
          "aria-label",
          data.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })
        );
        if (dataSelecionada && data.getTime() === dataSelecionada.getTime()) {
          celula.classList.add("selecionado");
          celula.setAttribute("aria-pressed", "true");
        }
        celula.addEventListener("click", () => selecionarData(data));
      } else {
        celula.setAttribute("aria-hidden", "true");
      }

      grade.appendChild(celula);
    }
  }

  function selecionarData(data) {
    dataSelecionada = data;
    campoData.value = paraISO(data);
    mostrarErro(campoData, "");

    const texto = data.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" });
    resumoData.textContent = texto.charAt(0).toUpperCase() + texto.slice(1);
    resumoData.classList.remove("vazio");

    renderizarCalendario();
    renderizarHorarios();
  }

  function renderizarHorarios() {
    slots.innerHTML = "";
    const horas = dataSelecionada ? horariosLivres(dataSelecionada) : [];
    slotsVazio.hidden = horas.length > 0;

    horas.forEach((h) => {
      const hora = `${String(h).padStart(2, "0")}:00`;
      const rotulo = document.createElement("label");
      rotulo.className = "opcao";
      rotulo.innerHTML = `<input type="radio" name="horario" value="${hora}" /><span>${hora}</span>`;
      rotulo.querySelector("input").addEventListener("change", (e) => mostrarErro(e.target, ""));
      slots.appendChild(rotulo);
    });
  }

  btnAnterior.addEventListener("click", () => {
    mesVisivel = new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() - 1, 1);
    renderizarCalendario();
  });

  btnSeguinte.addEventListener("click", () => {
    mesVisivel = new Date(mesVisivel.getFullYear(), mesVisivel.getMonth() + 1, 1);
    renderizarCalendario();
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = formulario.elements;
    const horario = formulario.querySelector('input[name="horario"]:checked');
    const campoHorario = slots.querySelector("input") || slotsVazio;

    const valido = validarCampos([
      { elemento: f.servico, validar: (v) => (!v ? "Escolha um serviço." : "") },
      { elemento: campoData, validar: (v) => (!v ? "Selecione um dia no calendário." : "") },
      { elemento: campoHorario, validar: () => (!horario ? "Escolha um horário." : "") },
      { elemento: f.nome, validar: (v) => (v.length < 3 ? "Informe seu nome completo." : "") },
      { elemento: f.telefone, validar: (v) => (!REGEX_TELEFONE.test(v) ? "Digite um telefone válido, ex.: (11) 99999-9999." : "") },
      { elemento: f.email, validar: (v) => (v && !REGEX_EMAIL.test(v) ? "Digite um e-mail válido ou deixe em branco." : "") },
    ]);
    if (!valido) return;

    const servico = SERVICOS[f.servico.value];
    const dataTexto = resumoData.textContent;
    const obs = f.observacoes.value.trim();

    document.getElementById("aviso-resumo").textContent =
      `${servico} · ${dataTexto}, às ${horario.value}. Confirme pelo WhatsApp: a mensagem já vai preenchida.`;

    const texto =
      `Olá! Gostaria de agendar um horário.\n\n` +
      `Nome: ${f.nome.value.trim()}\n` +
      `Serviço: ${servico}\n` +
      `Data: ${dataTexto}\n` +
      `Horário: ${horario.value}\n` +
      `Telefone: ${f.telefone.value}` +
      (f.email.value.trim() ? `\nE-mail: ${f.email.value.trim()}` : "") +
      (obs ? `\nObservações: ${obs}` : "");

    exibirAviso(formulario, texto);
  });

  // Se hoje não tem mais horários (ou é domingo) e o mês acabou, começa no próximo mês
  const temDiaNoMes = (() => {
    const totalDias = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    for (let d = hoje.getDate(); d <= totalDias; d++) {
      if (diaDisponivel(new Date(hoje.getFullYear(), hoje.getMonth(), d))) return true;
    }
    return false;
  })();
  if (!temDiaNoMes) mesVisivel = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 1);

  renderizarCalendario();
  renderizarHorarios();
}
