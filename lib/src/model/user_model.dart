import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  String _id = "0"; // Initial value

  String get id => _id;

  void setUserId(String newUserId) {
    _id = newUserId;
    notifyListeners();
  }
}
// class User {
//   String _login = '';
//   String _password = '';
//   String _token = '';

//   String get getToken => _token;
//   String get getLogin => _login;
//   String get getPassword => _password;

//   set setToken(String token){
//     _token = token;
//   }
//   set setPassword(String password){
//     _password = password;
//   }
//   set setLogin(String login){
//     _login = login;
//   }
// }

// User usuario = User();

