const letters = [
    {
        id: 1,
        content: 'A',
        flipped: false
    },
    {
        id: 2,
        content: 'A',
        flipped: false

    },
    {
        id: 3,
        content: 'B',
        flipped: false

    },
    {
        id: 4,
        content: 'B',
        flipped: false

    },
    {
        id: 5,
        content: 'C',
        flipped: false

    },
    {
        id: 6,
        content: 'C',
        flipped: false

    },
    {
        id: 7,
        content: 'D',
        flipped: false

    },
    {
        id: 8,
        content: 'D',
        flipped: false

    },
    {
        id: 9,
        content: 'H',
        flipped: false

    },
    {
        id: 10,
        content: 'H',
        flipped: false

    },
    {
        id: 11,
        content: 'I',
        flipped: false

    },
     {
        id: 12,
        content: 'I',
        flipped: false

    }
];

let numbers = [
    {
        id: 1,
        content: '1',
        flipped: false

    },
    {
        id: 2,
        content: '1',
        flipped: false

    },
    {
        id: 3,
        content: '2',
        flipped: false

    },
    {
        id: 4,
        content: '2',
        flipped: false

    },
    {
        id: 5,
        content: '3',
        flipped: false

    },
    {
        id: 6,
        content: '3',
        flipped: false

    },
    {
        id: 7,
        content: '4',
        flipped: false

    },
    {
        id: 8,
        content: '4',
        flipped: false

    },
    {
        id: 9,
        content: '5',
        flipped: false

    },
    {
        id: 10,
        content: '5',
        flipped: false

    },
    {
        id: 11,
        content: '6',
        flipped: false

    },
     {
        id: 12,
        content: '6',
        flipped: false

    }
];
let chars = [
    {
        id: 1,
        content: '!',
        flipped: false

    },
    {
        id: 2,
        content: '!',
        flipped: false

    },
    {
        id: 3,
        content: '@',
        flipped: false

    },
    {
        id: 4,
        content: '@',
        flipped: false

    },
    {
        id: 5,
        content: '#',
        flipped: false

    },
    {
        id: 6,
        content: '#',
        flipped: false

    },
    {
        id: 7,
        content: '$',
        flipped: false

    },
    {
        id: 8,
        content: '$',
        flipped: false

    },
    {
        id: 9,
        content: '&',
        flipped: false

    },
    {
        id: 10,
        content: '&',
        flipped: false

    },
    {
        id: 11,
        content: '*',
        flipped: false

    },
     {
        id: 12,
        content: '*',
        flipped: false

    }
];
let t;
let matchedCards = [];
const players_arr = [];
let flippedCards = [];
let buttons=document.querySelectorAll(".button_type2");
// for(let i=0;i<buttons.length;i++)
// { 
//     i.style.fontSize=20px; 
// }
//שליפת ה JSON לתוך מערך
let str2 = localStorage.getItem("players_arr");
let arr_json = JSON.parse(str2);
    for (let i = 0; i < arr_json.length; i++)
        players_arr.push(arr_json[i]);


// let jsonNumbers = JSON.stringify(numbers);
document.querySelector("#enter").onclick=function(e) {
e.preventDefault();//שלא ישלח ישר אלא קודם יעשה את כל הפונוקציה ואז אני ישנה את htef
    let names = document.querySelector("#tt").value;
   let family1 = document.querySelector("#family").value;
  let flag=false
for (i of players_arr)
{
    if(names==i.name&&family1==i.family)
      { flag=true;
       alert("You are already here! ")
       location.href="html/game.html"
      }

}
if(flag==false)
{
    players_arr.push({name:names,family:family1})
    let str= JSON.stringify(players_arr);
    localStorage.setItem("players_arr", str);
    location.href="html/game.html"
}
let selectedArray=[];

    
}



// document.querySelector("#button_letters").mouseover=function(){
//    let n= this.nextElementSibiling;
//    n.style.backgraoundColor=white;
// }

