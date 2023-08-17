import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

import '../model/ingredient_model.dart';
import '../model/user_model.dart';

class IngredientsPage extends StatefulWidget {
  const IngredientsPage({Key? key}) : super(key: key);
  static const routeName = '/ingredients';

  @override
  State<IngredientsPage> createState() => _IngredientsPageState();
}

class _IngredientsPageState extends State<IngredientsPage> {
  List<Ingredient> userIngredients = [];

  @override
  void initState() {
    super.initState();
    _fetchUserIngredients();
  }

  Future<void> _fetchUserIngredients() async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final userId = userProvider.id;

    final response = await http.get(
        Uri.parse("http://192.168.1.111:3001/get_user_ingredients/$userId"));
    if (response.statusCode == 200) {
      final Map<String, dynamic> responseData = json.decode(response.body);
      final List<dynamic> ingredientsData = responseData["userInvIngredients"];

      setState(() {
        userIngredients =
            ingredientsData.map((data) => Ingredient.fromJson(data)).toList();
      });
    }
  }

  Future<void> _deleteIngredients(List<Ingredient> ingredientsToDelete) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final userId = userProvider.id;

    final List<Map<String, dynamic>> ingredientsJsonList =
        ingredientsToDelete.map((ingredient) => ingredient.toJson()).toList();

    final Map<String, dynamic> body = {
      "user_id": userId,
      "ingredients": ingredientsJsonList,
    };

    const String url = "http://192.168.1.111:3001/delete_ingredient";
    final response = await http.post(
      Uri.parse(url),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );

    if (response.statusCode == 200) {
      _fetchUserIngredients(); // Refresh the list of ingredients
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(showBackButton: true),
      body: Column(
        children: [
          const SizedBox(height: 20),
          const Text(
            'Seus Ingredientes',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.black,
            ),
          ),
          const SizedBox(height: 20),
          Expanded(
            child: ListView.builder(
              itemCount: userIngredients.length,
              itemBuilder: (BuildContext context, int index) {
                final ingredient = userIngredients[index];
                return ListTile(
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () => _deleteIngredients([ingredient]),
                  ),
                  title: Text(ingredient.name),
                  subtitle: Text(
                      'Quantity: ${ingredient.quantity} ${ingredient.unitMeasure}'),
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        height: 60,
        child: IconButton(
          onPressed: () => Navigator.pushNamed(context, '/recipesPreferences'),
          icon: const Icon(Icons.arrow_forward),
        ),
      ),
      floatingActionButton: ElevatedButton(
        onPressed: () => Navigator.pushNamed(context, '/ingredientForm')
            .then((_) => _fetchUserIngredients()),
        child: const Text('Adicionar Alimento'),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
