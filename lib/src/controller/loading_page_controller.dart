import 'package:flutter/material.dart';

Future<void> loadCreatedRecipesPage(BuildContext context) async {
  await Future.delayed(const Duration(seconds: 5));
  // ignore: use_build_context_synchronously
  Navigator.pushNamedAndRemoveUntil(
    context,
    '/creatingRecipes',
    (Route<dynamic> route) => false,
  );
}
