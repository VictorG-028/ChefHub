import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const routeName = '/home';

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () => {},
          icon: const Icon(Icons.account_circle_outlined),
          iconSize: AppBar().preferredSize.height - 16,
        ),
        actions: [
          Container(
            padding: const EdgeInsets.all(8.0),
            child: Image.asset(
              'lib/assets/ChefHubIcon.png',
              width: AppBar().preferredSize.height - 16,
              height: AppBar().preferredSize.height - 16,
              fit: BoxFit.contain,
            ),
          ),
        ],
      ),
      body: const Placeholder(),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/creatingRecipes'),
        child: const Icon(Icons.restaurant_menu, size: 30),
      ),
    );
  }
}
