const loadMeals = async () => {
    const searchFood = document.getElementById('search-food');
    const searchFoodText = searchFood.value;
    searchFood.value = '';
    if (searchFoodText == '') {
        alert('please Type Something you want to search!');
    } else {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoodText}`);
        const data = await response.json();
        displayMeals(data.meals);
    }
};

const displayMeals = (meals) => {
    const displayFoods = document.getElementById('display-foods');
    displayFoods.textContent = '';
    meals.forEach(meal => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
        colDiv.innerHTML = `
            <div onclick="loadFoodDetails('${meal.idMeal}')" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                </div>
            </div>
        `;
        displayFoods.appendChild(colDiv);
    });
};

// Load Food Details
const loadFoodDetails = async (mealId) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();
    displayFoodDetails(data.meals[0]);
};
// Display Food Details
const displayFoodDetails = (meal) => {
    const foodDetails = document.getElementById('food-details');
    foodDetails.textContent = '';
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
        </div>
    `;
    foodDetails.appendChild(cardDiv);
}