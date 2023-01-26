/* renderização */

const memoryGame = document.querySelector("#memoryGame");
const images  = ['bita-1.png', 'bita-2.png', 'bita-3.png', 'bita-4.png', 'bita-5.png', 'bita-6.png'];

let memoryGame__card = '';

images.forEach(img => {
    memoryGame__card += `
    <div class="memoryGame__card" data-card="${img}">
        <img class="memoryGame__card--frontFace" src="img/${img}">
        <img class="memoryGame__card--backFace" src="img/bita-verso.png">
    </div>
    `
});

memoryGame.innerHTML = memoryGame__card + memoryGame__card;

const cards = document.querySelectorAll('.memoryGame__card'); /* constante cards acionando a lista dos memoryGame__cards */
const btn__reset = document.querySelector('.btn__reset');

let flipped = false;
let firstCard, secondCard;
let lockFlip = false;

function flipCard() { /* Função para virar cards, adicionando classe flip*/
    if(lockFlip) return false;
    this.classList.add('memoryGame__card--flip');
        if (!flipped) {
            flipped= true;
            firstCard = this;
            firstCard.removeEventListener('click', flipCard)
        } 
        else {
            flipped = false;
            secondCard = this;
        }
        checkForMatch();
}


function checkForMatch() { /* Função para checar e executar match*/
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;
    
    !isMatch ? cardMismatch() : freezeCards(isMatch); /* Operador ternário que retorna cardMismatch (avisa que cards nao sao iguais) caso o isMatch seja falso, e freezeCards (para congelar os cards) caso seja verdadeiro */
}

function cardMismatch() { /* retorna os cards que não são iguais a suas posições iniciais, removendo a classe flip*/
    lockFlip = true;

    setTimeout(() => {
        firstCard.classList.remove('memoryGame__card--flip');
        secondCard.classList.remove('memoryGame__card--flip');
        firstCard.addEventListener('click', flipCard)
        freezeCards();
    }, 600);
}

(function shuffleCards () { /* adiciona posições aleatórias para os cards */
    cards.forEach( card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})(); /* callback function - função que chama a si própria */

function freezeCards(isMatch = false) { /* Tranca cards ao encontrar pares iguais, do contrário, reseta os valores de primeiro e segundo card */
    if(isMatch){
        secondCard.removeEventListener('click', flipCard);
        firstCard.classList.add('memoryGame__card--match');
        secondCard.classList.add('memoryGame__card--match');
    }
    [firstCard, secondCard, lockFlip] = [null, null, false];
}

cards.forEach(card => card.addEventListener('click', flipCard)); /* Acessar cards, incluir nova função em cada card adicionando evento de clique que aciona a função flipCard. */

btn__reset.onclick = function () {
      cards.forEach(card => {
        card.classList.remove('memoryGame__card--flip');
        card.classList.remove('memoryGame__card--match');
        card.addEventListener('click', flipCard);
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
        [firstCard, secondCard, lockFlip] = [null, null, false]      
    })
};
