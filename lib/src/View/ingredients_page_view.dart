import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:chefhub/src/components/custom_drawer.dart';
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
      drawer: CustomDrawer(),
      appBar: const CustomAppBar(showBackButton: false),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const SizedBox(height: 30),
          const Padding(
            padding: EdgeInsets.only(left: 20),
            child: Text(
              'Ingredientes',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 20),
          Expanded(
            child: ListView.builder(
              itemCount: userIngredients.length,
              itemBuilder: (BuildContext context, int index) {
                final ingredient = userIngredients[index];
                return Column(
                  children: [
                    Container(
                      alignment: Alignment.centerLeft,
                      height: 100,
                      color: const Color(0xFFF9F3F3),
                      child: ListTile(
                        trailing: IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed: () => _deleteIngredients([ingredient]),
                        ),
                        title: Text(
                          ingredient.name,
                          style: const TextStyle(fontSize: 16),
                        ),
                        subtitle: Text(
                          'Quantidade: ${ingredient.quantity} ${ingredient.unitMeasure}',
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                  ],
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomAppBar(
        height: 60,
        child: Container(
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: Color(0xFFF47A72),
          ),
          child: IconButton(
            onPressed: () =>
                Navigator.pushNamed(context, '/recipesPreferences'),
            icon: const Icon(Icons.arrow_forward,
                color: Color(0xFFFFFFFF), size: 30),
          ),
        ),
      ),
      floatingActionButton: ElevatedButton(
        style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFF47A72),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
            fixedSize: const Size(200, 50)),
        onPressed: () => Navigator.pushNamed(context, '/ingredientForm')
            .then((_) => _fetchUserIngredients()),
        child: const Text(
          'Adicionar ingrediente',
          style: TextStyle(fontSize: 16),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
