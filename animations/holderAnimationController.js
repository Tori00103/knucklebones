//*ініціалізація та додавання розміру канвасу з холдерами 
const canvases = document.querySelectorAll(".holderCanvas");

canvases.forEach(canvas => {
    canvas.width = 150;
    canvas.height = 150;
});


const holderImg = new Image();
holderImg.src = "./animations/spritesheets/field_animation.png";

const SPRITE_W = 200;
const SPRITE_H = 200;

const DRAW_SIZE = 150;

const COLS = 4;
const ROWS = 9;

const activeAnimations = new Map();


export function drawIdle(canvas) {
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, DRAW_SIZE, DRAW_SIZE);

    ctx.drawImage(
        holderImg,
        0,
        0,
        SPRITE_W,
        SPRITE_H,
        0,
        0,
        DRAW_SIZE,
        DRAW_SIZE
    );
}


function drawFrame(ctx, frameX, frameY) {
    ctx.clearRect(0, 0, DRAW_SIZE, DRAW_SIZE);

    ctx.drawImage(
        holderImg,
        frameX * SPRITE_W,
        frameY * SPRITE_H,
        SPRITE_W,
        SPRITE_H,
        0,
        0,
        DRAW_SIZE,
        DRAW_SIZE
    );
}


export function playAnimationOnce(canvas) {
    const ctx = canvas.getContext("2d");

    let frameX = 0;
    let frameY = 0;

   
    if (activeAnimations.has(canvas)) {
        cancelAnimationFrame(activeAnimations.get(canvas));
    }

    function animate() {
        drawFrame(ctx, frameX, frameY);

       
        if (frameX === COLS - 1 && frameY === ROWS - 1) {
            activeAnimations.delete(canvas);
            drawIdle(canvas); 
            return;
        }

        frameX++;

        if (frameX >= COLS) {
            frameX = 0;
            frameY++;
        }

        activeAnimations.set(canvas, requestAnimationFrame(animate));
    }

    animate();
}


export function initCanvas(canvases) {
    holderImg.onload = () => {
        canvases.forEach(c => drawIdle(c));
    };
}