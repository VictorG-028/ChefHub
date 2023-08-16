import 'package:flutter/material.dart';

class CustomTextFormField extends StatelessWidget {
  final String fieldTitle;
  final bool isObscure;
  final String label;
  final IconData? icon;
  final String? Function(String?)? validator;
  final TextEditingController? textController;

  const CustomTextFormField(
      {super.key,
      required this.fieldTitle,
      this.validator,
      this.isObscure = false,
      required this.label,
      this.icon,
      this.textController});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 20, right: 20, top: 15),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            fieldTitle,
            style: const TextStyle(
                color: Color.fromARGB(255, 82, 82, 92), fontSize: 18),
          ),
          const SizedBox(height: 5),
          TextFormField(
            controller: textController,
            obscureText: isObscure,
            validator: validator,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              enabledBorder: const OutlineInputBorder(
                borderSide: BorderSide(
                  color: Color.fromARGB(255, 217, 217, 217),
                  width: 2,
                ),
              ),
              focusedBorder: const OutlineInputBorder(
                borderSide: BorderSide(
                  color: Color.fromARGB(255, 217, 217, 217),
                  width: 2,
                ),
              ),
              prefixIcon: Icon(icon),
              labelText: label,
              isDense: true,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          )
        ],
      ),
    );
  }
}
