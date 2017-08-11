console.log('main.js works');

var input = document.getElementById("input-text-element");
var container = document.getElementById("container");
var cardsArray = [];
var card ;


// Get People Array from JSON File
let dataRequest = new XMLHttpRequest();

dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);

function dataRequestComplete(event) {
  console.log('json file loaded');
  let peopleData = JSON.parse(event.target.responseText);
  showPeople(peopleData);
}

function dataRequestFailed(event) {
  console.log('json data failed', event);
}

dataRequest.open("GET", "people-array.json");
dataRequest.send();

/*****************************************************************/
// Construct Inner Html of Array of Objects
function buildPeople(people){
  people.forEach(function(item){
    
    card = document.createElement("article");
    card.classList.add("cardClass");
    card.innerHTML= `
      <h2>${item.name}</h2>
      <p>${item.bio}</p>
      <h4>birth: ${item.lifespan.birth} death: ${item.lifespan.death}</h4>
      `;
    cardsArray.push(card);
  });
  // Add Background Color
  for (var i = 0; i < cardsArray.length; i++) {
    if((i+1) % 2 === 0){
      cardsArray[i].classList.add("lightblue");
    } else {
      cardsArray[i].classList.add("lightyellow");
    }
  }
  return cardsArray;
}
/*****************************************************************/
// Load Array to the DOM
function showPeople(people) {
  var peopleCards = buildPeople(people.PeopleObject);
 
  peopleCards.forEach(function(peopleCard){
    container.appendChild(peopleCard);
  });
}
/*************************************************************/

// Select Element add border when Card is clicked and focus on text input
container.addEventListener("click", function(e){  
  //remove class "border-target" on all elements
  for (var k = 0; k < e.currentTarget.children.length; k++) {
    e.currentTarget.children[k].classList.remove("border-target")
  }

  var targetElement = e.target.closest('.cardClass');
  targetElement.classList.add("border-target");
  
  input.value = '';
  input.focus();
});

input.addEventListener("keyup",(A)=>{
  
  var bioArray = Array.from(document.querySelectorAll("P"))
    bioArray.forEach(function(item){
    // adds text to p tag from input
      if(item.closest('.border-target')){
        item.innerHTML = input.value;
      }
    });  
  if (A.which == 13){
    input.blur();
    input.value = '';
  }
});