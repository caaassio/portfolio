// -------------- toggle menu --------------------------------
document.addEventListener("DOMContentLoaded", function () {
    
    const menuBtn = document.getElementById("menu-btn");
    const menu = document.querySelector("header ul");

    if (menuBtn && menu) {
        menuBtn.addEventListener("click", function () {
            menu.classList.toggle("show");
        });
    }

    const links = menu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("show");
    
    });
});
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

// ------------------efeito typing para mobile -----------

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


// ------------------------ pop formulario ----------------------------
document.getElementById("meuFormulario").addEventListener("submit", function (e) {
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
      document.getElementById("popupObrigado").style.display = "flex";
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

function fecharPopup() {
  document.getElementById("popupObrigado").style.display = "none";
};

// ----------------------------- Modal --------------------------------------
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close-btn');
const cardActions = document.getElementById('card-actions');
const modalContent = modal.querySelector('.modal-content');
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    const imgSrc = card.querySelector('img').src;
    const description = card.getAttribute('data-description');

    modalImg.src = imgSrc;
    modalDescription.innerHTML = description;

    cardActions.innerHTML = "";
    const actions = card.querySelector('.card-actions');
    if (actions) {
      const clonedActions = actions.cloneNode(true);
      clonedActions.style.display = "flex";
      cardActions.appendChild(clonedActions);
    }

    modal.classList.add('active');
    modalContent.classList.add('show');
    document.body.classList.add('modal-aberto'); // ⬅️ Bloqueia rolagem
  });
});

function closeModal() {
  modalContent.classList.remove('show');
  modal.classList.remove('active');
  document.body.classList.remove('modal-aberto'); // ⬅️ Libera rolagem
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});


// -------------------- animação botão enviar para mobile ----------------
const botao = document.querySelector('.form button');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      botao.classList.add('entrando');
      botao.classList.remove('saindo');
    } else {
      botao.classList.remove('entrando');
      botao.classList.add('saindo');
    }
  });
}, {
  threshold: 0.3 // sensibilidade (ajuste se quiser que ative mais cedo ou mais tarde)
});

observer.observe(botao);