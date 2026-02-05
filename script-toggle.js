document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleAwesome");
  if (!toggle) return;

  const onAwesome = location.pathname.includes("awesome-web-site");

  toggle.checked = onAwesome;

  toggle.addEventListener("click", () => {
    setTimeout(() => {
      if (onAwesome) {
        location.assign("index.html#footer&no-smooth");
      } else {
        location.assign("awesome-web-site.html");
      }
    }, 200);
  });
});

window.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.getElementById("toggleAwesome");
    const paginaAtual = window.location.pathname;
  
    if (paginaAtual.includes("awesome-web-site")) {
      checkbox.checked = true;
    }
  });


// toasty
  document.addEventListener('mouseover', (e) => {
    const knob = e.target.closest('.knob-wrapper');
    if (!knob) return;

    if (knob.dataset.jaMostrou) return;
    knob.dataset.jaMostrou = '1';

    knob.classList.add('show-easter-egg');
    setTimeout(() => knob.classList.remove('show-easter-egg'), 1200);
  });

