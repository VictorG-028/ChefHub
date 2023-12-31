import 'package:flutter/material.dart';
import 'package:chefhub/src/components/custom_text_form_field.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:provider/provider.dart';
import '../model/user_model.dart';
import 'package:email_validator/email_validator.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});
  static const routeName = '/login';

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final GlobalKey<FormState> _formkey = GlobalKey<FormState>();
  final emailInputController = TextEditingController();
  final passwordInputController = TextEditingController();
  String _userId = "0";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 236, 11, 67),
      body: Form(
        key: _formkey,
        // Link explicando SingleChildScrollView
        // https://medium.com/geekculture/flutter-solving-the-overflow-problem-2fa968054d6#:~:text=Solution%3A,more%20than%20the%20screen%20size.
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'lib/assets/ChefHubIcon.png',
                width: 150,
                height: 200,
              ),
              const Text(
                'Login',
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
              CustomTextFormField(
                  fieldTitle: 'email',
                  key: const Key('email_field'),
                  titleColor: const Color.fromARGB(255, 255, 255, 255),
                  label: 'email',
                  textController: emailInputController,
                  validator: (value) {
                    if (!EmailValidator.validate(value!)) {
                      return 'Email inválido';
                    }
                    return null;
                  }),
              CustomTextFormField(
                  key: const Key('password_field'),
                  isObscure: true,
                  fieldTitle: 'senha',
                  titleColor: const Color.fromARGB(255, 255, 255, 255),
                  label: 'senha',
                  textController: passwordInputController),
              const SizedBox(height: 50),
              ElevatedButton(
                key: const Key('login_button'),
                style: ElevatedButton.styleFrom(
                  textStyle: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                  fixedSize: const Size(180, 40),
                  backgroundColor: const Color.fromARGB(255, 255, 255, 255),
                  foregroundColor: const Color.fromARGB(255, 0, 0, 0),
                ),
                onPressed: () {
                  if (_formkey.currentState!.validate()) {
                    _handleLogin(context);
                  }
                },
                child: const Text(
                  'Entrar',
                ),
              ),
              const SizedBox(height: 50),
              TextButton(
                onPressed: () =>
                    Navigator.popAndPushNamed(context, '/register'),
                child: const Text(
                  'Não possui uma conta? CRIAR CONTA',
                  style: TextStyle(
                    fontSize: 18,
                    color: Color.fromARGB(255, 255, 255, 255),
                  ),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  void _handleLogin(BuildContext context) async {
    await _loginUser(
        context, emailInputController.text, passwordInputController.text);

    if (!context.mounted) return;

    final userIdProvider = Provider.of<UserProvider>(context, listen: false);
    userIdProvider.setUserId(_userId);

    if (_userId != "0") {
      Navigator.popAndPushNamed(context, '/home');
    }
  }

  Future<void> _loginUser(
      BuildContext context, String email, String password) async {
    // ipconfig é o comando no terminal windows para ver ip
    // const url = "http://localhost:3001/login_user";
    const ipUrl = "http://192.168.1.111:3001/login_user";

    final String body =
        jsonEncode(<String, dynamic>{'email': email, 'password': password});

    // Talvez precise utilizar url_com_ip em vez de url
    final rawResponse = await http.post(Uri.parse(ipUrl),
        headers: <String, String>{'Content-type': 'application/json'},
        body: body);

    final response = jsonDecode(rawResponse.body);

    final msg = response["msg"].toString();
    final userId = response["id"].toString();

    if (rawResponse.statusCode == 200) {
      setState(() {
        _userId = userId;
      });
    } else {
      setState(() {
        _userId = "0";
      });
      // throw Exception('Failed to load connections API');
    }
  }
}
