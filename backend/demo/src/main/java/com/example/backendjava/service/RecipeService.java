package com.example.backendjava.service;

import com.example.backendjava.model.Recipe;
import com.example.backendjava.repository.RecipeRepository;
import jakarta.persistence.EntityManager;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class RecipeService {
    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private RestTemplate restTemplate;

    private static final String EXTERNAL_API_URL = "https://dummyjson.com/recipes";

    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    public void loadRecipesFromExternalApi() {
        logger.info("Loading recipes from external API...");
        try {
            RecipesResponse response = restTemplate.getForObject(EXTERNAL_API_URL, RecipesResponse.class);
            if (response != null && response.getRecipes() != null) {
                for (Recipe recipe : response.getRecipes()) {
                    recipe.setId(null);
                }
                recipeRepository.saveAll(response.getRecipes());
                logger.info("Loaded {} recipes from external API.", response.getRecipes().size());
            } else {
                logger.warn("No recipes found in external API response.");
            }
        } catch (Exception e) {
            logger.error("Failed to load recipes from external API: {}", e.getMessage());
        }
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
    }

    public List<Recipe> searchRecipes(String query) {
        logger.info("Searching recipes with query: {}", query);
        SearchResult<Recipe> result = Search.session(entityManager)
            .search(Recipe.class)
            .where(f -> f.simpleQueryString()
                .fields("name", "cuisine")
                .matching(query))
            .fetch(20);
        logger.info("Found {} recipes for query: {}", result.hits().size(), query);
        return result.hits();
    }

    public static class RecipesResponse {
        private List<Recipe> recipes;
        public List<Recipe> getRecipes() { return recipes; }
        public void setRecipes(List<Recipe> recipes) { this.recipes = recipes; }
    }
}
