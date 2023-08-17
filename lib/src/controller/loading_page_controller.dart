import 'package:chefhub/src/model/ingredient_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../model/user_model.dart';

Future<void> loadCreatedRecipesPage(BuildContext context) async {
  await Future.delayed(const Duration(seconds: 5));
  // ignore: use_build_context_synchronously
  Navigator.pushNamedAndRemoveUntil(
    context,
    '/creatingRecipes',
    (Route<dynamic> route) => false,
  );
}

Future<void> requestToCreateRecipe(BuildContext context) async {
  final userProvider = Provider.of<UserProvider>(context, listen: false);
  final userId = userProvider.id;

  final ingredientsProvider =
      Provider.of<IngredientsProvider>(context, listen: false);
  final ingredients = ingredientsProvider.ingredients;

  final List<Map<String, dynamic>> ingredientsJsonList =
      ingredients.map((ingredient) => ingredient.toJson()).toList();

  final List<String> preferences = [""];

  final body = {
    "user_id": userId,
    "ingredients": ingredientsJsonList,
    "preferences": preferences,
  };

  const url = "http://192.168.1.111:3001/create_recipe";
  final response = await http.post(
    Uri.parse(url),
    headers: <String, String>{'Content-Type': 'application/json'},
    body: jsonEncode(body),
  );

  if (response.statusCode == 200) {
    final Map<String, dynamic> responseData = json.decode(response.body);
    final int recipeId = responseData["recipe_id"];
    final String title = responseData["title"];
    final List<dynamic> ingredientsData = responseData["ingredients"];
    final List<dynamic> instructionsData = responseData["instructions"];

    final List<Ingredient> recipeIngredients =
        ingredientsData.map((data) => Ingredient.fromJson(data)).toList();

    final List<String> instructions = instructionsData.cast<String>();

    // Do something with the recipe details
    print("Recipe ID: $recipeId");
    print("Title: $title");
    print("Ingredients: $recipeIngredients");
    print("Instructions: $instructions");
  } else {
    // Handle error
    print("Failed to create recipe");
  }
}
