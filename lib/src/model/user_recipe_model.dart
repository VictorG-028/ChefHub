import 'ingredient_model.dart';

class UserRecipe {
  final String title;
  final List<String> instructions;
  final List<Ingredient> ingredients;

  UserRecipe({
    required this.title,
    required this.instructions,
    required this.ingredients,
  });

  factory UserRecipe.fromJson(Map<String, dynamic> json) {
    final List<dynamic> ingredientsData = json['ingredients'];
    final List<Ingredient> parsedIngredients =
        ingredientsData.map((data) => Ingredient.fromJson(data)).toList();

    final dynamic instructionsData = json['instructions'];
    final List<String> parsedInstructions =
        instructionsData is String ? instructionsData.split('@') : [];

    return UserRecipe(
      title: json['title'],
      instructions: parsedInstructions,
      ingredients: parsedIngredients,
    );
  }
}
