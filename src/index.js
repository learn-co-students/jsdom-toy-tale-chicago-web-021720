

document.addEventListener("DOMContentLoaded", () => {
  let addToy = false;
  const toyContainer = document.querySelector('#toy-collection');
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const toyURL = 'http://localhost:3000/toys';
  function getToys() {
    fetch(toyURL)
      .then(response => response.json())
      .then(toys => toys.forEach(toy => renderToy(toy)));
  }

  function renderToy(toy){
    toyContainer.innerHTML += `<div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id="${toy.id}">${toy.likes}</button>
  </div>`
  }

  function addNewToy(toy){
    toy = {
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    };
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(toy)
    };
    fetch(toyURL, configurationObject)
      .then(response => response.json())
      .then(newtoy => renderToy(newtoy));
  }
  getToys();


  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault();
        addNewToy(event.target)
      });
    } else {
      toyForm.style.display = "none";
    }
  });
  toyContainer.addEventListener('click',function(event){
    event.preventDefault();
    if(event.target.classList.value === 'like-btn') {
      configurationObject = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({"likes": parseInt(event.target.innerHTML) + 1})
      }
      console.log(`http://localhost:3000/toys/${event.target.dataset.id}`)
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`, configurationObject)
        .then(response => response.json())
        .then(toy => {
          let likes = parseInt(event.target.innerHTML) + 1;
          event.target.previousElementSibling.innerHTML = `${likes} Likes`;
          event.target.innerHTML = likes;
        });
    }
  });
  //make a GET request to http://localhost:3000/toys
  //make configuration object
  //make fetch request to proper address
  //Render toys to <div id="toy-collection"></div>


});
