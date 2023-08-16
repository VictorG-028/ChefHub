import 'package:chefhub/src/components/custom_App_Bar.dart';
import 'package:flutter/material.dart';

class RecipesPreferencesPage extends StatefulWidget {
  const RecipesPreferencesPage({super.key});
  static const routeName = '/recipesPreferences';

  @override
  State<RecipesPreferencesPage> createState() => _RecipesPreferencesPageState();
}

class _RecipesPreferencesPageState extends State<RecipesPreferencesPage> {
  static const double _separator = 20;
  final List<bool> _selectedCulinary = List.generate(10, (index) => false);
  final List<bool> _selectedRules = List.generate(2, (index) => false);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const CustomAppBar(showBackButton: true),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 30),
            const Padding(
              padding: EdgeInsets.only(left: 20),
              child: Text(
                'Tipos de culinária',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: _separator),
            Container(
              color: const Color(0xFFD9D9D9),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 30,
                      mainAxisSpacing: 30,
                      mainAxisExtent: 60),
                  itemCount: _selectedCulinary.length,
                  shrinkWrap: true,
                  itemBuilder: (BuildContext context, int index) {
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedCulinary[index] = !_selectedCulinary[index];
                        });
                      },
                      child: Container(
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                            color: _selectedCulinary[index]
                                ? const Color(0XFFF0A78F)
                                : const Color(0XFF645151),
                            borderRadius: BorderRadius.circular(32)),
                        child: Text(
                          'culinária $index',
                          style: TextStyle(
                            color: _selectedCulinary[index]
                                ? const Color(0XFF000000)
                                : const Color(0XFFFFFFFF),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 30),
            const Padding(
              padding: EdgeInsets.only(left: 20),
              child: Text(
                'Regras da receitas',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: _separator),
            Container(
              color: const Color(0xFFD9D9D9),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: GridView.builder(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: 30,
                      mainAxisSpacing: 30,
                      mainAxisExtent: 60),
                  itemCount: _selectedRules.length,
                  shrinkWrap: true,
                  itemBuilder: (BuildContext context, int index) {
                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          _selectedRules[index] = !_selectedRules[index];
                        });
                      },
                      child: Container(
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                            color: _selectedRules[index]
                                ? const Color(0XFFF0A78F)
                                : const Color(0XFF645151),
                            borderRadius: BorderRadius.circular(32)),
                        child: Text(
                          'regra $index',
                          style: TextStyle(
                            color: _selectedRules[index]
                                ? const Color(0XFF000000)
                                : const Color(0XFFFFFFFF),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            )
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        height: 60,
        child: Container(
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: Color(0xFFF47A72),
          ),
          child: IconButton(
            onPressed: () =>
                Navigator.pushNamed(context, '/loadingPage'),
            icon: const Icon(Icons.arrow_forward,
                color: Color(0xFFFFFFFF), size: 30),
          ),
        ),
      ),
    );
  }
}
