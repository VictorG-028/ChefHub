import 'package:chefhub/src/components/custom_text_form_field.dart';
import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});
  static const routeName = '/register';

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
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
              'Criar Conta',
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
              child: const Text('Criar Conta'),
            ),
            const SizedBox(height: 50),
            TextButton(
                onPressed: () => Navigator.popAndPushNamed(context, '/login'),
                child: const Text(
                  'Já possui uma conta? ENTRAR',
                  style: TextStyle(fontSize: 18, color: Color.fromARGB(255, 113, 79, 79)),
                ))
          ],
        ),
      ),
    );
  }
}