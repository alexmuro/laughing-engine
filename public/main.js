
if (typeof document !== 'undefined') {
// let trash = document.getElementsByClassName("fa-xmark");
// let addButton = document.getElementsByClassName("fa-solid fa-plus");


document.querySelector('#results').addEventListener('click', makeReq)


function makeReq(){
  let muscle = document.querySelector('#muscle')
  let difficulty = document.querySelector('#difficulty')
  let input;
  let level;

  input = muscle.value
  level = difficulty.value

  // input = document.querySelector('input').value
  console.log(input)

  fetch( `https://api.api-ninjas.com/v1/exercises?muscle=${input}&difficulty=${level}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', 
      'X-Api-Key': 'MF7R9IFuQpscCaKMuvuXesDRgdeZpUZ7Cf8G4QkI'
    } 
  })
    .then(request => request.json())
		.then(response => {
      console.log(response)

      if (input === 'chest') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/chest.png'
      }
      else if (input === 'hamstrings') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/ham.png'
      }
      else if (input === 'quadrieps') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/quads.png'
      }
      else if (input === 'lats') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/upper.png'
      }
      else if (input === 'lower_back') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/lower.png'
      }
      else if (input === 'middle_back') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/upper.png'
      }
      else if (input === 'neck') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/upper.png'
      }
      else if (input === 'traps') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/upper.png'
      }
      else if (input === 'triceps') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/triceps.png'
      }
      else if (input === 'glutes') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/glutes.png'
      }
      else if (input === 'forearms') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/forearm.png'
      }
      else if (input === 'calves') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/calf.png'
      }
      else if (input === 'abductors') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/glutes.png'
      }
      else if (input === 'adductors') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/glutes.png'
      }
      else if (input === 'abdominals') {
        document.querySelector('img').setAttribute("style", "margin-top: 20%;margin-left: 80px;width: 88%;height: 100%;")
        document.querySelector('img').src = 'imgs/abs.png'
      } else { return }



      for (let exercise = 0; exercise < response.length; exercise++) {
        let workout = response[exercise].name
    
        let information = `${workout}`
        console.log(`${information}`)
   
        let ul = document.getElementById('workoutInfo')
        let li = document.createElement('li')
        li.setAttribute("style", "list-style: none; width: 85%; font-size: 1.3em; border: 1px solid lightgray; padding: 5px; margin: 10px; text-align: left;")


        let icon = document.createElement("i")
        icon.dataset.exercise = information
        icon.setAttribute("class", "fa-solid fa-plus")

        const textNode = document.createTextNode(information)
        li.appendChild(textNode)
        ul.appendChild(li)
        li.appendChild(icon)

        icon.addEventListener("click", addToFav)
      }


      
      
    })
		.catch(err => console.error(err))
}



function addToFav(){
  // let favorite = this.parentNode.childNodes[2].innerText
  let favorite = this.dataset.exercise
  console.log (favorite)

  fetch('favorites', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'favorite' : favorite,
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data => {
    console.log(data)
    window.location.reload(true)
  })
}


Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[0].innerText
    console.log(name)
    fetch('delete', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'favorite': name
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});








        // imgUrl = `https://api.unsplash.com/search/photos?client_id=6WQtUr_3dLP9Q2-fajgnELQPl33QYq-JsympkkF7gwo&page=1&query=${workout}&per_page=1&order_by=relevant`
          
        // fetch(imgUrl)
        // .then(res => res.json())
        // .then(image => {
        //     console.log(image)

        //     let img = document.createElement('img')
        //     img.setAttribute("src", `${image.results[0].urls.raw}`)
        // })


}