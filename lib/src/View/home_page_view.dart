import 'package:chefhub/src/components/custom_drawer.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:provider/provider.dart';
import '../components/custom_app_bar.dart';
import '../model/shared_recipe_model.dart';
import '../model/user_model.dart';

class ScreenArguments {
  final int recipeId;

  ScreenArguments(this.recipeId);
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const routeName = '/home';

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<SharedRecipe> sharedRecipes = [];

  @override
  void initState() {
    super.initState();
    _fetchSharedRecipes(); // Call the function to fetch shared recipes when the widget is created
  }

  Future<void> _fetchSharedRecipes() async {
    const String url = "http://192.168.1.111:3001/get_shared_recipes";
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);
      final List<dynamic> recipesData = responseData["sharedRecipesData"];
      setState(() {
        sharedRecipes =
            recipesData.map((data) => SharedRecipe.fromJson(data)).toList();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context);
    final String userId = userProvider.id;

    return Scaffold(
      drawer: CustomDrawer(),
      appBar: const CustomAppBar(showBackButton: false),
      body: ListView.builder(
          itemCount: sharedRecipes.length,
          itemBuilder: (context, index) {
            final recipe = sharedRecipes[index];
            return GestureDetector(
              onTap: () => Navigator.pushNamed(context, '/recipeDetails',
                  arguments: {sharedRecipes[index].id}),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
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
                        child: Image.network(
                          recipe.image,
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 20),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const SizedBox(height: 10),
                          Text(
                            recipe.title,
                            style: const TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFFEC0B43)),
                          ),
                          const SizedBox(height: 10),
                          Text(recipe.description),
                          const SizedBox(height: 10),
                          Text("Created by: ${recipe.createdBy}"),
                        ]),
                  ),
                ],
              ),
            );
          }),
    );
  }
}
