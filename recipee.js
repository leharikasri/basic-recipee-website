const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const recipeListEl = document.getElementById("recipe-list");
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2>${recipe.title}</h2>
        `;
        recipeItemEl.querySelector('img').addEventListener("click", () => {
            window.open(recipe.sourceUrl, "_blank"); // Open in new tab
        });
        recipeListEl.appendChild(recipeItemEl);
    });
}

async function getRecipes(query = '') {
    const url = query
        ? `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
        : `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.results || data.recipes;
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}

searchBar.addEventListener("input", async () => {
    const query = searchBar.value;
    if(query.length === 0){
        init();
        return;
    }
    const recipes = await getRecipes(query);
    displayRecipes(recipes);
});

searchButton.addEventListener("click", async () => {
    const query = searchBar.value;
    if (query) {
        const recipes = await getRecipes(query);
        displayRecipes(recipes);
    } else {
        init(); 
    }
});

searchBar.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        searchButton.click();
    }
});

init();
