import 'package:flutter/material.dart';

class CreatinRecipesPage extends StatefulWidget {
  const CreatinRecipesPage({super.key});
  static const routeName = '/creatingRecipes';

  @override
  State<CreatinRecipesPage> createState() => _CreatinRecipesPageState();
}

class _CreatinRecipesPageState extends State<CreatinRecipesPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
            onPressed: () => Navigator.pop(context),
            icon: const Icon(Icons.arrow_back)),
        actions: [
          Image.asset(
            'name',
            width: AppBar().preferredSize.width - 16,
            height: AppBar().preferredSize.height - 16,
          )
        ],
      ),
      body: const Placeholder(),
    );
  }
}
