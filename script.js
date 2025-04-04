const box1 = document.getElementById("1");
 const box2 = document.getElementById("2");
 const box3 = document.getElementById("3");
 const box4 = document.getElementById("4");
 const box5 = document.getElementById("5");
 const box6 = document.getElementById("6");
 const box7 = document.getElementById("7");
 const box8 = document.getElementById("8");
 const box9 = document.getElementById("9");
 const player1 = document.getElementById("player-1");
 const player2 = document.getElementById("player-2");
 const player1 = document.getElementById("player1");
 const player2 = document.getElementById("player2");
 const mainPage = document.getElementById("mainPage");
 const loginForm = document.getElementById("login-form");
 const subBtn = document.getElementById("submit");
 const message = document.getElementById("message");
 const boxes = document.querySelectorAll(".box");
 let user1,user2;
 subBtn.onclick = () => {
   if (player1.value == "" || player2.value == "") {
     alert("Input Field must contain value");
     return;
   }
   loginForm.style.display = "none";
   mainPage.style.display = "block";
   user1 = player1.value;
   user2 = player2.value;
 	message.textContent = `${user1}, you're up`
 };
 
 const winnerPatterns = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [2,4,6],
     [0,4,8]
 ]
 function checkWinner(item){
     for(let pattern of winnerPatterns){
         let val1= pattern[0], val2=pattern[1], val3 = pattern[2];
         if(boxes[val1].textContent && boxes[val1].textContent == boxes[val2].textContent && boxes[val2].textContent == boxes[val3].textContent){
             boxes[val1].style.backgroundColor="violet"
 			boxes[val2].style.backgroundColor="violet"
 			boxes[val3].style.backgroundColor="violet"
 			return true
         }   
     }
     return false
 }
 let isTurn0 = false;
 let presentUser= user1;
 let gameOver = false
 boxes.forEach((item, index) => {
    item.addEventListener(
     "click",
     function () {
     if (gameOver || item.textContent !== "") return; 
       if (!isTurn0) {
         presentUser = user2;
         message.textContent = `${presentUser}, you're up`
         item.textContent = "x";
         isTurn0 = true;
         let isWinner = checkWinner(item)
         if(isWinner){
 			presentUser = user1
             message.textContent = `${presentUser} congratulations you won!`
             gameOver = true
         }
 
 
       } else {
         presentUser = user1;
         message.textContent = `${presentUser}, you're up`
         item.textContent = "o";
         isTurn0 = false;
         let isWinner = checkWinner(item)
         if(isWinner){
 			presentUser = user2
             message.textContent = `${presentUser} congratulations you won!`
             gameOver = true
         }
       }
     }
   );
 });