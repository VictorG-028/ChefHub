import 'package:flutter/material.dart';

class Ingredient {
  final String name;
  final String quantity;
  final String unitMeasure;
  bool isSelected;

  Ingredient({
    required this.name,
    required this.quantity,
    required this.unitMeasure,
    this.isSelected = false,
  });

  factory Ingredient.fromJson(Map<String, dynamic> json) {
    return Ingredient(
      name: json['name'],
      quantity: json['quantity'],
      unitMeasure: json['unit_measure'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'quantity': quantity,
      'unit_measure': unitMeasure,
    };
  }
}

class IngredientsProvider extends ChangeNotifier {
  List<Ingredient> _ingredients = []; // Initial value

  List<Ingredient> get ingredients => _ingredients;

  void setIngredients(List<Ingredient> ingredients) {
    _ingredients = ingredients;
    notifyListeners();
  }
}
