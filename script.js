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
  });
});

function closeModal() {
  modalContent.classList.remove('show');
  modal.classList.remove('active');
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// ---------------- intersection observer
// Fallback para animação reveal
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  let lastScrollTop = 0;

  // Escolhe o threshold baseado no tamanho da tela
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const thresholdValue = isMobile ? 0.2 : 0.5; // 20% no mobile, 50% no desktop

  const observer = new IntersectionObserver((entries) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollingDown = scrollTop > lastScrollTop;

      entries.forEach(entry => {
          const index = Array.from(reveals).indexOf(entry.target);
          const isLastSection = index === reveals.length - 1;

          if (entry.isIntersecting) {
              entry.target.classList.add('visible'); // Anima ao entrar
          } else if (!scrollingDown && !entry.isIntersecting) {
              // Reverte apenas ao subir, se o elemento saiu da viewport
              if (!isLastSection) {
                  entry.target.classList.remove('visible');
              }
          }
      });

      lastScrollTop = scrollTop;
  }, {
      threshold: isMobile ? 0.2 : 0.5,
      rootMargin: isMobile ? '-20% 0px' : '-50px 0px' // Atrasar reversão no mobile
  });

  reveals.forEach(reveal => observer.observe(reveal));

  // Interceptar cliques em links internos
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });
});