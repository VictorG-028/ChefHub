import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';

class RecipesPreferencesPage extends StatefulWidget {
  const RecipesPreferencesPage({super.key});
  static const routeName = '/recipesPreferences';

  @override
  State<RecipesPreferencesPage> createState() => _RecipesPreferencesPageState();
}

class _RecipesPreferencesPageState extends State<RecipesPreferencesPage> {
  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      appBar: const CustomAppBar(),
      body: const SingleChildScrollView(
        
      ),
      bottomNavigationBar: BottomAppBar(
        height: 60,
        child: IconButton(
          onPressed: () => Navigator.pushNamed(context, '/loadingPage'),
          icon: const Icon(Icons.arrow_forward),
        ),
      ),
    );
  }
}