// ----------- toggle button -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleAwesome");
  if (!toggle) return;

  const onAwesome = location.pathname.includes("awesome-web-site");

  toggle.checked = onAwesome;

  toggle.addEventListener("click", () => {
    setTimeout(() => {
      if (onAwesome) {
        location.assign("index.html#contato&no-smooth");
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
  document.addEventListener("DOMContentLoaded", () => {
	const toggle = document.querySelector(".toggle-awesome");
	let jaMostrou = false; 

	toggle.addEventListener("mouseenter", () => {
		if (!jaMostrou) {
			toggle.classList.add("show-easter-egg");
			jaMostrou = true;

			setTimeout(() => {
				toggle.classList.remove("show-easter-egg");
			}, 1200); 
		}
	});
});
