import 'dart:convert';
import 'package:chefhub/src/components/custom_drawer.dart';
import 'package:http/http.dart' as http;
import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:provider/provider.dart';

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

  @override
  Widget build(BuildContext context) {
    final sizeboxGrid = MediaQuery.sizeOf(context).width * 0.2;
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
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 0),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.only(left: 20),
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 1,
                  crossAxisSpacing: 0.0,
                  mainAxisSpacing: 0.0,
                ),
                itemCount: userRecipes.length + 1, // Include the create button
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return DottedBorder(
                      color: Colors.black,
                      strokeWidth: 1.2,
                      dashPattern: const <double>[
                        6,
                        3
                      ], // Adjust dashed pattern
                      padding: const EdgeInsets.all(2.0),
                      borderPadding: const EdgeInsets.all(128.0),
                      strokeCap: StrokeCap.butt,
                      borderType: BorderType.RRect,
                      radius: const Radius.circular(8.0),
                      child: GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(context, '/ingredients');
                        },
                        child: Container(
                          alignment: Alignment.center,
                          child: SizedBox(
                            width: sizeboxGrid,
                            height: sizeboxGrid,
                            child: const Center(
                              child: Icon(Icons.add),
                            ),
                          ),
                        ),
                      ),
                    );
                  } else {
                    final recipe = userRecipes[index - 1];
                    return DottedBorder(
                      color: Colors.black,
                      strokeWidth: 2,
                      dashPattern: const <double>[1, 0],
                      padding: const EdgeInsets.all(0.0),
                      borderPadding:
                          const EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 16.0),
                      strokeCap: StrokeCap.butt,
                      borderType: BorderType.RRect,
                      radius: const Radius.circular(8.0),
                      child: GestureDetector(
                        onTap: () {
                          // TODO: Handle recipe item tap
                        },
                        child: Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Text(recipe.title),
                              const SizedBox(height: 8.0),
                              Text(
                                  'Ingredientes: ${recipe.ingredients.length}'),
                              const SizedBox(height: 8.0),
                              Text('Instruções: ${recipe.instructions.length}'),
                            ],
                          ),
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
