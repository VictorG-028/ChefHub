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
          onPressed: () {},
          icon: const Icon(Icons.account_circle_outlined),
          iconSize: AppBar().preferredSize.height - 16,
        ),
        actions: [
          Image.asset(
            'name',
            width: AppBar().preferredSize.width - 16,
            height: AppBar().preferredSize.height - 16,
          )
        ],
      ),
      body: Placeholder(),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/creatingRecipes'),
        child: const Icon(Icons.restaurant_menu, size: 30),
      ),
    );
  }
}
