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
        setTimeout(() => digitar(texto, callback), 120);
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
const closeBtn = document.querySelector('.close-btn');
const modalContent = modal.querySelector('.modal-content');
const cards = document.querySelectorAll('.card');
const prevBtn = modal.querySelector('.carousel-btn.prev');
const nextBtn = modal.querySelector('.carousel-btn.next');
const carouselImagesContainer = document.querySelector('.carousel-images');

let current = 0;
let carouselImages = [];

function showImage(index) {
  carouselImages.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Limpa imagens antigas
    carouselImagesContainer.innerHTML = '';

    // Pega as imagens do card
    const imgSrcs = [
      card.querySelector('picture img')?.src,
      card.getAttribute('data-img-2'),
      card.getAttribute('data-img-3'),
      card.getAttribute('data-img-4'),
      card.getAttribute('data-img-5')
    ].filter(src => !!src); // Remove valores nulos/falsos

    // Cria as imagens dinamicamente
    carouselImages = [];

    imgSrcs.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = 'carousel-image';
      img.alt = `Imagem ${idx + 1}`;
      carouselImagesContainer.appendChild(img);
      carouselImages.push(img);
    });

    current = 0;
    showImage(current);

    modal.classList.add('active');
    modalContent.classList.add('show');
    document.body.classList.add('modal-aberto');
  });
});

prevBtn.addEventListener('click', () => {
  if (carouselImages.length === 0) return;
  current = (current - 1 + carouselImages.length) % carouselImages.length;
  showImage(current);
});

nextBtn.addEventListener('click', () => {
  if (carouselImages.length === 0) return;
  current = (current + 1) % carouselImages.length;
  showImage(current);
});

// Swipe
let startX = 0;
let endX = 0;

carouselImagesContainer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carouselImagesContainer.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

carouselImagesContainer.addEventListener('touchend', () => {
  if (startX && endX) {
    const diff = startX - endX;
    if (Math.abs(diff) > 50 && carouselImages.length > 1) {
      if (diff > 0) {
        // Swipe esquerda
        current = (current + 1) % carouselImages.length;
        showImage(current);
      } else {
        // Swipe direita
        current = (current - 1 + carouselImages.length) % carouselImages.length;
        showImage(current);
      }
    }
  }
  startX = 0;
  endX = 0;
});

function closeModal() {
  modalContent.classList.remove('show');
  modal.classList.remove('active');
  document.body.classList.remove('modal-aberto');
  carouselImagesContainer.innerHTML = '';
  carouselImages = [];
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
  threshold: 0.3 
});

observer.observe(botao);


// ------------------- toggle light -------------------------------
    function toggleMode() {
        const body = document.body;
        const checkbox = document.querySelector('.switch input');

        if (body.classList.contains('light')) {
            body.classList.remove('light');
            body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            checkbox.checked = false;
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
            localStorage.setItem('theme', 'light');
            checkbox.checked = true;
        }
    }

    window.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;
        const checkbox = document.querySelector('.switch input');

        if (savedTheme === 'light') {
            body.classList.add('light');
            checkbox.checked = true;
        } else {
            body.classList.add('dark');  
            checkbox.checked = false;
        }
    });

// ---------------------- Pop sério? ------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const popupAlerta = document.getElementById('popupAlerta');
  const fecharPopupAlerta = document.getElementById('fecharPopupAlerta');

  let popupJaExibido = false; 

  emailInput.addEventListener('focus', () => {
    if (nomeInput.value.trim() !== '' && !popupJaExibido) {
      popupAlerta.style.display = 'flex';
      popupJaExibido = true; 
    }
  });

  fecharPopupAlerta.addEventListener('click', () => {
    popupAlerta.style.display = 'none';
  });
});

// ------------------------ no smooth -----------------------------------

window.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;

  if (url.includes('no-smooth')) {

    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';

    document.querySelectorAll('.reveal').forEach(el => {
      el.style.animation = 'none';
    });

    const hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
      const hash = url.substring(hashIndex + 1).split('&')[0];
      const target = document.getElementById(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
      }
    }

    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';

      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';

      document.querySelectorAll('.reveal').forEach(el => {
        el.style.animation = '';
      });
    }, 1000);
  }
});

// -------------------- menu active ---------------------------------
// Seleciona todos os links internos do menu
const menuLinks = document.querySelectorAll('header ul li a.internal-link');

// Função para verificar a seção atual
function setActiveLink() {
    let index = -1;

    // Para cada seção, verifica qual está mais próxima do topo
    document.querySelectorAll('section').forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            index = i;
        }
    });

    // Remove active de todos
    menuLinks.forEach(link => link.classList.remove('active'));

    // Se encontrou uma seção visível, adiciona active no link correspondente
    if (index !== -1) {
        const id = document.querySelectorAll('section')[index].id;
        const activeLink = document.querySelector(`header ul li a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Detecta o scroll e chama a função
window.addEventListener('scroll', setActiveLink);

// Chama inicialmente para o caso de abrir a página no meio
setActiveLink();


// ---------------- transparencia header --------------------------------------
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Rolando para baixo → esconde
        header.style.transform = 'translateY(-100%)';
    } else {
        // Rolando para cima → mostra
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
});

