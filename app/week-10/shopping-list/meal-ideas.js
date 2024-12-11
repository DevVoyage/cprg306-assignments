import React, { useState, useEffect } from 'react';

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);

  // Fetch meal ideas based on ingredient
  const fetchMealIdeas = async (ingredient) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals || [];
  };

  // Load meal ideas whenever ingredient changes
  const loadMealIdeas = async () => {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals);
  };

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]); // Re-run on ingredient change

  return (
    <div>
      <h1 className="text-2xl font-semibold text-yellow-950 mb-4">Meal Ideas for {ingredient}</h1>
      {meals.length === 0 ? (
        <span className="font-semibold text-yellow-950">No meals found</span>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal} className="p-2 mb-2 border-b border-yellow-950">
              <span className="text-lg font-semibold text-yellow-950">{meal.strMeal}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MealIdeas;
