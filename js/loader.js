const routes = {
    '': 'home.html',
    '#home': 'home.html',
    '#sobre': 'sobre.html',
    '#portfolio': 'portfolio.html',
    '#contato': 'contato.html'
};

function loadPage() {
    const hash = window.location.hash || '#home';
    const page = routes[hash];

    fetch(`./pages/${page}`)
        .then(res => res.text())
        .then(html => {
            document.getElementById('page-content').innerHTML = html;

            iniciarClock();
    });
}

window.addEventListener('load', loadPage);
window.addEventListener('hashchange', loadPage);
