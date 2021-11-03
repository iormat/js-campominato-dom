/*
PARTE PRELIMINARE
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100 facile
con difficoltà 2 => tra 1 e 81 medio
con difficoltà 3 => tra 1 e 49 difficile
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro (o simili, 
l’importante è dare all’utente il feedback che ha scoperto una casella che rimarrà scoperta, con il numero relativo).
PARTE SECONDA
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su ogni cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
(come detto sull’effetiva interfaccia fate voi, non ci son specifiche vincolanti, ma partite semplici)
La partita termina quando il giocatore clicca su una bomba
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, 
cioè il numero di volte che l’utente ha cliccato un quadratino con un numero consentito. 
 (quindi se ci pensate dovrete tenere traccia del punteggio).

*/

/*
PARTE PRELIMINARE
1. give user the ability to choose the difficulty
2. make clickable cells that changes to give user the feeling of "selection"
    2.1 make a function to create a set number of elements
3. when pressed, cells must look different to confirm selection
PARTE SECONDA
4. randomize 16 "bomb" numbers without repeatition
    4.1 create array to contain "bomb" number
        4.2 randomize "bomb" numbers
5. if cell number macthes "bomb" number = game over
*/

// 4.1
const bombArr = [];
// point counter counter
let click = 0;
const mineField = document.getElementById('minefield');
// 1.
const diffSelection = document.getElementById('diff_selection');

//function to create squares
function createSquare(squareCont, squareStyle, gameDiff) {
    let node = document.createElement(squareCont);
    node.classList.add(squareStyle , gameDiff);
    return node;
}
// function to randomize 16 numbers within difficulty limits
function randomNumberGener(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

document.getElementById('start_game').addEventListener('click',

    function() {
        // delete eventual already created grid
        mineField.innerHTML = "";
        // take chosen difficulty 
        if(diffSelection.value === "1"){
            difficulty = 101;
            gameDiff = 'easy';
        }else if(diffSelection.value === "2"){
            difficulty = 82;
            gameDiff = 'medium';
        }else if(diffSelection.value === "3"){
            difficulty = 50;
            gameDiff = 'hard';
        }
        // 2.
        for(let i = 1; i < difficulty; i++) {
            let newElement = createSquare('div', 'square', gameDiff);
            mineField.appendChild(newElement);
            // 3.
            newElement.addEventListener('click',
                function(){
                    document.getElementById('score').innerHTML = ++click;
                    // 4.2.
                    for (let i = 0; bombArr.length < 16; i++) {
                        let randNum = randomNumberGener(1, difficulty);
                        if (bombArr.includes(randNum) === false){
                        bombArr.push(randNum);
                        } 
                    }
                    if(bombArr.includes(i)) {
                        newElement.classList.add('bomb');
                        newElement.innerHTML = `&ohm;`;
                        alert(`mi dispiace, ma hai perso! Hai totalizzato: ${click - 1} punti`);
                        window.location.reload();
                    }else {
                        newElement.innerHTML = i;
                        newElement.classList.add('active');    
                    }
                    console.log(bombArr)

                    if(click === 16) {
                        alert(`Congratulazioni! Non so come tu abbia fatto, ma hai VINTO!`)
                    }
                }
            );
        }
    }
);
