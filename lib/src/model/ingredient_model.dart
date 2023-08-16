class Ingredient {
  final String name;
  final String quantity;
  final String unitMeasure;

  Ingredient({
    required this.name,
    required this.quantity,
    required this.unitMeasure,
  });

  factory Ingredient.fromJson(Map<String, dynamic> json) {
    return Ingredient(
      name: json['name'],
      quantity: json['quantity'],
      unitMeasure: json['unit_measure'],
    );
  }
}
