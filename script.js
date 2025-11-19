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

    carouselImagesContainer.innerHTML = '';

    const imgSrcs = [
      card.querySelector('picture img')?.src,
      card.getAttribute('data-img-2'),
      card.getAttribute('data-img-3'),
      card.getAttribute('data-img-4'),
      card.getAttribute('data-img-5')
    ].filter(src => !!src); 

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
(function() {
  const body = document.body;
  const switchBtn = document.getElementById('themeSwitch');
  const checkbox = document.getElementById('themeToggle');

  function applyTheme(theme) {
    const isLight = theme === 'light';
    body.classList.toggle('light', isLight);
    body.classList.toggle('dark', !isLight);
    checkbox.checked = isLight;
    switchBtn.classList.toggle('active', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }

  const saved = localStorage.getItem('theme') ||
                (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(saved);

  checkbox.addEventListener('change', () => {
    applyTheme(checkbox.checked ? 'light' : 'dark');
  });
})();

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
const menuLinks = document.querySelectorAll('header ul li a.internal-link');

function setActiveLink() {
    let index = -1;

    document.querySelectorAll('section').forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            index = i;
        }
    });

    menuLinks.forEach(link => link.classList.remove('active'));

    if (index !== -1) {
        const id = document.querySelectorAll('section')[index].id;
        const activeLink = document.querySelector(`header ul li a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

window.addEventListener('scroll', setActiveLink);

setActiveLink();

// ---------------- transparencia header --------------------------------------
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {

      header.style.transform = 'translateY(-100%)';
    } else {

      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

