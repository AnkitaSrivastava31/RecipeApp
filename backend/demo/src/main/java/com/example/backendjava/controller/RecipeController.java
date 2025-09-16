package com.example.backendjava.controller;

import com.example.backendjava.model.Recipe;
import com.example.backendjava.service.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {
    @Autowired
    private RecipeService recipeService;

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @PostMapping("/load")
    public ResponseEntity<String> loadRecipes() {
        logger.info("POST /recipes/load called");
        recipeService.loadRecipesFromExternalApi();
        return ResponseEntity.ok("Recipes loaded successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<Recipe>> searchRecipes(@RequestParam String query) {
        logger.info("GET /recipes/search called with query: {}", query);
        return ResponseEntity.ok(recipeService.searchRecipes(query));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        logger.info("GET /recipes/{} called", id);
        Recipe recipe = recipeService.getRecipeById(id);
        if (recipe == null) {
            logger.warn("Recipe with id {} not found", id);
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(recipe);
    }
}
