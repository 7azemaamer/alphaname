function fetchNames() {
  const generateButton = document.querySelector("button")
  const inputField = document.getElementById("inputField")

  generateButton.disabled = true
  generateButton.classList.add("opacity-10")
  generateButton.textContent = "Loading..."
  generateButton.disabled = true
  // Fetch names
  fetch("http://localhost:3000/generate-name", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyword: inputField.value }),
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      updateNameGrid(data.suggestion)
      setTimeout(() => {
        generateButton.disabled = false
        generateButton.classList.remove("opacity-50")
        generateButton.textContent = "Generate"
      }, 30000)
    })
    .catch((error) => {
      console.error("Error:", error)
      generateButton.disabled = false
      generateButton.classList.remove("opacity-50")
      generateButton.textContent = "Generate"
    })
}
// add brand names to the site
function updateNameGrid(brandNames) {
  const grid = document.getElementById("nameGrid")
  grid.innerHTML = ""
  const words = brandNames.split("\n").map((line) => {
    const cleanedWords = line.replace(/^\d+\.\s*/, "").split(" ")
    const cleanedLine = cleanedWords
      .map((word) => word.replace(/[-,]/g, ""))
      .join(" ")
    return cleanedLine
  })

  words.forEach((name, index) => {
    const randomColor = getRandomColor()
    grid.innerHTML += `
    <div class="p-6 m-2 max-w-sm bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div class="shrink-0">
        <div class="circle w-10 h-10 rounded-full" style="background-color:${randomColor};"></div>
      </div>
      <div>
        <div class="whereText text-xl font-medium text-black">${name}</div>
      </div>
    </div>
  `
  })
}
// generate random color
function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
// contact switch
document.addEventListener("DOMContentLoaded", function () {
  const switchButton = document.querySelector('[role="switch"]')

  switchButton.addEventListener("click", function () {
    const isOn = switchButton.getAttribute("aria-checked") === "true"
    switchButton.setAttribute("aria-checked", String(!isOn))

    const switchKnob = switchButton.querySelector('span[aria-hidden="true"]')
    if (isOn) {
      switchKnob.classList.replace("w-4", "w-8")
    } else {
      switchKnob.classList.replace("w-8", "w-4")
    }
  })
})

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobileMenuButton")
  const mobileMenu = document.getElementById("mobileMenu")

  mobileMenuButton.addEventListener("click", function () {
    // Toggle between showing and hiding the mobile menu
    mobileMenu.classList.toggle("hidden")
  })
})
