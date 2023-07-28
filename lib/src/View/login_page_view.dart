import 'package:flutter/material.dart';
import 'package:chefhub/src/components/custom_text_form_field.dart';


class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  static const routeName = '/login';

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey _formkey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 244, 123, 114),
      body: Form(
        key: _formkey,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset(
              'name',
              width: 150,
              height: 200,
            ),
            const Text(
              'Login',
              style: TextStyle(color: Colors.white, fontSize: 24),
            ),
            const CustomTextFormField(fieldTitle: 'email', label: 'email'),
            const CustomTextFormField(fieldTitle: 'senha', label: 'senha'),
            const SizedBox(height: 50),
            ElevatedButton(
              style: const ButtonStyle(
                  textStyle: MaterialStatePropertyAll(TextStyle(fontSize: 16)),
                  fixedSize: MaterialStatePropertyAll(Size(180, 40)),
                  backgroundColor: MaterialStatePropertyAll(Color(0xff493C36))),
              onPressed: () {},
              child: const Text('Entrar'),
            ),
            const SizedBox(height: 50),
            TextButton(
                onPressed: () => Navigator.popAndPushNamed(context, '/register'),
                child: const Text(
                  'Não possui uma conta? CRIAR CONTA',
                  style: TextStyle(fontSize: 18, color: Color.fromARGB(255, 113, 79, 79)),
                ))
          ],
        ),
      ),
    );
  }
}
