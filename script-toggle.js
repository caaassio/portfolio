// ----------- toggle button -----------------------------
document.getElementById("toggleVersao").addEventListener("change", () => {
    const paginaAtual = window.location.pathname;
  
    if (paginaAtual.includes("index")) {
      window.location.href = "awesome-web-site.html";
    } else {
      window.location.href = "index.html";
    }
  });

window.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("toggleVersao");
    const paginaAtual = window.location.pathname;
  
    if (paginaAtual.includes("awesome-web-site")) {
      checkbox.checked = true;
    }
  });

// ------------  transição entre páginas ---------------------

