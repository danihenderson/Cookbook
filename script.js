let allRecipes = [];

fetch("recipes.json")
  .then(res => res.json())
  .then(data => {
    allRecipes = data;
    renderRecipes(allRecipes);
  });

// Apply filters when dropdowns change
document.getElementById("proteinFilter").addEventListener("change", applyFilters);
document.getElementById("cuisineFilter").addEventListener("change", applyFilters);
document.getElementById("mealFilter").addEventListener("change", applyFilters);
document.getElementById("carbFilter").addEventListener("change", applyFilters);

function applyFilters() {
  const protein = document.getElementById("proteinFilter").value.trim().toLowerCase();
  const meal = document.getElementById("mealFilter").value.trim().toLowerCase();
  const cuisine = document.getElementById("cuisineFilter").value.trim().toLowerCase();
  const carb = document.getElementById("carbFilter").value.trim().toLowerCase();

  const filtered = allRecipes.filter(r => {
    const p = r.protein ? r.protein.trim().toLowerCase() : "";
    const m = r.meal ? r.meal.trim().toLowerCase() : "";
    const c = r.cuisine ? r.cuisine.trim().toLowerCase() : "";
    const cb = r.carb ? r.carb.trim().toLowerCase() : "";

    return (protein === "" || p === protein) &&
           (meal === "" || m === meal) &&
           (cuisine === "" || c === cuisine) &&
           (carb === "" || cb === carb);
  });

  renderRecipes(filtered);
}


function renderRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  recipes.forEach(r => {
    const div = document.createElement("div");
    div.className = "recipe-card";

    // Optional total time line
    let timeHTML = "";
    if (r.totalTime) {
      timeHTML = `<p class="recipe-time">⏱ ${r.totalTime}</p>`;
    }

    div.innerHTML = `
      <a href="recipe.html?id=${r.id}">
        <div class="image-wrapper">
          <img src="${r.image}" alt="${r.title}">
        </div>
        <h3>${r.title}</h3>
      </a>
      <p>${r.description}</p>
      ${timeHTML}
    `;

    container.appendChild(div);
  });
}



