const totalCards = 16;//cantidad de cartas deseadas
let cards = [];
let selectedCards= [];
let valuesUsed = [];
let currentMove = 0;
let puntuacion = 0;
let maxpuntuacion = 0;
let remainingAttempts = 10;
let cantidadpares = 8;
let bonus = 0;


let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';
function checkbonus(){

    if(bonus > 1){
        puntuacion += 200;
        document.querySelector('#stats').innerHTML = puntuacion + ' Puntuacion';
    }else {
        document.querySelector('#bonus').innerHTML = '';
    }
}
function checkEndGame(){
    if(remainingAttempts == 0 ){
        maxpuntuacion = puntuacion;
        savehighscore(maxpuntuacion);
        // Guarda la puntuación en el almacenamiento local
        localStorage.setItem('puntuacion', maxpuntuacion);
        // Redirige a la página de "game over"
        window.location.href = "gameover.html";
        
    }
}

function checkwin(){
    if(cantidadpares == 0 ){
        maxpuntuacion = puntuacion
        savehighscore(maxpuntuacion);
        // Guarda la puntuación en el almacenamiento local
        localStorage.setItem('puntuacion', maxpuntuacion);
        // Redirige a la página de "pantalla final"
        window.location.href = "finalscream.html";
        
    }
}

let imagePaths = [
    "img/carta1.png",
    "img/carta2.png",
    "img/carta3.png",
    "img/carta4.png",
    "img/carta5.png",
    "img/carta6.png",
    "img/carta7.png",
    "img/carta8.png",
    
    

];


function savehighscore(score){
    let record = JSON.parse(localStorage.getItem('record')) || [];
    record.push(score);
    record.sort((a,b)=> b - a);
    record = record.slice(0,10);
    localStorage.setItem('record',JSON.stringify(record));
}



    
function activate(e){
    

    

    if (currentMove < 2){
        
        if((!selectedCards[0] || selectedCards[0] !== e.target) && !e.target.classList.contains('active')) {
            e.target.classList.add('active');
            selectedCards.push(e.target);   
            if(++currentMove==2){
        
            if (selectedCards[0].querySelectorAll('.face')[0].innerHTML ==selectedCards[1].querySelectorAll('.face')[0].innerHTML){
                cantidadpares--;
                puntuacion+=100;
                bonus++;
                document.querySelector('#stats').innerHTML = puntuacion + ' Puntuacion';
                document.querySelector('#bonus').innerHTML = '!BONUS! + 200';
                selectedCards = [];
                currentMove = 0;
                


            }
            else{
                bonus = 0;
                setTimeout(() => {
                    
                    remainingAttempts--;
                    document.querySelector('#remaining').innerHTML = remainingAttempts + ' intentos restantes';
                    selectedCards[0].classList.remove('active');
                    selectedCards[1].classList.remove('active');
                    selectedCards = [];
                    currentMove = 0;
                   
                }, 400);
            }
            checkbonus();
        } checkEndGame();
        checkwin();
        
    }
}}

function randomValue(){//hace numeros randoms y los distribuye en las cartas y usa el mismo numero solo 2 veces
    let rnd = Math.floor(Math.random() * totalCards /2);
    let values = valuesUsed.filter(value => value === rnd);
    if (values.length < 2){
        valuesUsed.push(rnd);
    }
    else{
        randomValue();
    }
    return rnd; 
}


for(let i=0; i<totalCards; i++){
    let div = document.createElement('div');
    div.innerHTML = cardTemplate;
    cards.push(div);
    document.querySelector('#game').append(cards[i]);
    randomValue();
    cards[i].querySelectorAll('.face')[0].innerHTML = `<img src="${imagePaths[valuesUsed[i]]}" alt="Card Image">`;
    cards[i].querySelectorAll('.card')[0].addEventListener('click', activate);
    
   
}





