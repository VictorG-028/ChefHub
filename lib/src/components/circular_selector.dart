import 'package:flutter/material.dart';
import 'dart:math';

class UnitSelector extends StatefulWidget {
  const UnitSelector({super.key});
  static const routName = '/teste';

  @override
  State<UnitSelector> createState() => _UnitSelectorState();
}

class _UnitSelectorState extends State<UnitSelector> {
  List<String> units = [
    'kg',
    'mg',
    'g',
    'unit',
    'unit',
    'unit',
    'unit',
    'unit',
    'unit',
    'unit',
  ];
  int selectedIndex = 0;

  void _selectUnit(int index) {
    setState(() {
      selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double itemSize = screenWidth * 0.07;
    double circleRadius = screenWidth * 0.3;
    int unitDivider = (units.length * 0.6).toInt();

    return Stack(
      alignment: Alignment.center,
      children: [
        _buildSelector(circleRadius, itemSize, 0, unitDivider),
        _buildSelector(
            circleRadius * 0.6, itemSize, unitDivider, units.length),
      ],
    );
  }

  Widget _buildSelector(
      double circleRadius, double itemSize, int initialUnit, int lastUnit) {
    return Container(
      width: circleRadius * 2,
      height: circleRadius * 2,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: Colors.grey.withOpacity(0.3),
      ),
      child: Stack(
        alignment: Alignment.center,
        children: [
          for (int i = initialUnit; i < lastUnit; i++)
            Positioned(
              top: circleRadius -
                  itemSize / 2 +
                  (circleRadius - itemSize) *
                      sin(2 *
                          pi *
                          (i - initialUnit) /
                          (initialUnit - lastUnit)),
              left: circleRadius -
                  itemSize / 2 +
                  (circleRadius - itemSize) *
                      cos(2 *
                          pi *
                          (i - initialUnit) /
                          (initialUnit - lastUnit)),
              child: GestureDetector(
                onTap: () => _selectUnit(i),
                child: _buildItem(itemSize, i),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildItem(double itemSize, int index) {
    return Container(
      width: itemSize,
      height: itemSize,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        color: selectedIndex == index ? Colors.blue : Colors.grey,
      ),
      child: Center(
        child: Text(
          units[index],
          style: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
