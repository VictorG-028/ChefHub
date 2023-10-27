import 'ingredient_model.dart';

class UserRecipe {
  final int id;
  final String title;
  final List<String> instructions;
  final List<Ingredient> ingredients;

  UserRecipe({
    required this.id,
    required this.title,
    required this.instructions,
    required this.ingredients,
  });

  factory UserRecipe.fromJson(Map<String, dynamic> json) {
    final List<dynamic> ingredientsData = json['ingredients'];
    final List<Ingredient> parsedIngredients =
        ingredientsData.map((data) => Ingredient.fromJson(data)).toList();

    final String instructionsData = json['instructions'];
    final List<String> parsedInstructions = instructionsData.split('@');

    return UserRecipe(
      id: json['id'],
      title: json['title'],
      instructions: parsedInstructions,
      ingredients: parsedIngredients,
    );
  }
}
