class RecipePreferences {
  static const List<String> _rules = [
    "Não usar mais que quantidade",
    "Pode acrescentar mais ingredientes",
    "Receita deve ser vegana",
    "Receita deve ser vegetariana",
    "Receita deve ser simples",
    "Receita deve ser fácil de fazer",
  ];
  static const List<String> _culinary = [
    "culinária Francesa",
    "culinária Italiana",
    "culinária Japonesa",
    "culinária Chinesa",
    "culinária Portuguesa",
  ];

  String _selectedCulinary = '';
  List<bool> _selectedRules =
      List.generate(_rules.length, (index) => false);

  List<String> get getRules => _rules;
  List<String> get getCulinary => _culinary;
  List<bool> get getSelectedRules => _selectedRules;
  String get getSelectedCulinary => _selectedCulinary;

  set setCulinary(String culinary) {
    _selectedCulinary = culinary;
  }

  set setSelectRules(List<bool> rules) {
    _selectedRules = rules;
  }
}

RecipePreferences recipePreferences = RecipePreferences();
