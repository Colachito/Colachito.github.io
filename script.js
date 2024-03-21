document.addEventListener("DOMContentLoaded", function() {
    const garden = document.querySelector(".garden");
    const otherImages = ["pngaaa.com-4690626.png", "PngItem_3433071.png"]; // Lista de otras imágenes
    let currentOtherImageIndex = Math.floor(Math.random() * otherImages.length); // Índice de la otra imagen actual
    let nextOtherImageIndex;
    let imageCount = 0; // Variable para contar el número de imágenes mostradas

    function createSunflower() {
        const sunflower = document.createElement("div");
        sunflower.classList.add("flower", "sunflower");
        
        const center = document.createElement("div");
        center.classList.add("center");
        sunflower.appendChild(center);
        
        for (let i = 0; i < 12; i++) { // 12 pétalos por girasol
            const petal = document.createElement("div");
            petal.classList.add("petal");
            const angle = (360 / 12) * i;
            petal.style.transform = `rotate(${angle}deg) translateY(-40px)`;
            sunflower.appendChild(petal);
        }
        
        return sunflower;
    }

    function createOtherImage(imageSrc) {
        const otherImage = document.createElement("img");
        otherImage.classList.add("flower", "other-image");
        otherImage.src = imageSrc;
        otherImage.style.width = "130px"; // Ancho de la imagen
        otherImage.style.height = "95px"; // Altura de la imagen

        return otherImage;
    }

    function getRandomPosition() {
        const x = Math.random() * (window.innerWidth - 200) + 100; // Ajusta el rango de la posición horizontal
        const y = Math.random() * (window.innerHeight - 200) + 100; // Ajusta el rango de la posición vertical
        return { top: `${y}px`, left: `${x}px` };
    }

    function isOverlapping(x, y) {
        const flowers = document.querySelectorAll('.flower');
        const threshold = 100; // Umbral de superposición
    
        for (let i = 0; i < flowers.length; i++) {
            const flower = flowers[i];
            const rect = flower.getBoundingClientRect(); // Obtener las coordenadas del rectángulo del elemento
            const flowerX = rect.left + window.pageXOffset; // Coordenada x de la flor
            const flowerY = rect.top + window.pageYOffset; // Coordenada y de la flor
    
            const distance = Math.sqrt((x - flowerX) ** 2 + (y - flowerY) ** 2); // Calcular la distancia entre la nueva posición y la flor existente
    
            if (distance < threshold) {
                return true; // Hay superposición
            }
        }
    
        return false; // No hay superposición
    }

    function addSunflower() {
        const sunflower = createSunflower();
        let position;
        do {
            position = getRandomPosition();
        } while (isOverlapping(parseInt(position.left), parseInt(position.top)));
        sunflower.style.top = position.top;
        sunflower.style.left = position.left;
        garden.appendChild(sunflower);

        setTimeout(() => {
            garden.removeChild(sunflower);
        }, Math.random() * 8000 + 8000); // Ajustar el rango de tiempo de aparición/desaparición
    }

    let currentOtherImageSrc = ""; // Variable para rastrear la fuente de la imagen actual
    let currentOtherImage = null; // Variable para rastrear el elemento de imagen actual
    
    function addOtherImage() {
        if (imageCount < 5) { // Permitir un máximo de dos imágenes en pantalla
            const nextOtherImageIndex = currentOtherImageIndex === 0 ? 1 : 0; // Alternar entre las otras imágenes
            const nextOtherImageSrc = otherImages[nextOtherImageIndex];
            
            if (currentOtherImageSrc !== nextOtherImageSrc) { // Verificar que la imagen a agregar sea diferente a la actual
                const otherImage = createOtherImage(nextOtherImageSrc);
                let position;
                do {
                    position = getRandomPosition();
                } while (isOverlapping(parseInt(position.left), parseInt(position.top)));
                otherImage.style.position = "absolute"; // Establecer posición absoluta
                otherImage.style.top = position.top;
                otherImage.style.left = position.left;
                garden.appendChild(otherImage);
                imageCount++; // Incrementar el contador de imágenes en pantalla
    
                currentOtherImageSrc = nextOtherImageSrc; // Actualizar la fuente de la imagen actual
                currentOtherImage = otherImage; // Actualizar el elemento de imagen actual
    
                setTimeout(() => {
                    garden.removeChild(otherImage);
                    currentOtherImageIndex = nextOtherImageIndex; // Actualizar el índice de la otra imagen actual
                    currentOtherImage = null; // Reiniciar el elemento de imagen actual
                    imageCount--; // Decrementar el contador de imágenes en pantalla
                }, Math.random() * 1000 + 1000); // Ajustar el rango de tiempo de aparición/desaparición
            }
        }
    }

    // Añadir girasoles y otras imágenes de forma intermitente
    setInterval(addSunflower, 2500);
    setInterval(addOtherImage, 2500); // Cambia la frecuencia según sea necesario
});
