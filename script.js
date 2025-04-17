// Menu mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuMobile = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");

  if (menuMobile) {
    menuMobile.addEventListener("click", function () {
      menu.classList.toggle("menu-ativo");
      menuMobile.classList.toggle("menu-mobile-ativo");
    });
  }

  // Botão voltar ao topo
  const botaoVoltarTopo = document.getElementById("voltar-topo");

  if (botaoVoltarTopo) {
    // Mostrar/esconder o botão baseado na posição do scroll
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        botaoVoltarTopo.style.display = "block";
      } else {
        botaoVoltarTopo.style.display = "none";
      }
    });

    // Voltar ao topo quando o botão for clicado
    botaoVoltarTopo.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Lazy loading para imagens
  const imagens = document.querySelectorAll("img[data-src]");

  if (imagens.length > 0) {
    const carregarImagem = function (entrada, observador) {
      entrada.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const img = entrada.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observador.unobserve(img);
        }
      });
    };

    const observador = new IntersectionObserver(carregarImagem, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    imagens.forEach((img) => {
      observador.observe(img);
    });
  }
});

// Validação do formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Remover mensagens de erro anteriores
            const erros = document.querySelectorAll('.erro-mensagem');
            erros.forEach(erro => erro.remove());
            
            let temErro = false;
            
            // Validar nome
            const nome = document.getElementById('nome');
            if (!nome.value.trim()) {
                mostrarErro(nome, 'Por favor, preencha seu nome');
                temErro = true;
            }
            
            // Validar email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                mostrarErro(email, 'Por favor, preencha seu email');
                temErro = true;
            } else if (!validarEmail(email.value)) {
                mostrarErro(email, 'Por favor, insira um email válido');
                temErro = true;
            }
            
            // Validar telefone
            const telefone = document.getElementById('telefone');
            if (!telefone.value.trim()) {
                mostrarErro(telefone, 'Por favor, preencha seu telefone');
                temErro = true;
            }
            
            // Validar mensagem
            const mensagem = document.getElementById('mensagem');
            if (!mensagem.value.trim()) {
                mostrarErro(mensagem, 'Por favor, preencha sua mensagem');
                temErro = true;
            }
            
            if (!temErro) {
                // Aqui você pode adicionar o código para enviar o formulário
                alert('Formulário enviado com sucesso!');
                form.reset();
            }
        });
    }
    
    // Função para mostrar mensagem de erro
    function mostrarErro(campo, mensagem) {
        const erro = document.createElement('span');
        erro.className = 'erro-mensagem';
        erro.textContent = mensagem;
        campo.parentNode.insertBefore(erro, campo.nextSibling);
        campo.style.borderColor = '#e74c3c';
    }
    
    // Função para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Máscara para o telefone
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length > 11) valor = valor.slice(0, 11);
            
            if (valor.length > 2) {
                valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
            }
            if (valor.length > 9) {
                valor = `${valor.slice(0, 9)}-${valor.slice(9)}`;
            }
            
            e.target.value = valor;
        });
    }
});

// Calendário de agendamento
document.addEventListener('DOMContentLoaded', function() {
    const diasDisponiveis = document.querySelectorAll('.dia.disponivel');
    
    diasDisponiveis.forEach(dia => {
        dia.addEventListener('click', function() {
            // Remover seleção anterior
            document.querySelectorAll('.dia.selecionado').forEach(d => {
                d.classList.remove('selecionado');
            });
            
            // Adicionar seleção ao dia clicado
            this.classList.add('selecionado');
            
            // Atualizar o campo de data no formulário
            const dataInput = document.getElementById('data');
            if (dataInput) {
                const data = this.textContent;
                const mes = document.querySelector('.mes h3').textContent;
                dataInput.value = `${data} de ${mes}`;
            }
// Menu mobile
document.addEventListener("DOMContentLoaded", function () {
  const menuMobile = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");

  if (menuMobile) {
    menuMobile.addEventListener("click", function () {
      menu.classList.toggle("menu-ativo");
      menuMobile.classList.toggle("menu-mobile-ativo");
    });
  }

  // Botão voltar ao topo
  const botaoVoltarTopo = document.getElementById("voltar-topo");

  if (botaoVoltarTopo) {
    // Mostrar/esconder o botão baseado na posição do scroll
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        botaoVoltarTopo.style.display = "block";
      } else {
        botaoVoltarTopo.style.display = "none";
      }
    });

    // Voltar ao topo quando o botão for clicado
    botaoVoltarTopo.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Lazy loading para imagens
  const imagens = document.querySelectorAll("img[data-src]");

  if (imagens.length > 0) {
    const carregarImagem = function (entrada, observador) {
      entrada.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const img = entrada.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observador.unobserve(img);
        }
      });
    };

    const observador = new IntersectionObserver(carregarImagem, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    imagens.forEach((img) => {
      observador.observe(img);
    });
  }
});
