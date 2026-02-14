function iniciarClock() {
    const dataElemento = document.getElementById('data-hoje');
    const horaElemento = document.getElementById('hora-agora');

    if (!dataElemento || !horaElemento) return;

    const dataHoje = new Date();
    const formatoData = { day: 'numeric', month: 'long', year: 'numeric' };
    dataElemento.textContent = dataHoje.toLocaleDateString('pt-BR', formatoData);

    function atualizarHora() {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');
        const segundos = agora.getSeconds().toString().padStart(2, '0');

        horaElemento.textContent = `${horas}:${minutos}:${segundos}`;
    }

    atualizarHora();
    setInterval(atualizarHora, 1000);
}