//פונקציה שבוחרת איזה סוג של משחק אתה רוצה 
function chooseType(button){
let id_type=button.id;
    switch (id_type) {
        case"button_chars":
          {
            selectedArray = chars.slice();//שומר את המערך כולו ולא רק ה ID
          }
          break;
        case "button_letters":
          {
            selectedArray =letters.slice();
          }
          break;
        case "button_numbers":
          {
            selectedArray = numbers.slice();
          }
          break;
        default:
          selectedArray = [];
          break;
      }
    //   alert("23456y77654");
    //   console.log(selectedArray);
      createGameBoard(selectedArray);
      let elemntB=document.getElementById("buttons_types");//מסיר את הכפותרי הבחירה 
      elemntB.style.display='none';

      Timer();

}





//ליצור את לוח המשחק 
function createGameBoard(selectedArray) {
    document.querySelector("#buttons_types")
    const gameBoard = document.querySelector('#cards_container');

    // alert(selectedArray[0].content);
    shuffleCards(selectedArray);    
  
    selectedArray.forEach((card) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
     // alert(selectedArray[0].content)
      cardEl.addEventListener('click', () => flipCard(card));//ברגע שאתה לוחץ הוא משתנה 
      card.element = cardEl;
      gameBoard.appendChild(cardEl);
    });
 }

 //בודק האם הם זוג 
 function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.content === card2.content) {///בודקת שהתוכן שווה 
      matchedCards.push(card1, card2);
      flippedCards = [];
  
      if (matchedCards.length === selectedArray.length) {
        win();
      }
    } else {
       
     setTimeout(function(){ 
          card1.flipped = false;
      card2.flipped = false;
      card1.element.textContent = '';
      card2.element.textContent = '';

     },750)
   
      flippedCards = [];
    }
  }


//פונקציה שמערבבת את המערך עפ"י מיקום
 function shuffleCards(array) {//מערבב את מיקום הכרטיסים ומעתיק למערך חדש
    let currentIndex = array.length;
  
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
//   alert(array[0].id);
    return array;
  }
//פונקציה שעושה הפיכה לקלף
  function flipCard(card) {
    if (card.flipped || matchedCards.includes(card)) {//בדיקה האם הקלף הנוכחי הפוך או אמת 
      return;
    }
  
    card.flipped = true;
    flippedCards.push(card);
    card.element.textContent = card.content;
  
    if (flippedCards.length === 2) {
      setTimeout(checkMatch(), 1000);
    }
  }
  function fail(t){
    clearInterval(t);
        let elemntF=document.getElementById("cards_container");//מסיר את כרטיסי הבחירה 
    elemntF.style.display='none';
    let imgF=document.querySelector("#gameOverImg");
    imgF.style.display='block';


  }
  function win(t){
    clearInterval(t);
    let elemntF=document.getElementById("cards_container");//מסיר את כרטיסי הבחירה 
    elemntF.style.display='none';
    let imgF=document.querySelector("#winImg");
    imgF.style.display='block';

  }
//כתובת חזרה לדף הבית 
function backHome(){
    let backHome=document.querySelector("#back");
// Add event listener for button click
backHome.addEventListener("click", function() {
    // Redirect to another page
    history.back();
});
}
//טיימר 
    
    function Timer() {
let t;
    let second = 1;
    let minutes = 1;
    let flag = 0;
        t = setInterval(function () {
            //if (minutes < 1 && second <= 10) {
           //     new Audio('audio/apert.mp3').play();
           // }
            if (second == 0) {
                if (flag == 1) {
                    second = 59;
                    minutes--;
                    flag = 0;
                }
                else {
                    flag = 1;
                    second = 0;
                }
            }
            if (second <= 9) {
    
                if (second > 0)
                    second--;
                document.querySelector("#clock").innerHTML = minutes + ":0" + second;
            }
            else {
                document.querySelector("#clock").innerHTML = minutes + ":" + second;
                if (second > 0)
                    second--;
                    
                    
              
            }
            if (minutes == 0 && second == 0) 
                fail(t);
        
        }, 1000);
    }
