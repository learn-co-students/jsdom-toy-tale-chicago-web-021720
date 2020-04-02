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
  getToys()
  addNewToy()
});


function getToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach(toy => {
        renderToy(toy)
      })
    })
}

function renderToy(toy) {
  let toyCollection = document.querySelector("#toy-collection")
  let div = document.createElement("div")
  div.className = "card"
  let hAndImg = `<h2>${toy.name}</h2><img src="${toy.image}" class="toy-avatar">`
  let p
  if (toy.likes == 1) {
    p = `<p id="like-${toy.id}">1 like</p>`
  } else {
    p = `<p id="like-${toy.id}">${toy.likes} likes</p>`
  }
  div.innerHTML = hAndImg + p
  let button = document.createElement("button")
  button.className = "like-btn"
  button.innerHTML = "Like <3"
  button.addEventListener("click", event => {
    likeListener(toy)
    })
  div.appendChild(button)
  toyCollection.appendChild(div)
}

function likeListener(toy) {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      let reToy = toys.find(element => element.id == toy.id)
      let newLikes = parseInt(reToy.likes) + 1
      let likeObj = {"likes": newLikes}
      let config = {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(likeObj)
      }
      fetch(`http://localhost:3000/toys/${reToy.id}`, config)
      .then(resp => resp.json())
      .then(updatedToy => {
        let pLike = document.querySelector(`p#like-${updatedToy.id}`)
        if (updatedToy.likes == 1) {
          pLike.innerHTML = "1 like"
        } else {
          pLike.innerHTML = `${updatedToy.likes} likes`
        }
      })
    })
}

function addNewToy() {
  let form = document.querySelector("form")
  form.addEventListener("submit", function(event) {
    event.preventDefault()
    let toyObj = {"name": event.target["name"].value, "image": event.target["image"].value}
    let config = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(toyObj)
    }
    fetch("http://localhost:3000/toys", config)
      .then(resp => resp.json())
      .then(toy => {
        renderToy(toy)
      })
      .catch(error => {
        alert(error)
      })
  })
}