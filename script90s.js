// ------------------ pop formulario --------------------------------
const formulario = document.getElementById("meuFormulario");

if (formulario) {
  formulario.addEventListener("submit", function (e) {
    e.preventDefault(); 

    const form = e.target;

    fetch(form.action, {
      method: form.method,
      headers: {
        'Accept': 'application/json' 
      },
      body: new FormData(form),
    })
    .then(response => {
      if (response.ok) {
        const popup = document.getElementById("popupObrigado");
        if (popup) popup.style.display = "flex";
        form.reset();
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

document.getElementById('data-hoje').textContent = dataHoje.toLocaleDateString('pt-BR', formatoData);

function atualizarHora() {
    const agora = new Date();
    const horas = agora.getHours().toString().padStart(2, '0');
    const minutos = agora.getMinutes().toString().padStart(2, '0');
    const segundos = agora.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('hora-agora').textContent = `${horas}:${minutos}:${segundos}`;
}

atualizarHora();

setInterval(atualizarHora, 1000);


// ------------------------- crt / scanline ----------------------------------------
const canvas = document.getElementById('crt');
const ctx = canvas.getContext('2d');

function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resize();
window.addEventListener('resize', resize);

const lineHeight = 8;
let offset = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = offset; y < canvas.height; y += lineHeight * 2) {
        ctx.fillStyle = 'rgba(63, 158, 101, 0.15)';
        ctx.fillRect(0, y, canvas.width, lineHeight);
    }

    offset = (offset + 1) % (lineHeight * 2);
    requestAnimationFrame(draw);
}

draw();
