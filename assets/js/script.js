document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const recipeList = document.getElementById("recipe-list");
  
    // Fetch recipes from TheMealDB API based on search query
    const fetchRecipes = async (query) => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      displayRecipes(data.meals);
    };
  
    // Display recipes in the DOM
    const displayRecipes = (recipes) => {
      recipeList.innerHTML = ""; // Clear previous results
      if (recipes) {
        recipes.forEach(recipe => {
          const li = document.createElement("li");
          li.className = "list-group-item d-flex justify-content-between align-items-center";
          li.innerHTML = `
            <span>${recipe.strMeal}: ${recipe.strInstructions.substring(0, 100)}...</span>
            <button class="btn btn-info btn-sm" onclick="alert('Recipe: ${recipe.strInstructions}')">Details</button>
          `;
          recipeList.appendChild(li);
        });
      } else {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = "No recipes found.";
        recipeList.appendChild(li);
      }
    };
  
    // Handle form submission
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.getElementById("search-query").value;
      fetchRecipes(query);
    });
  });
  