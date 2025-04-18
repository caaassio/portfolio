// ------------------ pop formulario --------------------------------
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio padrão
    console.log("Formulário enviado");
  
    const form = e.target;
  
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
    .then(response => {
      if (response.ok) {
        console.log("Resposta ok");
        document.getElementById("popupObrigado").style.display = "flex";
        form.reset(); // limpa o formulário
      } else {
        alert("Algo deu errado. Tente novamente.");
      }
    });
  });

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
  