
const routes = {
  '': 'home.html',
  'home': 'home.html',
  'sobre': 'sobre.html',
  'portfolio': 'portfolio.html',
  'contato': 'contato.html',

  'portfolio/barbearia-trims': 'barbearia-trims.html',
  'portfolio/dora-doces': 'dora-doces.html',
  'portfolio/halo-vet': 'halo-vet.html'
};

async function loadPage() {
  // Remove o # e obtém a rota atual
  const route = window.location.hash.slice(1);

  // Procura o arquivo correspondente à rota
  const page = routes[route] || routes[''];

  const url = `./pages/${page}`;

  console.log("Rota:", route);
  console.log("URL solicitada:", url);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${url}`);
    }

    const html = await response.text();

    // Ajuste "#conteudo" para o ID do elemento
    // onde você quer inserir o HTML carregado.
    document.querySelector("#page-content").innerHTML = html;

    console.log("Página carregada:", page);

  } catch (error) {
    console.error("Erro ao carregar página:", error);
  }
}

window.addEventListener("load", loadPage);
window.addEventListener("hashchange", loadPage);
