let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
});



//function for big wet ass
function bigWetAss(){
  console.log('big wet ass');
}

bigWetAss();

//display toys from db in index
fetch("http://localhost:3000/toys")
.then(function(response) {
  return response.json();
})
.then(function(toys) {
    addToysToIndex(toys);
})

function addToysToIndex(toysObject) { 
  toysObject.forEach(toy => {
    rednerToy(toy);
  });
};

function rednerToy(toy) {
  const toyDiv = document.getElementById('toy-collection')
  const toyCard = `<div class="card"><h2>${toy.name}</h2><img src= ${toy.image} class="toy-avatar" /><p> ${toy.likes} </p><button class="like-btn">Like <3</button></div>`;
  toyDiv.innerHTML += toyCard
}



// add new toy to BE and then render it  

function addListenersToFormAndDOM(){
  document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementsByTagName('FORM')
    form[0].addEventListener('submit', handleSubmit)
  });
}

function handleSubmit(){
  event.preventDefault();
  const inputs = document.querySelectorAll('.input-text')
  submitToyToBE(inputs[0].value, inputs[1].value)
  event.target.reset()
}

function submitToyToBE(toyName, imageUrl, toyLikes = 0) {
  let formData = {
      name: toyName,
      image: imageUrl,
      likes: toyLikes
  };
     
  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
  };
  
  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
    rednerToy(toy)
  })
  .catch(function(error) {
    alert("what up, check the console");
    console.log(error.message)
  });

};

addListenersToFormAndDOM();

// increase the likes in the BE upon click


function updateLikeInBE(toyId, toyLikes) {
  let formData = {
      likes: toyLikes
  };
     
  let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
  };
  
  return fetch(`http://localhost:3000/toys/${toyId}`, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
    console.log(toy)
  })
  .catch(function(error) {
    alert("what up, check the console");
    console.log(error.message)
  });

};

function addListenerToLikeButton(){ 
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('click', handleButtonClick)
  });

};

function handleButtonClick(){
  if (event.target.className == "like-btn"){
    //update likes w/o reload
    let toyLikes = event.target.parentNode.getElementsByTagName('p')[0]
    let currentLikes = toyLikes.textContent 
    let newLikes = parseInt(currentLikes) + 1 
    toyLikes.innerHTML = newLikes

    //update BE
    let allButtons = document.querySelectorAll('button')
    let counter = 0
    let toyId = 0
    allButtons.forEach(button => {
      if (button == event.target){
        toyId = counter
      }
      counter += 1
    })
    updateLikeInBE(toyId, newLikes) 
  }
};

addListenerToLikeButton()

