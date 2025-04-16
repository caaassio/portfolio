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

    // setTimeout(() => {
    //     elemento.innerHTML = "";
    //     i = 0;
    //     digitar(texto2);

    //     setTimeout(() => {
    //         elemento.innerHTML = "";
    //         i = 0;
    //         digitar(texto3);
    //     }, 5000);

    // }, 5000);

});

// ---------------------- efeito typing para mobile -----------

const lines = document.querySelectorAll('.css-typing h4');

lines.forEach((line, index) => {
  const delays = [2000, 4100, 6300]; 

  setTimeout(() => {
    line.classList.add('typed');
  }, delays[index]);
});

// -------------------------------- Transparência botão back to top ---------------------------
// window.addEventListener("scroll", function () {
//     let btt = document.querySelector(".btt");

//         if (btt) {
//             if (window.scrollY > 50) {
//                 btt.style.opacity = "0.3";
//             } else {
//                 btt.style.opacity = "0.7";
//             }
//         }
//     });


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

// ----------------- Modal  --------------------------------------
const modal = document.getElementById("modal");
const modalImgContainer = document.getElementById("modal-img"); // Vai virar um container
const modalText = document.getElementById("modal-text");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const imgElement = card.querySelector("img");
    const imgSrc = imgElement.getAttribute("src");
    const text = card.querySelector("p").innerHTML;

    // Deriva os caminhos das versões desktop e mobile
    const imgDesk = imgSrc;
    const imgMobile = imgSrc.replace("tela-desk", "tela-mobile");

    // Cria o elemento <picture> com <source> e <img>
    modalImgContainer.innerHTML = `
      <picture>
        <source srcset="${imgMobile}" media="(max-width: 768px)">
        <img src="${imgDesk}" alt="Imagem do projeto">
      </picture>
    `;

    modalText.innerHTML = text;
    modal.classList.add("show");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  modal.classList.add("hide");

  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("hide");
  }, 400); // tempo igual ao popOut
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    modal.classList.add("hide");

    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("hide");
    }, 400);
  }
});

const observer = new MutationObserver(() => {
  if (modal.classList.contains("show")) {
    modal.style.display = "flex";
  }
});

observer.observe(modal, { attributes: true });

// --------------- carrossel -----------------------------------
const cards = document.querySelectorAll(".card");
let currentIndex = 0;

function openModal(index) {
  const card = cards[index];
  const imgElement = card.querySelector("img");
  const imgSrc = imgElement.getAttribute("src");
  const text = card.querySelector("p").innerHTML;

  const imgDesk = imgSrc;
  const imgMobile = imgSrc.replace("tela-desk", "tela-mobile");

  modalImgContainer.innerHTML = `
    <picture>
      <source srcset="${imgMobile}" media="(max-width: 768px)">
      <img src="${imgDesk}" alt="Imagem do projeto">
    </picture>
  `;

  modalText.innerHTML = text;
  modal.classList.add("show");
  currentIndex = index;
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => openModal(index));
});

document.getElementById("prev-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  openModal(currentIndex);
});

document.getElementById("next-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % cards.length;
  openModal(currentIndex);
});

let touchStartX = 0;
let touchEndX = 0;

modal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

modal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > 50) {
    // Swipe para a direita → card anterior
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    openModal(currentIndex);
  } else if (swipeDistance < -50) {
    // Swipe para a esquerda → próximo card
    currentIndex = (currentIndex + 1) % cards.length;
    openModal(currentIndex);
  }
}
