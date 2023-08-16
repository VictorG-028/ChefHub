import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:provider/provider.dart';
import '../components/custom_app_bar.dart';
import '../model/shared_recipe_model.dart';
import '../model/user_model.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const routeName = '/home';

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<SharedRecipe> sharedRecipes = []; // List to hold the shared recipes

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
      appBar: const CustomAppBar(showBackButton: false),
      body: ListView.builder(
        itemCount: sharedRecipes.length,
        itemBuilder: (context, index) {
          final recipe = sharedRecipes[index];
          return ListTile(
            contentPadding: const EdgeInsets.fromLTRB(12.0, 16.0, 12.0, 12.0),
            leading: AspectRatio(
              aspectRatio: 1.0,
              child: Image.network(
                recipe.image,
                fit: BoxFit.cover,
                width: 100,
                height: 100,
              ),
            ),
            title: Text(recipe.title),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Created by: ${recipe.createdBy}",
                ),
                const SizedBox(
                  height: 8.0,
                ), // Add some space between created_by and description
                Text(recipe.description), // Display the description
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/creatingRecipes'),
        child: const Icon(Icons.restaurant_menu, size: 30),
      ),
    );
  }
}
