import 'package:flutter/material.dart';
import 'package:chefhub/src/View/login_page_view.dart';
import 'package:chefhub/src/View/register_page_view.dart';
import 'package:chefhub/src/View/home_page_view.dart';
import 'package:chefhub/src/View/creating_recipes_page_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          appBarTheme: const AppBarTheme(
            color: Color.fromARGB(255, 244, 123, 114),
          ),
          floatingActionButtonTheme: const FloatingActionButtonThemeData(
            backgroundColor: Color.fromARGB(255, 244, 123, 114),
          ),
        ),
        title: 'ChefHub',
        initialRoute: LoginPage.routeName,
        routes: {
          LoginPage.routeName: (context) => const LoginPage(),
          RegisterPage.routeName: (context) => const RegisterPage(),
          HomePage.routeName: (context) => const HomePage(),
          CreatinRecipesPage.routeName:(context) => const CreatinRecipesPage(),

        });
  }
}

