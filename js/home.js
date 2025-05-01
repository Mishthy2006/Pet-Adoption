document.addEventListener("DOMContentLoaded", () => {
    // Featured pets data
    const featuredPets = [
      {
        id: 1,
        name: "Max",
        type: "Dog",
        breed: "Golden Retriever",
        age: 3,
        image: "https://goldenhearts.co/wp-content/uploads/2020/04/golden-retriever-164221_1280-1024x998.jpg",
        description: "Friendly and energetic, loves to play fetch.",
      },
      {
        id: 2,
        name: "Bella",
        type: "Dog",
        breed: "Labrador",
        age: 2,
        image: "https://i.pinimg.com/474x/68/7d/66/687d6692455c62665e9b0301d42b98d3.jpg",
        description: "Sweet and gentle, great with children.",
      },
      {
        id: 3,
        name: "Charlie",
        type: "Dog",
        breed: "Beagle",
        age: 4,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdJYHyQBlLD-5nCjUEjsTjzDCz46Qe9pZUZA&s",
        description: "Curious and playful, loves outdoor adventures.",
      },
      {
        id: 4,
        name: "Coco",
        type: "Cat",
        breed: "Persian Cat",
        age: 3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSwCVQVs1oGFtU3an838CH__vCxQgkcdMp2g&s",
        description: "Curious and playful, loves outdoor adventures.",
      },
    ]
  
    // Render featured pets
    const featuredPetsGrid = document.getElementById("featured-pets-grid")
  
    if (featuredPetsGrid) {
      featuredPets.forEach((pet) => {
        const petCard = createPetCard(pet)
        featuredPetsGrid.appendChild(petCard)
      })
    }
  
    // Helper function to create pet card
    function createPetCard(pet) {
      const card = document.createElement("div")
      card.className = "pet-card"
  
      card.innerHTML = `
        <div class="pet-card-image">
          <img src="${pet.image}" alt="${pet.name}, a ${pet.breed} ${pet.type}">
        </div>
        <div class="pet-card-content">
          <div class="pet-card-header">
            <h3 class="pet-card-title">${pet.name}</h3>
            <span class="pet-badge">${pet.type}</span>
          </div>
          <p class="pet-card-subtitle">${pet.breed} • ${pet.age} ${pet.age === 1 ? "year" : "years"} old</p>
          <p class="pet-card-description">${pet.description}</p>
          <div class="pet-card-footer">
            <a href="pet-details.html?id=${pet.id}" class="btn btn-primary btn-full">Meet ${pet.name}</a>
          </div>
        </div>
      `
  
      return card
    }
  })

  document.addEventListener("DOMContentLoaded", () => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.body.classList.remove("light-theme")
      document.body.classList.add("dark-theme")
    }
  
    // Theme toggle functionality
    const themeToggles = document.querySelectorAll("#theme-toggle, #theme-toggle-mobile")
  
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        if (document.body.classList.contains("light-theme")) {
          document.body.classList.remove("light-theme")
          document.body.classList.add("dark-theme")
          localStorage.setItem("theme", "dark")
        } else {
          document.body.classList.remove("dark-theme")
          document.body.classList.add("light-theme")
          localStorage.setItem("theme", "light")
        }
      })
    })
  })
  
  