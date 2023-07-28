class User {
  String _login = '';
  String _password = '';
  String _token = '';

  String get getToken => _token;
  String get getLogin => _login;
  String get getPassword => _password;

  set setToken(String token){
    _token = token;
  }
  set setPassword(String password){
    _password = password;
  }
  set setLogin(String login){
    _login = login;
  }
}

User usuario = User();