const inputan = document.querySelector(".inputan");
const hintElement = document.querySelector(".hint span");
const guessLeftElement = document.querySelector(".guess-left span");
const wrongLetterElement = document.querySelector(".wrong-letter span");
const timerElement = document.getElementById("time");

let selectedWord, selectedHint, maxGuesses, wrongLetters, correctLetters;

function startGame() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    selectedWord = ranObj.word;
    selectedHint = ranObj.hint;
    maxGuesses = 5;
    wrongLetters = [];
    correctLetters = Array(selectedWord.length).fill('');

    hintElement.innerText = selectedHint;
    guessLeftElement.innerText = maxGuesses;
    wrongLetterElement.innerText = wrongLetters.join(", ");
    
    inputan.innerHTML = "";
    for (let i = 0; i < selectedWord.length; i++) {
        inputan.innerHTML += `<input type="text" disabled>`;
    }
}

function handleInput(e) {
    let letter = e.key.toLowerCase();
    if (!letter.match(/[a-z]/i) || wrongLetters.includes(letter) || correctLetters.includes(letter)) {
        return;
    }

    if (selectedWord.includes(letter)) {
        selectedWord.split('').forEach((char, index) => {
            if (char === letter) {
                correctLetters[index] = letter;
                inputan.children[index].value = letter;
            }
        });
    } else {
        wrongLetters.push(letter);
        maxGuesses--;
    }

    guessLeftElement.innerText = maxGuesses;
    wrongLetterElement.innerText = wrongLetters.join(", ");

    checkGameStatus();
}

function checkGameStatus() {
    if (correctLetters.join('') === selectedWord) {
        alert("Selamat Anda Menang!");
        startGame();
    } else if (maxGuesses === 0) {
        alert(`Yah game over Kata yang benar adalah "${selectedWord}".`);
        startGame();
    }
}


document.addEventListener("keydown", handleInput);
document.querySelector(".reset-btn").addEventListener("click", startGame);

startGame();
