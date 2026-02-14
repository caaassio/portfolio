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
