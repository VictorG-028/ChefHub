import 'package:chefhub/src/model/Recipe_Preferences.dart';

void savePreferences(String culinary, List<bool> rules) {
  recipePreferences.setCulinary = culinary;
  recipePreferences.setSelectRules = rules;
}
