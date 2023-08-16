import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:chefhub/src/components/custom_text_form_field.dart';
import 'package:chefhub/src/components/circular_selector.dart';
import 'package:flutter/material.dart';

class IngredientFormPage extends StatefulWidget {
  const IngredientFormPage({super.key});
  static const routeName = '/ingredientForm';

  @override
  State<IngredientFormPage> createState() => _IngredientFormPageState();
}

class _IngredientFormPageState extends State<IngredientFormPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(showBackButton: true),
      body: const CustomTextFormField(
        fieldTitle: 'Nome do ingrediente',
        label: 'Escreva o nome aqui',
      ),
      floatingActionButton: ElevatedButton(
        style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFEC0B43),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
            fixedSize: const Size(200, 50)),
        onPressed: (){
          Navigator.pop(context);
        },
        child: const Text(
          'Salvar Ingrediente',
          style: TextStyle(fontSize: 16),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
