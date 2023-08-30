import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:chefhub/src/components/custom_text_form_field.dart';
import 'package:chefhub/src/controller/ingredient_form_page_controller.dart';
import 'package:flutter/material.dart';

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
            const SizedBox(height: 30),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFEC0B43),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(30),
                  ),
                  fixedSize: const Size(200, 50)),
              onPressed: () => {
                handleSaveButton(
                  context,
                  nameInputController.text,
                  quantityInputController.text,
                  unitMeasureInputController.text,
                ),
              },
              child: const Text(
                'Salvar Ingrediente',
                style: TextStyle(fontSize: 16),
              ),
            )
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}
