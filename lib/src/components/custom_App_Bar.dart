import 'package:flutter/material.dart';

class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final bool showBackButton;

  const CustomAppBar({
    Key? key,
    required this.showBackButton,
  }) : super(key: key);

  @override
  Size get preferredSize => const Size.fromHeight(60);

  @override
  Widget build(BuildContext context) {
    return AppBar(
      leading: showBackButton
          ? IconButton(
              onPressed: () => Navigator.pop(context),
              icon: const Icon(Icons.arrow_back),
            )
          : IconButton(
              onPressed: () {
                // Handle user account icon action
              },
              icon: const Icon(Icons.account_circle_outlined),
              iconSize: AppBar().preferredSize.height - 16,
            ),
      actions: [
        Container(
          padding: const EdgeInsets.all(8.0),
          child: Image.asset(
            'lib/assets/ChefHubIcon.png',
            width: AppBar().preferredSize.height - 16,
            height: AppBar().preferredSize.height - 16,
            fit: BoxFit.contain,
          ),
        ),
      ],
    );
  }
}
