// -------------- toggle menu --------------------------------
document.addEventListener("DOMContentLoaded", function () {
    
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector("header ul");

    if (menuBtn && menu) {
        menuBtn.addEventListener("click", function () {
            menu.classList.toggle("show");
        });
    }
});


// ----------------- efeito typing --------------------------------

const texto = "Olá, eu sou Cassio Rodrigues, desenvolvedor Front-end";
const elemento = document.getElementById("typewriter");

let i = 0;

function digitar(texto, callback) {
    if (i < texto.length) {
        elemento.innerHTML += texto.charAt(i);
        i++;
        setTimeout(() => digitar(texto, callback), 140);
    } else if (callback) {
        callback();
    }
}

digitar(texto, () => {

});

// ---------------------- efeito typing para mobile -----------

const lines = document.querySelectorAll('.css-typing h4');

lines.forEach((line, index) => {
  const delays = [2000, 4100, 6300]; 

  setTimeout(() => {
    line.classList.add('typed');
  }, delays[index]);
});


// ------------------- foguete ---------------------------
const rocketButton = document.getElementById('backToTop');

rocketButton.addEventListener('click', () => {
  rocketButton.classList.add('active');

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  setTimeout(() => {
    rocketButton.classList.remove('active');
  }, 800);
});


// ------------------ pop formulario --------------------------------
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
    e.preventDefault(); // impede envio padrão

    const form = e.target;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
    })
    .then(response => {
      if (response.ok) {
        document.getElementById("popupObrigado").style.display = "flex";
        form.reset(); // limpa o formulário
      } else {
        alert("Algo deu errado. Tente novamente.");
      }
    });
  });

  function fecharPopup() {
    document.getElementById("popupObrigado").style.display = "none";
  }


// --------------- Modal --------------------------------------
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalDescription = document.getElementById('modal-description'); // Novo elemento para descrição
const closeBtn = document.querySelector('.close-btn');
const cardActions = document.getElementById('card-actions');

// Seleciona todos os cards
const cards = document.querySelectorAll('.card');

// Para cada card, adiciona o evento de click
cards.forEach(card => {
  card.addEventListener('click', () => {
      const imgSrc = card.querySelector('img').src;
      const description = card.getAttribute('data-description');

      // Atualiza o conteúdo do modal
      modalImg.src = imgSrc;
      modalDescription.innerHTML = description;

      // Limpa o conteúdo anterior do modal
      cardActions.innerHTML = "";

      // Clona o card-actions escondido do card clicado
      const actions = card.querySelector('.card-actions');
      if (actions) {
          const clonedActions = actions.cloneNode(true); // Faz uma cópia completa
          clonedActions.style.display = "flex"; // Garante que fique visível no modal
          cardActions.appendChild(clonedActions);
      }

      // Mostra o modal
      modal.style.display = 'flex';
  });
});

// Fecha o modal ao clicar no botão de fechar
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// (opcional) Fecha o modal ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
