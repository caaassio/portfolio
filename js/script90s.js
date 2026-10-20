// ------------------------- Loader SPA -------------------------
function loadPage() {
  const hash = window.location.hash.replace("#", "") || "home";

  fetch(`pages/${hash}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Página não encontrada");
      }
      return response.text();
    })
    .then(html => {
      const container = document.getElementById("page-content");
      if (container) {
        container.innerHTML = html;
      }

      initPageScripts();
    })
    .catch(error => {
      console.error("Erro ao carregar página:", error);
    });
}

window.addEventListener("hashchange", loadPage);

window.addEventListener("DOMContentLoaded", loadPage);


// -------------------- Formulário --------------------
function initPageScripts() {
  initFormulario();
}

function initFormulario() {
  document.addEventListener("submit", function (e) {
    const formulario = e.target;

    if (formulario.id !== "meuFormulario") return;

    e.preventDefault();

    const popup = document.getElementById("popupObrigado");

    fetch(formulario.action, {
      method: formulario.method,
      headers: { 'Accept': 'application/json' },
      body: new FormData(formulario),
    })
    .then(response => {
      if (response.ok && popup) {
        popup.style.display = "flex";
        formulario.reset();
      }
    })
    .catch(error => {
      console.error("Erro ao enviar formulário:", error);
    });
  });

  // Botão fechar popup
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-popup")) {
      const popup = document.getElementById("popupObrigado");
      if (popup) popup.style.display = "none";
    }
  });
}

// popup galeria de fotos
let imagemAtual = 0;
let imagensGaleria = [];

document.addEventListener("click", function (event) {
    const imagem = event.target.closest(".fotos-port img");

    const popup = document.querySelector("#popup-imagem");

    // Abre o popup ao clicar em uma imagem
    if (imagem && popup) {
        imagensGaleria = Array.from(
            document.querySelectorAll(".fotos-port img")
        );

        imagemAtual = imagensGaleria.indexOf(imagem);

        atualizarPopup();

        popup.classList.add("aberto");
        popup.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
        return;
    }

    // Fecha pelo X
    if (event.target.closest(".popup-fechar")) {
        fecharPopup();
        return;
    }

    // Avança para a próxima imagem
    if (event.target.closest("#popup-proximo")) {
        navegarImagem(1);
        return;
    }

    // Volta para a imagem anterior
    if (event.target.closest("#popup-anterior")) {
        navegarImagem(-1);
        return;
    }

    // Fecha ao clicar fora da janela
    if (event.target.id === "popup-imagem") {
        fecharPopup();
    }
});

function atualizarPopup() {
    const imagemAmpliada = document.querySelector(
        "#popup-img-ampliada"
    );

    const contador = document.querySelector("#popup-contador");

    if (!imagemAmpliada || imagensGaleria.length === 0) {
        return;
    }

    const imagem = imagensGaleria[imagemAtual];

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt || "Imagem do portfólio";

    contador.textContent =
        `${imagemAtual + 1} de ${imagensGaleria.length}`;
}

function navegarImagem(direcao) {
    if (imagensGaleria.length === 0) {
        return;
    }

    imagemAtual =
        (imagemAtual + direcao + imagensGaleria.length)
        % imagensGaleria.length;

    atualizarPopup();
}

function fecharPopup() {
    const popup = document.querySelector("#popup-imagem");
    const imagemAmpliada = document.querySelector(
        "#popup-img-ampliada"
    );

    if (!popup) {
        return;
    }

    popup.classList.remove("aberto");
    popup.setAttribute("aria-hidden", "true");

    if (imagemAmpliada) {
        imagemAmpliada.src = "";
    }

    document.body.style.overflow = "";
}

// Atalhos de teclado
document.addEventListener("keydown", function (event) {
    const popup = document.querySelector("#popup-imagem");

    if (!popup || !popup.classList.contains("aberto")) {
        return;
    }

    if (event.key === "Escape") {
        fecharPopup();
    }

    if (event.key === "ArrowRight") {
        navegarImagem(1);
    }

    if (event.key === "ArrowLeft") {
        navegarImagem(-1);
    }
});