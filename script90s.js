// ------------------ pop formulario --------------------------------
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
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
      document.getElementById("popupObrigado").style.display = "flex";
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

function fecharPopup() {
  document.getElementById("popupObrigado").style.display = "none";
}

  // ------------------------- data e hora ----------------------------------------
  const dataHoje = new Date();
  const data = { day: 'numeric', month: 'long', year: 'numeric' };

  document.getElementById('data-hoje').textContent = dataHoje.toLocaleDateString('pt-BR', data);

  function atualizarHora() {
      const agora = new Date();
      const horas = agora.getHours().toString().padStart(2, '0');
      const minutos = agora.getMinutes().toString().padStart(2, '0');
      const segundos = agora.getSeconds().toString().padStart(2, "0");
      document.getElementById('hora-agora').textContent = `${horas}:${minutos}:${segundos}`;
      }

      atualizarHora();

      setInterval(atualizarHora, 1000);
  