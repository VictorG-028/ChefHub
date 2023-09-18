import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';
import '../model/recipe_detail_args.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../model/recipe_model.dart';

class RecipeDetailsPage extends StatefulWidget {
  const RecipeDetailsPage({super.key});
  static const routeName = '/recipeDetails';

  @override
  State<RecipeDetailsPage> createState() => _RecipeDetailsPageState();
}

class _RecipeDetailsPageState extends State<RecipeDetailsPage> {
  static const double _separator = 10;

  Future<Recipe> _fetchRecipe(int recipeId) async {
    String url = "http://192.168.1.111:3001/get_recipe/$recipeId";
    final response = await http.get(Uri.parse(url));

    // TODO add an alternative return if status code is not 200
    // if (response.statusCode == 200) {}
    final Map<String, dynamic> responseData = json.decode(response.body);
    final Map<String, dynamic> recipeData = responseData["compactedRecipeData"];
    return Recipe.fromJson(recipeData);
  }

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;
    int recipeId = args.recipeId;
    print("ID passado $recipeId");

    return Scaffold(
      appBar: const CustomAppBar(showBackButton: true),
      body: FutureBuilder<Recipe>(
        future: _fetchRecipe(recipeId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Return a loading indicator while fetching data
            return const CircularProgressIndicator();
          } else if (snapshot.hasError) {
            // Handle errors if the fetch fails
            return Text("Error: ${snapshot.error}");
          } else {
            // Build your UI with the fetched recipe data
            final recipe = snapshot.data!;
            return SingleChildScrollView(
              child: Column(
                children: [
                  const SizedBox(
                    height: 30.0,
                  ),
                  Center(
                    child: SizedBox(
                      width: MediaQuery.sizeOf(context).width,
                      height: 250,
                      child: AspectRatio(
                        aspectRatio: 1,
                        child: recipe.image != "NULL"
                            ? Image.network(
                                recipe.image,
                                fit: BoxFit.cover,
                              )
                            : Container(), // An empty container if image is "NULL"
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 20),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: _separator),
                          Text(
                            recipe.title,
                            style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFFEC0B43)),
                          ),
                          const SizedBox(height: _separator),
                          Text(recipe.description),
                          const SizedBox(height: _separator),
                          Text("Created by: ${recipe.createdBy}",
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(height: _separator * 3),
                          const Text(
                            'Ingredientes',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: _separator),
                          SizedBox(
                            child: ListView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              itemCount: recipe.ingredients.length,
                              shrinkWrap: true,
                              itemBuilder: (BuildContext context, int index) {
                                return ListTile(
                                  leading: const Icon(Icons.circle, size: 10),
                                  title: Text(
                                      '${recipe.ingredients[index].name} ${recipe.ingredients[index].quantity} ${recipe.ingredients[index].unitMeasure}'),
                                );
                              },
                            ),
                          ),
                          const SizedBox(height: _separator * 3),
                          const Text(
                            'Modo de preparo',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: _separator),
                          SizedBox(
                            child: ListView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              itemCount: recipe!.instructions.length,
                              shrinkWrap: true,
                              itemBuilder: (BuildContext context, int index) {
                                return ListTile(
                                  leading: const Icon(Icons.circle, size: 10),
                                  title: Text(recipe.instructions[index]),
                                );
                              },
                            ),
                          )
                        ]),
                  ),
                ],
              ),
            );
          }
        },
      ),
    );
  }
}
