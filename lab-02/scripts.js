let clickCount = 0;

function incrementClickCount() {
  clickCount++;
  target.textContent = clickCount;
}



function greetMe() {
  console.log("Hello!!");
}


myTrigger.addEventListener('click', incrementClickCount);
