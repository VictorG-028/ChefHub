import 'package:chefhub/src/View/home_page_view.dart';
import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';

class RecipeDetailsPage extends StatefulWidget {
  const RecipeDetailsPage({super.key});
  static const routeName = '/recipeDetails';

  @override
  State<RecipeDetailsPage> createState() => _RecipeDetailsPageState();
}

class _RecipeDetailsPageState extends State<RecipeDetailsPage> {
  static const double _separator = 10;
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as ScreenArguments;
    int recipeId = args.recipeId;

    return Scaffold(
      appBar: const CustomAppBar(showBackButton: true),
      body: SingleChildScrollView(
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
                  child: Image.network(
                    'lib/assets/placeholder.png',
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
                    const SizedBox(height: _separator),
                    const Text(
                      'titulo da receita',
                      style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFFEC0B43)),
                    ),
                    const SizedBox(height: _separator),
                    const Text(
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dapibus nisi sit amet neque molestie vehicula ac eu leo. Nullam accumsan ullamcorper sodales. Quisque vitae convallis quam. Maecenas vel ullamcorper tellus. Quisque sit amet nisl ornare ex placerat auctor non et erat. In sagittis, ligula ac congue venenatis, quam eros suscipit augue, vitae tincidunt libero nunc ac metus. Duis et placerat dui, sit amet viverra massa. Etiam convallis lacinia sem non interdum. Vestibulum ac mauris malesuada, tristique velit auctor, fermentum libero. Integer vel feugiat tortor.',
                    ),
                    const SizedBox(height: _separator),
                    const Text("Created by: ana",
                        style: TextStyle(fontWeight: FontWeight.bold)),
                    const SizedBox(height: _separator * 3),
                    const Text(
                      'Ingredientes',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: _separator),
                    SizedBox(
                      child: ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: 10,
                        shrinkWrap: true,
                        itemBuilder: (BuildContext context, int index) {
                          return ListTile(
                            leading: const Icon(Icons.circle, size: 10),
                            title: Text('Ingrediente $index'),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: _separator * 3),
                    const Text(
                      'Modo de preparo',
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: _separator),
                    SizedBox(
                      child: ListView.builder(
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: 10,
                        shrinkWrap: true,
                        itemBuilder: (BuildContext context, int index) {
                          return ListTile(
                            leading: const Icon(Icons.circle, size: 10),
                            title: Text('Modo de preparo $index'),
                          );
                        },
                      ),
                    )
                  ]),
            ),
          ],
        ),
      ),
    );
  }
}
