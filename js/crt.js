const canvas = document.getElementById('crt-canvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

const lineHeight = 8;
let offset = 0;

function draw() {

    // limpa completamente o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // apenas as scanlines
    for (let y = offset; y < canvas.height; y += lineHeight * 2) {
        ctx.fillStyle = 'rgba(0, 255, 102, 0.10)';
        ctx.fillRect(0, y, canvas.width, lineHeight);
    }

    offset += 1;
    if (offset >= lineHeight * 2) offset = 0;

    requestAnimationFrame(draw);
}

draw();
