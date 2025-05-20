// ------------------ pop formulario --------------------------------
const formulario = document.getElementById("meuFormulario");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio padrão

    const form = e.target;

    fetch(form.action, {
      method: form.method,
      headers: {
        'Accept': 'application/json' // evita redirecionamento e recebe JSON da Formspree
      },
      body: new FormData(form),
    })
    .then(response => {
      if (response.ok) {
        const popup = document.getElementById("popupObrigado");
        if (popup) popup.style.display = "flex";
        form.reset(); // limpa o formulário
      } else {
        alert("Algo deu errado. Tente novamente.");
      }
    })
    .catch(error => {
      console.error("Erro:", error);
      alert("Ocorreu um erro ao enviar o formulário.");
    });
  });
}

function fecharPopup() {
  const popup = document.getElementById("popupObrigado");
  if (popup) popup.style.display = "none";
}

  // ------------------------- data e hora ----------------------------------------
const dataHoje = new Date();
const formatoData = { day: 'numeric', month: 'long', year: 'numeric' };

// Exibe a data formatada
document.getElementById('data-hoje').textContent = dataHoje.toLocaleDateString('pt-BR', formatoData);

function atualizarHora() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('hora-agora').textContent = `${horas}:${minutos}:${segundos}`;
}

// Atualiza imediatamente ao carregar
atualizarHora();

// Atualiza a cada segundo
setInterval(atualizarHora, 1000);
