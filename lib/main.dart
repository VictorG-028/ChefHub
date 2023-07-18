import 'package:flutter/material.dart';
import 'package:chefhub/src/View/login_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'LactoSafe',
        initialRoute: LoginPage.routeName,
        routes: {LoginPage.routeName: (context) => const LoginPage()});
  }
}
