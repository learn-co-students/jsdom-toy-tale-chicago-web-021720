// --- BOILERPLATE ---

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


// --- DISPLAYING TOYS ---

document.addEventListener('DOMContentLoaded', displayToys)

function displayToys() {
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(makeToyCards)
    .catch(err => console.log('CAUGHT ERROR:', err.message));
}

function makeToyCards(toys) {
  const toyCollection = document.querySelector("#toy-collection");

  toys.forEach(toy => {
    const div = document.createElement('div');
    div.class = 'card';
    div.dataset.id = toy.id
    div.innerHTML = `<h2>${toy.name}</h2>
                     <img src="${toy.image}" class="toy-avatar" />
                     <p>${toy.likes} Likes</p>
                     <button class="like-btn">Like <3</button>`;
    toyCollection.appendChild(div);
  });
}


// --- CREATING TOYS ---

document.addEventListener('DOMContentLoaded', formListener)

function formListener() {
  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
  // Prevent the form from making a post request itself
  event.preventDefault();
  
  // Get the form data
  // `event.target` is the <form>. Get the data from both relevant form nodes.
  const name = event.target.querySelector('input[name=name]').value;
  const image = event.target.querySelector('input[name=image]').value;

  // Build a post request with the data to the backend
  postReq = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  }

  // Make the post request. If it was successful, display the toy on the DOM.
  fetch('http://localhost:3000/toys', postReq)
    .then(resp => resp.json())
    .then(toy => makeToyCards([toy]))
    .catch(err => console.log('POST REQUEST ERROR:', err.message));
}


// --- LIKING ---

document.addEventListener('DOMContentLoaded', toyCollectionClickListener)

function toyCollectionClickListener() {
  const toyCollection = document.querySelector("#toy-collection");
  toyCollection.addEventListener('click', handleToyCollectionClick);
}

function handleToyCollectionClick(event) {
  if (event.target.matches('button.like-btn')) {
    
    // `event.target` is the like <button>. Get the parent <div data-id="{id}"> node.
    // Update the DOM with the new number of likes
    const toyDiv = event.target.parentNode; 
    const toyLikesPTag = toyDiv.querySelector('p');
    let toyLikes = parseToyLikes(toyLikesPTag);
    toyLikes += 1;
    toyLikesPTag.textContent = `${toyLikes} Likes`;

    // Make a patch request sent to the server at http://localhost:3000/toys/:id updating the number of likes that the specific toy has
    patchReq = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        likes: toyLikes
      })
    }

    fetch(`http://localhost:3000/toys/${toyDiv.dataset.id}`, patchReq)
      .catch(err => console.log(err.message));
  }
}

function parseToyLikes(pTag) {
  return parseInt(pTag.textContent.split(' ')[0], 10)
}
