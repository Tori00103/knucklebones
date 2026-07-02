import { playAnimationOnce, initCanvas } from "./animations/holderAnimationController.js";
import { drawDice1, drawDice2 } from "./animations/diceAnimationController.js";
const canvases = document.querySelectorAll(".holderCanvas");

initCanvas(canvases);


const randomizerP1 = document.querySelector('.player_1 .randomizer');
const randomizerP2 = document.querySelector('.player_2 .randomizer');

const scoreP1 = document.querySelector('.player_1_score');
const scoreP2 = document.querySelector('.player_2_score');

const fieldP1 = document.querySelectorAll('.player_1_field .row');
const fieldP2 = document.querySelectorAll('.player_2_field .row');

let currentPlayer = 1;
let currentRoll = null;



function rollDice() {
  currentRoll = Math.floor(Math.random() * 6) + 1;

  if (currentPlayer === 1) {
        drawDice1(currentRoll);
    } else {
        drawDice2(currentRoll);
    }
}

randomizerP1.addEventListener('click', () => {
  if (currentPlayer !== 1 || currentRoll) return;
  rollDice();
});

randomizerP2.addEventListener('click', () => {
  if (currentPlayer !== 2 || currentRoll) return;
  rollDice();
});



function setupField(fieldRows, enemyRows, player) {
  fieldRows.forEach((row, rowIndex) => {
    const holders = row.querySelectorAll('.holderCanvas');;

    holders.forEach(holder => {
      holder.addEventListener('click', () => {

        if (currentPlayer !== player) return;
        if (!currentRoll) return;
        if (holder.textContent !== "0") return;

        
        holder.textContent = currentRoll;
        playAnimationOnce(holder);

        
        removeEnemyValues(enemyRows[rowIndex], currentRoll);

        currentRoll = null;
        updateAll();

        switchPlayer();
      });
    });
  });
}



function removeEnemyValues(enemyRow, value) {
  const holders = enemyRow.querySelectorAll('.holderCanvas');

  holders.forEach(h => {
    if (Number(h.textContent) === value) {
      h.textContent = "0";
    }
  });
}



function calculateRowScore(values) {
  const counts = {};

  values.forEach(v => {
    if (v === 0) return;
    counts[v] = (counts[v] || 0) + 1;
  });

  let sum = 0;

  for (let val in counts) {
    sum += val * counts[val] * counts[val];
  }

  return sum;
}



function updateAll() {
  updateRows(fieldP1, scoreP1);
  updateRows(fieldP2, scoreP2);
}



function updateRows(fieldRows, scoreDisplay) {
  let total = 0;

  fieldRows.forEach(row => {
    const holders = row.querySelectorAll('.holderCanvas');

    const values = Array.from(holders).map(h => Number(h.textContent));

    const rowScore = calculateRowScore(values);

    const rowSum = row.querySelector('.row_sum');
    rowSum.textContent = rowScore;

    total += rowScore;
  });

  scoreDisplay.textContent = total;
}



function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}


setupField(fieldP1, fieldP2, 1);
setupField(fieldP2, fieldP1, 2);