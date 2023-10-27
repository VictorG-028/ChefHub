import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';
import '../model/user_model.dart';
import 'dart:convert';

Future<bool> registerIngredient(
    String userId, String name, String quantity, String unitMeasure) async {
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

void handleSaveButton(BuildContext context, String name, String quantity,
    String unitMeasure) async {
  final userProvider = Provider.of<UserProvider>(context, listen: false);
  final userId = userProvider.id;

  bool operationSuccess =
      await registerIngredient(userId, name, quantity, unitMeasure);

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
