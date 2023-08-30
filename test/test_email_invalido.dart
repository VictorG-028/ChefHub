// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:chefhub/src/View/login_page_view.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Login Widget Test', (WidgetTester tester) async {
    // Constroi o widget de login
    await tester.pumpWidget(const MaterialApp(home: LoginPage()));

    // Verifica se os campos de texto e o botão estão presentes
    expect(find.byKey(const Key('email_field')), findsOneWidget);
    expect(find.byKey(const Key('password_field')), findsOneWidget);
    expect(find.byKey(const Key('login_button')), findsOneWidget);

    // Simula a entrada de texto nos campos de email e senha
    await tester.enterText(find.byKey(const Key('email_field')), 'seu_emailexample');
    await tester.enterText(find.byKey(const Key('password_field')), 'sua_senha_secreta');

    // simula um toque no botão de login
    await tester.tap(find.byKey(const Key('login_button')));

    // Aguarda a reconstrução do widget após a interação
    await tester.pump();

    final errorText = find.text('Email inválido');
      expect(errorText, findsOneWidget);
  });
}
