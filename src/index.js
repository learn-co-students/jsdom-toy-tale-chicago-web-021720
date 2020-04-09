const addBtn = document.querySelector('#new-toy-btn')
const toyContainer = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.container')
let addToy = false

function toggleForm(){
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    toyForm.style.display = addToy ? 'block' : 'none';
  })
}

function fetchToys(){
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      toys.forEach()
    })
}

function createFormListener() {
  const form = document.querySelector('form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    const formData = {
      name: event.target[0].value,
      image: event.target[1].value,
      likes: 0
    }
    form.reset()

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/toys', reqObj)
      .then(resp => resp.json())
      .then(renderToy)
  })
}

function renderToy(toyObj) {
    const toyCard = `<div class="card"><h2>${toyObj.name}</h2><img src=${toyObj.image} class="toy-avatar" /><p>${toyObj.likes} Likes </p><button data-id=${toyObj.id} class="like-btn" style="width:30px;height:30px;cursor:pointer;"> ♥ </button></div>`
    toyContainer.innerHTML += toyCard
}

function createLikeListener(){
  toyContainer.addEventListener('click', event => {
    if (event.target.className === 'like-btn') {
      const likes = event.target.previousSibling.innerText.split(' ')[0]
      const id = event.target.dataset.id

      const reqObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: parseInt(likes) + 1})
      }

      fetch(`http://localhost:3000/toys/${id}`, reqObj)
      .then(resp => resp.json())
      .then(toyObj => {
        event.target.previousSibling.innerText = `${toyObj.likes} Likes`
      })
    }
  })

}



function main() {
  toggleForm()
  fetchToys()
  createFormListener()
  createLikeListener()
}

main()
