// ----------- toggle button -----------------------------
document.getElementById("toggleAwesome").addEventListener("change", () => {
    const paginaAtual = window.location.pathname;
  
    if (paginaAtual.includes("index")) {
      window.location.href = "awesome-web-site.html";
    } else {
      window.location.href = "index.html#contato&no-smooth'";
    }
  });

window.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("toggleAwesome");
    const paginaAtual = window.location.pathname;
  
    if (paginaAtual.includes("awesome-web-site")) {
      checkbox.checked = true;
    }
  });
