let allRecipes = [];

fetch("recipes.json")
  .then(res => res.json())
  .then(data => {
    allRecipes = data;

    generateFilterOptions();
    renderRecipes(allRecipes);
  });

// Generate unique options for each filter
function generateFilterOptions() {
  const proteins = [...new Set(allRecipes.map(r => r.protein))].sort();
  const meals = [...new Set(allRecipes.map(r => r.meal))].sort();
  const cuisines = [...new Set(allRecipes.map(r => r.cuisine))].sort();

  populateSelect("proteinFilter", proteins, "Any Protein");
  populateSelect("mealFilter", meals, "Any Meal");
  populateSelect("cuisineFilter", cuisines, "Any Cuisine");
}

// Helper to populate a select element
function populateSelect(id, values, defaultText) {
  const select = document.getElementById(id);
  select.innerHTML = `<option value="">${defaultText}</option>` +
    values.map(v => `<option value="${v}">${v}</option>`).join("");

  select.addEventListener("change", applyFilters);
}

function applyFilters() {
  const protein = document.getElementById("proteinFilter").value.toLowerCase();
  const meal = document.getElementById("mealFilter").value.toLowerCase();
  const cuisine = document.getElementById("cuisineFilter").value.toLowerCase();
  const carb = document.getElementById("carbFilter").value.toLowerCase();

  const filtered = allRecipes.filter(r =>
    (protein === "" || r.protein.toLowerCase() === protein) &&
    (meal === "" || r.meal.toLowerCase() === meal) &&
    (cuisine === "" || r.cuisine.toLowerCase() === cuisine) &&
    (carb === "" || (r.carb && r.carb.toLowerCase() === carb))
  );

  renderRecipes(filtered);
}


function renderRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  recipes.forEach(r => {
    const div = document.createElement("div");
    div.className = "recipe-card";

    div.innerHTML = `
  <a href="recipe.html?id=${r.id}">
    <img src="${r.image}" alt="${r.title}">
    <h3>${r.title}</h3>
  </a>
  <p>${r.description}</p>
  <small>${r.cuisine} • ${r.protein} • ${r.meal}</small>
`;


    container.appendChild(div);
  });
}

