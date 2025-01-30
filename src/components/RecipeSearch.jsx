import React, { useState, useEffect } from "react";
import axios from "axios";
import { recipeApi } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import "./RecipeSearch.css";

const RecipeSearch = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const getYouTubeThumbnail = (url) => {
    if (!url) return null;
    const videoId = url.split("v=")[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!ingredients.trim()) {
      setError("Please enter ingredients");
      return;
    }
    
    setError("");
    setLoading(true);
    setRecipes([]);
    
    try {
      const response = await recipeApi.get(`/recipes/search?ingredients=${encodeURIComponent(ingredients)}`);
      console.log("Search response:", response);
      
      if (response.data && Array.isArray(response.data)) {
        setRecipes(response.data);
        if (response.data.length === 0) {
          setError("No recipes found with these ingredients");
        }
      } else {
        console.error("Invalid response format:", response.data);
        setError("Error: Invalid response from server");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.response?.data || "Error searching for recipes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search-container">
      <div className="search-content">
        <h1 className="search-title">Find Recipes by Ingredients</h1>
        
        <form onSubmit={handleSearch} className="search-box-container">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (comma separated)"
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </form>

        {loading && <p className="loading-message">Searching for recipes...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="recipe-results">
          {recipes.map((recipe) => {
            console.log("Rendering recipe:", recipe); 
            const thumbnailUrl = getYouTubeThumbnail(recipe.youtubeLink);
            return (
              <div key={recipe._id} className="recipe-card">
                {thumbnailUrl && (
                  <div className="recipe-image-container">
                    <img
                      src={thumbnailUrl}
                      alt={recipe.title}
                      className="recipe-thumbnail"
                    />
                  </div>
                )}
                <div className="recipe-content">
                  <h3 className="recipe-name">{recipe.title}</h3>
                  <div className="recipe-ingredients">
                    <strong>Ingredients:</strong>
                    <ul>
                      {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  {recipe.instructions && (
                    <p className="recipe-instructions">{recipe.instructions}</p>
                  )}
                  {recipe.youtubeLink && (
                    <a
                      href={recipe.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="watch-button"
                    >
                      Watch Recipe Video
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeSearch;