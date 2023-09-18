import 'package:chefhub/src/model/ingredient_model.dart';

class Recipe {
  final String title;
  final String createdBy;
  final List<Ingredient> ingredients;
  final List<String> instructions;
  final String description;
  final String image;

  Recipe({
    required this.title,
    required this.ingredients,
    required this.instructions,
    required this.createdBy,
    required this.description,
    required this.image,
  });

  factory Recipe.fromJson(Map<String, dynamic> json) {
    final List<dynamic> ingredients = json['ingredients'];
    final List<Ingredient> parsedIngredients =
        ingredients.map((data) => Ingredient.fromJson(data)).toList();
    final List<dynamic> instructions = json['instructions'];
    final List<String> parsedInstructions =
        instructions.map((data) => data.toString()).toList();

    return Recipe(
      title: json['title'],
      ingredients: parsedIngredients,
      instructions: parsedInstructions,
      createdBy: json['created_by'],
      description: json['description'],
      image: json['image'], // possibly equal to "NULL"
    );
  }
}
