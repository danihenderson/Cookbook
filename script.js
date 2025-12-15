fetch("recipes.json")
  .then(response => response.json())
  .then(recipes => {
    window.allRecipes = recipes;
    renderRecipes(recipes);
  });

document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", applyFilters);
});

function applyFilters() {
  const protein = document.getElementById("proteinFilter").value;
  const meal = document.getElementById("mealFilter").value;
  const cuisine = document.getElementById("cuisineFilter").value;

  const filtered = window.allRecipes.filter(r =>
    (protein === "" || r.protein === protein) &&
    (meal === "" || r.meal === meal) &&
    (cuisine === "" || r.cuisine === cuisine)
  );

  renderRecipes(filtered);
}

function renderRecipes(recipes) {
  const container = document.getElementById("recipes");
  container.innerHTML = "";

  recipes.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${r.title}</h3>
      <p>${r.description}</p>
    `;
    container.appendChild(div);
  });
}
