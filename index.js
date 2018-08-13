const form = document.querySelector("#monster-form")
const formInputs = form.querySelectorAll("input")
const monsterContainer = document.querySelector("#monster-container")
const forwardButton = document.querySelector("#forward")
const backButton = document.querySelector("#back")
let page = 1

document.addEventListener("DOMContentLoaded", () =>{
  page = 1
  loadMonsters()
  forwardButton.addEventListener('click', nextPage)
  backButton.addEventListener('click', back)
  form.addEventListener('submit', create)
})

function loadMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(json => {
      monsterContainer.innerHTML = ""
      json.forEach(element => {render(element)})
    })
}

function render(element) {
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let h4 = document.createElement('h4')
  let p = document.createElement('p')
  h2.innerText = element.name
  h4.innerText = element.age
  p.innerText = `Bio: ${element.description}`
  div.appendChild(h2)
  div.appendChild(h4)
  div.appendChild(p)
  monsterContainer.appendChild(div)
}

function nextPage() {
  let lastMonsterId
  fetch(`http://localhost:3000/monsters`)
    .then(res => res.json())
    .then(json => {
      lastMonsterId = json.length
    })
  if (page > lastMonsterId/50) {
    alert("Ain't no monsters over there!")
  } else {
    page += 1
    loadMonsters()
  }
}

function back() {
  if (page === 1) {
    alert("Ain't no monsters over there!")
  } else {
    page -= 1
    loadMonsters()
  }
}

function create(event) {
  event.preventDefault()
  fetch('http://localhost:3000/monsters', {
    "method": "post",
    "body": JSON.stringify({
      "name": formInputs[0].value,
      "age": formInputs[1].value,
      "description": formInputs[2].value
    }),
    "headers": {"content-Type": "application/json"}
  })
  formInputs.pop()
  formInputs.forEach(inputEl => inputEl.value = "")
  loadMonsters()
}
