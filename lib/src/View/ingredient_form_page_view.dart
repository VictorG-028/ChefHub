import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:chefhub/src/components/custom_text_form_field.dart';
import 'package:chefhub/src/components/circular_selector.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'package:provider/provider.dart';

import '../model/user_model.dart';

class IngredientFormPage extends StatefulWidget {
  const IngredientFormPage({super.key});
  static const routeName = '/ingredientForm';

  @override
  State<IngredientFormPage> createState() => _IngredientFormPageState();
}

class _IngredientFormPageState extends State<IngredientFormPage> {
  final nameInputController = TextEditingController();
  final quantityInputController = TextEditingController();
  final unitMeasureInputController = TextEditingController();

  Future<bool> _registerIngredient(BuildContext context, String name,
      String quantity, String unitMeasure) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final userId = userProvider.id;

    // ipconfig é o comando no terminal windows para ver ip
    const String url = "http://192.168.1.111:3001/create_ingredient";

    final Map<String, dynamic> body = {
      "user_id": userId,
      "name": name,
      "quantity": quantity,
      "unit_measure": unitMeasure,
    };

    // Talvez precise utilizar url_com_ip em vez de url
    final rawResponse = await http.post(
      Uri.parse(url),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(body),
    );

    final response = jsonDecode(rawResponse.body);

    if (rawResponse.statusCode == 200) {
      return true;
    } else {
      return false;
    }
  }

  void _handleSaveButton(BuildContext context, String name, String quantity,
      String unitMeasure) async {
    bool operationSuccess =
        await _registerIngredient(context, name, quantity, unitMeasure);

    if (!context.mounted) return;

    if (operationSuccess) {
      Navigator.pop(context);
    } else {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Error'),
          content: const Text('An error occurred while saving the ingredient.'),
          actions: [
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(showBackButton: true),
      body: SingleChildScrollView(
        child: Column(
          children: [
            CustomTextFormField(
              fieldTitle: 'Nome do ingrediente',
              label: 'Escreva o nome aqui',
              textController: nameInputController,
            ),
            CustomTextFormField(
              fieldTitle: 'Quantidade',
              label: 'Ex.: 1/2',
              textController: quantityInputController,
            ),
            const SizedBox(height: 10),
            UnitSelector(textController: unitMeasureInputController),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () => {
                _handleSaveButton(
                  context,
                  nameInputController.text,
                  quantityInputController.text,
                  unitMeasureInputController.text,
                )
              },
              child: const Text('Salvar alterações'),
            )
          ],
        ),
      ),
    );
  }
}
