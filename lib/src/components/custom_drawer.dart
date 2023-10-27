import 'package:flutter/material.dart';

class CustomDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          const SizedBox(height: 50),
          ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () => Navigator.pushReplacementNamed(context, '/home')),
          ListTile(
              leading: const Icon(Icons.favorite),
              title: const Text('Minhas Receitas'),
              onTap: () =>
                  Navigator.pushReplacementNamed(context, '/creatingRecipes')),
          ListTile(
              leading: const Icon(Icons.restaurant_menu),
              title: const Text('Gerador de receita'),
              onTap: () =>
                  Navigator.pushReplacementNamed(context, '/ingredients')),
        ],
      ),
    );
  }
}
