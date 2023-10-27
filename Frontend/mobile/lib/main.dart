import 'package:chefhub/src/view/loading_screen_page_view.dart';
import 'package:chefhub/src/view/recipe_details_page_view.dart';
import 'package:chefhub/src/view/recipes_preferences_page_view.dart';
import 'package:flutter/material.dart';
import 'package:chefhub/src/view/login_page_view.dart';
import 'package:chefhub/src/view/register_page_view.dart';
import 'package:chefhub/src/view/home_page_view.dart';
import 'package:chefhub/src/view/creating_recipes_page_view.dart';
import 'package:chefhub/src/view/ingredients_page_view.dart';
import 'package:chefhub/src/view/ingredient_form_page_view.dart';
import 'package:provider/provider.dart';
import 'src/model/ingredient_model.dart';
import 'src/model/user_model.dart';

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (context) => UserProvider()),
      ChangeNotifierProvider(create: (context) => IngredientsProvider()),
    ],
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          appBarTheme: const AppBarTheme(
            color: Color.fromARGB(255, 236, 11, 67),
          ),
          floatingActionButtonTheme: const FloatingActionButtonThemeData(
            backgroundColor: Color.fromARGB(255, 236, 11, 67),
          ),
          bottomAppBarTheme: const BottomAppBarTheme(
            color: Color.fromARGB(255, 236, 11, 67),
          )),
      title: 'ChefHub',
      initialRoute: LoginPage.routeName,
      routes: {
        LoginPage.routeName: (context) => const LoginPage(),
        RegisterPage.routeName: (context) => const RegisterPage(),
        HomePage.routeName: (context) => const HomePage(),
        CreatinRecipesPage.routeName: (context) => const CreatinRecipesPage(),
        IngredientsPage.routeName: (context) => const IngredientsPage(),
        IngredientFormPage.routeName: (context) => const IngredientFormPage(),
        RecipesPreferencesPage.routeName: (context) =>
            const RecipesPreferencesPage(),
        LoadingPage.routeName: (context) => const LoadingPage(),
        RecipeDetailsPage.routeName: (context) => const RecipeDetailsPage(),
      },
    );
  }
}
