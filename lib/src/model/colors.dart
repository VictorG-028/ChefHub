import 'package:flutter/material.dart';

MaterialColor getMaterialColor(Color color){
  final red = color.red;
  final green = color.green;
  final blue = color.blue;
  final alpha = color.alpha;
  Map<int, Color> shade =
{
50:Color.fromARGB(alpha,red,green,blue),
100:Color.fromARGB(alpha,red,green,blue),
200:Color.fromARGB(alpha,red,green,blue),
300:Color.fromARGB(alpha,red,green,blue),
400:Color.fromARGB(alpha,red,green,blue),
500:Color.fromARGB(alpha,red,green,blue),
600:Color.fromARGB(alpha,red,green,blue),
700:Color.fromARGB(alpha,red,green,blue),
800:Color.fromARGB(alpha,red,green,blue),
900:Color.fromARGB(alpha,red,green,blue),
};
  return MaterialColor(color.value, shade);
} 

