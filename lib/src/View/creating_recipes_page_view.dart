import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';
import 'package:dotted_border/dotted_border.dart';

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
      appBar: const CustomAppBar(),
      body: Column(
        children: [
          const Text('Suas Receitas'),
          DottedBorder(
            color: Colors.black,
            strokeWidth: 1,
            child: SizedBox(
              height: 200,
              width: 200,
              child: IconButton(
                onPressed: () => Navigator.pushNamed(context, '/ingredients'),
                icon: const Icon(Icons.add),
              ),
            ),
          )
        ],
      ),
    );
  }
}
