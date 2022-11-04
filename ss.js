
//making the overlay screen
let startBtn = document.querySelector('#start-btn');
let  overlayScreen = document.querySelector(".overlay")
let userName = document.querySelector('.name');
document.querySelector('#start-btn').onclick = ()=>{
    let name = prompt("Enter Your Name");
    if(name == null || name == ''){
        userName.textContent = 'guest';
    }else{
    userName.textContent = name;
    }
    console.log(userName);
    document.querySelector(".overlay").remove();
    cards.forEach((card)=>card.classList.add('flipped'));
    setTimeout(function(){
        cards.forEach((card)=>card.classList.remove('flipped'))
    },4* duration)
        
}


    
//helper functions
//dhuffle function
function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

      // Get Random Number
      random = Math.floor(Math.random() * current);

      // Decrease Length By One
    current--;

      // [1] Save Current Element in Stash
    temp = array[current];

      // [2] Current Element = Random Element
    array[current] = array[random];

      // [3] Random Element = Get Element From Stash
    array[random] = temp;

    }

    return array;

}

//the function that flips the card
function flipCard(card){
    card.classList.add('flipped')

    let flippedCards = cards.filter(flippedCard => flippedCard.classList.contains('flipped'));

    //when two cards are flipped
    if (flippedCards.length === 2){
        
        //stop the clicking function
        stopFlipping();

        
        //check if the two cards are matched
        checkMatching(flippedCards[0], flippedCards[1])
        
}

// function that stops the flipping on click
function stopFlipping(){
    cardsContainer.classList.add('stop-flipping');
    setTimeout(()=>{
        cardsContainer.classList.remove('stop-flipping');
    }, duration)
}

//matching checker function
function checkMatching(firstCard, secondCard){
    let triesNo = document.querySelector('.tries');
    if (firstCard.dataset.animal === secondCard.dataset.animal){
        document.querySelector('#success').play();
        //console.log(`They're Matched`);
        secondCard.classList.remove('flipped');
        firstCard.classList.remove('flipped');

        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        //let matchingCards = [];
        //matchingCards.push(flippedCards[0], flippedCards[1]);
        //matchingCards.forEach(card => card.classList.add('flipped'));
        
    }else{
        document.querySelector('#fail').play();
        triesNo.innerHTML = parseInt(triesNo.innerHTML) + 1;
        setTimeout(function(){
            flippedCards.forEach(flippedCard=>flippedCard.classList.remove('flipped'))}, duration)
        
    }
}
    /*if (flippedCards[0].dataset.animal === flippedCards[1].dataset.animal){
        console.log(`They're Matched`);
        //let matchingCards = [];
        //matchingCards.push(flippedCards[0], flippedCards[1]);
        //matchingCards.forEach(card => card.classList.add('flipped'));
        
    }else{
        //flippedCards.forEach(flippedCard=>flippedCard.classList.remove('flipped'));
        
    }*/
}

//the main game
// the duration we will use when the card is flipped

let duration = 500;

let cardsContainer = document.querySelector('.cards')
let cardsArray= Array.from(cardsContainer.childNodes)
let cards= cardsArray.filter((el)=>{
        return el.tagName =='DIV';
    }); // could use cardsContainer.children instead T_T

let orderRange = [...Array(cards.length).keys()];

let shuffledOrder = shuffle(orderRange);
console.log(shuffledOrder);
cards.forEach((card, index)=>{
    //add order CSS property
    card.style.order= shuffledOrder[index];

    card.addEventListener('click', function(){
        flipCard(card);
    }) 
})
/*
if(cards.forEach(card=> card.classList.contains('matched'))){
    console.log(f)
    document.querySelector('#finished').play();
}*/