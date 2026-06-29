const canvasesHolder = document.querySelectorAll('.holderCanvas');

const holderImg = new Image();
holderImg.src = "resources/spritesheets/field_animation.png";

const spriteWidth = 200;
const spriteHeight = 200;

function animate() {
    canvasesHolder.forEach(canvas => {
        const ctx = canvas.getContext('2d');

        canvas.width = 150;
        canvas.height = 150;

        ctx.clearRect(0, 0, 150, 150);

        ctx.drawImage(
            holderImg,
            0, 0, spriteWidth, spriteHeight,
            0, 0, 150, 150
        );
    });

    requestAnimationFrame(animate);
}

animate();