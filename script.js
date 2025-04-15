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