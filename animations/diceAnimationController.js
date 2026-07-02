

const randomDice1 = document.getElementById("randomDice1");
const randomDice2 = document.getElementById("randomDice2");


export function drawDice1(value) {
    randomDice1.src = `./resources/img/dice/${value}.png`;
}

export function drawDice2(value) {
    randomDice2.src = `./resources/img/dice/${value}.png`;
}