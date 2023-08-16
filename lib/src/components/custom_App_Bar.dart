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
              icon:  Icon(Icons.arrow_back, color: const Color(0xFFFFFFFF),size: AppBar().preferredSize.height - 16 ),
            )
          : IconButton(
              onPressed: () => Scaffold.of(context).openDrawer(),
              icon: const Icon(Icons.menu),
              iconSize: AppBar().preferredSize.height - 16,
            ),
      centerTitle: true,
      title: Container(
        padding: const EdgeInsets.all(8.0),
        child: Image.asset(
          'lib/assets/ChefHubIcon.png',
          width: AppBar().preferredSize.height - 16,
          height: AppBar().preferredSize.height - 16,
          fit: BoxFit.contain,
        ),
      ),
    );
  }
}
