let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", (event) => {
    // hide & seek with the form
    event.preventDefault()
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', function(event){
    let textData = toyForm.querySelector("input[name=name]")
    let imgData = toyForm.querySelector("input[name=image]")
    console.log(textData)
      
    let formData = {
      name: `${textData.value}`,
      image: `${imgData.value}`,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      //console.log(object["likes"]);
      showToys();
    });
  });
   
  function showToys() {
    fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      for (key in object) {
        //console.log(object[key])
        let card = document.createElement("div.card");
        let div = document.querySelector("#toy-collection");
        card.innerHTML = `<h2>${object[key]["name"]}</h2> 
        <img src=${object[key]["image"]} class="toy-avatar" />
        <p>${object[key]["likes"]} Likes </p>
        <button class="like-btn">Like <3</button>`;
        
        //testing the ids
        console.log(object[key]["id"])
        // let numLikes = parseInt(object[key]["likes"])
        let origLikes = parseInt(object[key]["likes"]);
        let addedLikes = 0;
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(
            {"likes": `${origLikes + addedLikes + 1}`}
          )
          
        };
        
        // ${object[key]["id"]
        
        let likeButton = card.querySelector("button.like-btn");
        let objId = object[key]["id"];
        let showLikes = card.querySelector("p")

        likeButton.addEventListener("click", function(){
          // console.log(objId)
          fetch(`http://localhost:3000/toys/${objId}`, configObj)
          .then(function(response) {
            //console.log(response.json())
            return response.json();
          })
          .then(function(obj) {
            addedLikes += 1
            console.log(obj)
            //console.log(obj["likes"]);
            // console.log(addedLikes)
            let numLikes = obj["likes"];
            // console.log(numLikes);
            //console.log(object[key]["id"])
            // showToys();
            // location.reload();
            showLikes.innerHTML =  `${numLikes} Likes`;
          });
        });

        div.append(card)
      } 
    });
  };
  showToys();



});
