import 'package:chefhub/src/components/custom_text_form_field.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});
  static const routeName = '/register';

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final GlobalKey _formkey = GlobalKey<FormState>();
  final emailInputController = TextEditingController();
  final passwordInputController = TextEditingController();
  String _userId = "0";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromARGB(255, 244, 123, 114),
      body: Form(
        key: _formkey,
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
                'Criar Conta',
                style: TextStyle(color: Colors.white, fontSize: 24),
              ),
              CustomTextFormField(
                  fieldTitle: 'email',
                  label: 'email',
                  textController: emailInputController),
              CustomTextFormField(
                fieldTitle: 'senha',
                label: 'senha',
                textController: passwordInputController,
              ),
              const SizedBox(height: 50),
              ElevatedButton(
                style: const ButtonStyle(
                    textStyle:
                        MaterialStatePropertyAll(TextStyle(fontSize: 16)),
                    fixedSize: MaterialStatePropertyAll(Size(180, 40)),
                    backgroundColor:
                        MaterialStatePropertyAll(Color(0xff493C36))),
                onPressed: () => {
                  _registerUser(
                      emailInputController.text, passwordInputController.text)
                },
                child: const Text('Criar Conta'),
              ),
              const SizedBox(height: 50),
              TextButton(
                  onPressed: () => Navigator.popAndPushNamed(context, '/login'),
                  child: const Text(
                    'Já possui uma conta? ENTRAR',
                    style: TextStyle(
                        fontSize: 18, color: Color.fromARGB(255, 113, 79, 79)),
                  ))
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _registerUser(String email, String password) async {
    // ipconfig é o comando no terminal windows para ver ip
    // const url = "http://localhost:3001/register_user";
    const ipUrl = "http://192.168.1.111:3001/register_user";

    final String body =
        jsonEncode(<String, dynamic>{'email': email, 'password': password});

    // Talvez precise utilizar url_com_ip em vez de url
    final rawResponse = await http.post(Uri.parse(ipUrl),
        headers: <String, String>{'Content-type': 'application/json'},
        body: body);

    final response = jsonDecode(rawResponse.body);

    final msg = response["msg"].toString();
    final userId = response["id"].toString();
    print("=--------------=");
    print(response);
    print(msg);
    print("=--------------=");

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
