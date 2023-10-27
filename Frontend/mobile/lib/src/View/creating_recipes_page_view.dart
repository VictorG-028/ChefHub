import 'dart:convert';
import 'package:chefhub/src/components/custom_drawer.dart';
import 'package:http/http.dart' as http;
import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';
// import 'package:dotted_border/dotted_border.dart';
import 'package:provider/provider.dart';

import '../model/recipe_detail_args.dart';
import '../model/user_model.dart';
import '../model/user_recipe_model.dart';

class CreatinRecipesPage extends StatefulWidget {
  const CreatinRecipesPage({super.key});
  static const routeName = '/creatingRecipes';

  @override
  State<CreatinRecipesPage> createState() => _CreatinRecipesPageState();
}

class _CreatinRecipesPageState extends State<CreatinRecipesPage> {
  List<UserRecipe> userRecipes = [];

  @override
  void initState() {
    super.initState();
    _fetchUserRecipes();
  }

  Future<void> _fetchUserRecipes() async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final userId = userProvider.id;

    final response = await http
        .get(Uri.parse("http://192.168.1.111:3001/get_user_recipes/$userId"));
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);
      final List<dynamic> recipesData = responseData["userRecipesData"];
      setState(() {
        userRecipes =
            recipesData.map((data) => UserRecipe.fromJson(data)).toList();
      });
    }
  }

  Future<void> _shareRecipe(String description, int recipeId) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final userId = userProvider.id;

    final String body = jsonEncode(<String, dynamic>{
      'user_id': userId,
      'recipe_id': recipeId,
      'description': description,
    });

    final rawResponse = await http.post(
      Uri.parse("http://192.168.1.111:3001/share_recipe"),
      headers: <String, String>{'Content-type': 'application/json'},
      body: body,
    );
  }

  void _showShareModal(BuildContext context, UserRecipe recipe) async {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        String description = ''; // Initialize description
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setState) {
            return Container(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  const Text(
                    'Compartilhar Receita',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  TextField(
                    onChanged: (value) {
                      setState(() {
                        description = value;
                      });
                    },
                    decoration: const InputDecoration(
                      hintText: 'Digite sua descrição...',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 16.0),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: [
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop(); // Close the modal
                        },
                        child: const Text('Fechar'),
                      ),
                      ElevatedButton(
                        onPressed: () async {
                          await _shareRecipe(description, recipe.id);
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content:
                                  Text('Receita compartilhada com sucesso!'),
                            ),
                          );
                          Navigator.of(context).pop(); // Close the modal
                        },
                        child: const Text('Compartilhar'),
                      ),
                    ],
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    // final sizeboxGrid = MediaQuery.sizeOf(context).width * 0.2;
    return Scaffold(
      drawer: CustomDrawer(),
      appBar: const CustomAppBar(showBackButton: false),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 30),
          const Padding(
            padding: EdgeInsets.only(left: 20),
            child: Text(
              'Suas Receitas',
              style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Colors.deepOrange),
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2, // Adjust the number of columns as needed
                  crossAxisSpacing: 16.0,
                  mainAxisSpacing: 16.0,
                ),
                itemCount: userRecipes.length + 1,
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return GestureDetector(
                      onTap: () {
                        Navigator.pushNamed(context, '/ingredients');
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.deepOrange,
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        child: const Center(
                          child: Icon(
                            Icons.add,
                            size: 48,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    );
                  } else {
                    final recipe = userRecipes[index - 1];
                    return GestureDetector(
                      onTap: () => Navigator.pushNamed(
                        context,
                        '/recipeDetails',
                        arguments: ScreenArguments(recipe.id),
                      ),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(8.0),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.grey.withOpacity(0.5),
                              spreadRadius: 2,
                              blurRadius: 5,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Text(
                              recipe.title,
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                              overflow: TextOverflow.ellipsis,
                              maxLines: 2,
                              textAlign: TextAlign.center,
                            ),
                            const SizedBox(height: 8.0),
                            Text(
                              'Ingredientes: ${recipe.ingredients.length}',
                              style: const TextStyle(
                                fontSize: 14,
                                color: Colors.grey,
                              ),
                            ),
                            const SizedBox(height: 8.0),
                            Text(
                              'Instruções: ${recipe.instructions.length}',
                              style: const TextStyle(
                                fontSize: 14,
                                color: Colors.grey,
                              ),
                            ),
                            const SizedBox(height: 8.0),
                            ElevatedButton(
                              onPressed: () {
                                _showShareModal(
                                  context,
                                  recipe,
                                );
                              },
                              child: const Icon(Icons.share),
                            ),
                          ],
                        ),
                      ),
                    );
                  }
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
