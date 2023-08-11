import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';

class IngredientsPage extends StatefulWidget {
  const IngredientsPage({Key? key}) : super(key: key);
  static const routeName = '/ingredients';

  @override
  State<IngredientsPage> createState() => _IngredientsPageState();
}

class _IngredientsPageState extends State<IngredientsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(),
      body: Column(
        children: [
          const Text('Ingredientes'),
          Expanded(
            child: ListView.builder(
              itemCount: 10,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  trailing: IconButton(
                    icon: const Icon(Icons.delete),
                    onPressed: () {},
                  ),
                  title: Text('Ingrediente $index'),
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
        onPressed: () => Navigator.pushNamed(context, '/ingredientForm'),
        child: const Text('Adicionar Alimento'),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
