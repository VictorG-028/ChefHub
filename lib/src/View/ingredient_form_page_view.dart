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
      appBar: const CustomAppBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            const CustomTextFormField(
              fieldTitle: 'Nome do ingrediente',
              label: 'Escreva o nome aqui',
            ),
            const CustomTextFormField(
              fieldTitle: 'Quantidade',
              label: 'Ex.: 1/2',
            ),
            const SizedBox(height: 10),
            const UnitSelector(),
            const SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Salvar alterações'),
            )
          ],
        ),
      ),
    );
  }
}
