let allRecipes = [];

/* ----------------------
   Load recipes
----------------------- */
fetch("recipes.json")
  .then(res => res.json())
  .then(data => {
    allRecipes = data;
    renderRecipes(allRecipes);
  });

/* ----------------------
   Filter listeners
----------------------- */
document.getElementById("proteinFilter").addEventListener("change", applyFilters);
document.getElementById("cuisineFilter").addEventListener("change", applyFilters);
document.getElementById("mealFilter").addEventListener("change", applyFilters);
document.getElementById("carbFilter").addEventListener("change", applyFilters);

/* ----------------------
   Helpers
----------------------- */

// Normalize values so filters work with:
// - missing fields
// - single strings
// - arrays of strings
function normalize(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(v => v.trim().toLowerCase());
  }
  return [value.trim().toLowerCase()];
}

/* ----------------------
   Apply filters
----------------------- */
function applyFilters() {
  const protein = document.getElementById("proteinFilter").value.toLowerCase();
  const cuisine = document.getElementById("cuisineFilter").value.toLowerCase();
  const meal = document.getElementById("mealFilter").value.toLowerCase();
  const carb = document.getElementById("carbFilter").value.toLowerCase();

  const filtered = allRecipes.filter(r => {
    const proteins = normalize(r.protein);
    const cuisines = normalize(r.cuisine);
    const meals = normalize(r.meal);
    const carbs = normalize(r.carb);

    return (
      (protein === "" || proteins.includes(protein)) &&
      (cuisine === "" || cuisines.includes(cuisine)) &&
      (meal === "" || meals.includes(meal)) &&
      (carb === "" || carbs.includes(carb))
    );
  });

  renderRecipes(filtered);
}

/* ----------------------
   Render recipe cards
----------------------- */
function renderRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  recipes.forEach(r => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    const descriptionHTML = r.description
      ? `<p>${r.description}</p>`
      : "";

    const timeHTML = r.totalTime
      ? `<p class="recipe-time">⏱ ${r.totalTime}</p>`
      : "";

    card.innerHTML = `
      <a href="recipe.html?id=${r.id}">
        <div class="image-wrapper">
          <img src="${r.image}" alt="${r.title}">
        </div>
        <h3>${r.title}</h3>
      </a>
      ${descriptionHTML}
      ${timeHTML}
    `;

    container.appendChild(card);
  });
}



