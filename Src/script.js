const canvas = document.querySelector('canvas');
const c = canvas.getContext("2d");

// Ajusta o tamanho do Canvas(Provavelmente será mudada no futuro essas medidas)
canvas.width = 1024;
canvas.height = 576;

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image()
image.src = '/img/mapa-inicio.png'
console.log(image);

image.onload = () => {
    c.drawImage(image, -750, -500)
}
