# :computer: Code Examples

## :arrows_counterclockwise: Using Axios

Observação: uma alternativa ao Axios é a função `fetch` built-in do JavaScript.

```bash
npm instal axios
```

- [Documentação oficial](https://axios-http.com/docs/post_example) com exemplo de POST request
```javascript
// Exemplo modificado para criar receita no ChefHub-Backend
axios.post('http://localhost:3001/create_recipe', 
  {
    user_id: "01167b33-078b-4450-ab31-a40197f6f3e7",
      ingredients: [
        { name: "açúcar", quantity: "50", unit_measure: "g" },
        { name: "leite", quantity: "2", unit_measure: "L" },
        { name: "macarrão parafuso", quantity: "500", unit_measure: "g" }
      ],
      preferences: [
        "prefere culinária italiana",
        "gosta de sabor doce"
      ]
  }
).then(function (raw_response) {
  // 'raw_response' provavelmente é uma string JSON com a resposta do servidor
  // talvez seja necessário fazer o parse do JSON
  const response JSON5.parse(raw_response)
  console.log(response);

  // msg eh um dos atributos retornado pelo servidor
  // Confira os nomes dos atributos de cada rota no requests.md
  console.log(response.data.msg); 

}).catch(function (error) {
  console.log(error);
});
```
- [Outro site](https://rapidapi.com/guides/request-body-axios#step-3-set-request-body) com exemplo diferente de POST request usando axios
```javascript
// Exemplo modificado para criar receita no ChefHub-Backend
const axios = require('axios');

const options = {
  method: 'POST',
  url: 'http://localhost:3001/create_recipe',
  headers: {
    'content-type': 'application/json',
  },
  data: {
    user_id: "01167b33-078b-4450-ab31-a40197f6f3e7",
    ingredients: [
      { name: "açúcar", quantity: "50", unit_measure: "g" },
      { name: "leite", quantity: "2", unit_measure: "L" },
      { name: "macarrão parafuso", quantity: "500", unit_measure: "g" }
    ],
    preferences: [
      "prefere culinária italiana",
      "gosta de sabor doce"
    ]
  }
};

axios.request(options)
  .then(function (raw_response) {
    // 'raw_response' provavelmente é uma string JSON com a resposta do servidor
    // talvez seja necessário fazer o parse do JSON
    const response JSON5.parse(raw_response)
    console.log(response.data);

    // msg eh um dos atributos retornado pelo servidor
    // Confira os nomes dos atributos de cada rota no requests.md
    console.log(response.data.msg); 

  }).catch(function (error) {
      console.error(error);
  });
```

## :arrows_counterclockwise: Using HTTPS flutter module

```bash
flutter pub add http
```

If you develop for android, add the following permission inside the manifest tag in the AndroidManifest.xml file located at android/app/src/main.
```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

```dart
// Exemplo criado para exemplificar como criar receita no ChefHub-Backend
import 'package:http/http.dart' as http;

Future<void> _createRecipe() async {

    // ipconfig é o comando no terminal windows para ver ip
    final url = "http://localhost:3001/create_recipe";
    final url_com_ip = "http://192.168.1.115:3001/create_recipe";

    // Talvez precise utilizar url_com_ip em vez de url
    final raw_response = await http.post(
      Uri.parse(url),
      headers: <String, String>{'content-type': 'application/json;'},
      body: jsonEncode(<String, dynamic>{
        'user_id': "01167b33-078b-4450-ab31-a40197f6f3e7",
        'ingredients': [
          {'name': "açúcar", 'quantity': "50", 'unit_measure': "g"},
          {'name': "leite", 'quantity': "2", 'unit_measure': "L"},
          {
            'name': "macarrão parafuso",
            'quantity': "500",
            'unit_measure': "g"
          }
        ],
        'preferences': [
          "prefere culinária italiana",
          "gosta de sabor doce"
        ]
      })
    );

    final response = jsonDecode(raw_response.body);

    final msg = response["msg"].toString();
    print(msg);

    final recipe_id = int.parse(response["recipe_id"]);
    final title = response["title"].toString();
    final ingredients = response["ingredients"]; // tipo é 'array de object'
    final instructions = response["instructions"]; // tipo é 'array de String'

    if (response.statusCode == 200) {
      setState(() {
        // Modifica o state do widget dono do botão que chamou essa função
        _recipe_id = recipe_id;
        _title = _title;
        _ingredients = ingredients;
        _instructions = instructions;
      });
    } else {
      setState(() {
        _recipe_id = -1;
        _title = "Falha ao tentar fetch http://localhost:3333/connections";
        _ingredients = {};
        _instructions = ["Falha ao tentar fetch http://localhost:3333/connections"];
      });
      // throw Exception('Failed to load connections API');
    }
  }
```

```dart
// Exemplo criado para exemplificar como pegar todas as receitas compartilhadas
import 'package:http/http.dart' as http;

Future<void> _getSharedRecipe() async {

    // ipconfig é o comando no terminal windows para ver ip
    final url = "http://localhost:3001/get_shared_recipes";
    final url_com_ip = "http://192.168.1.115:3001/get_shared_recipes";

    // Talvez precise utilizar url_com_ip em vez de url
    final raw_response = await http.get(Uri.parse(url));

    final response = jsonDecode(raw_response.body);

    final msg = response["msg"].toString();
    print(msg);

    // sharedRecipesData é 'array de object'
    final sharedRecipesData = response["sharedRecipesData"]

    if (response.statusCode == 200) {
      setState(() {
        // Modifica o state do widget dono do botão que chamou essa função
        _sharedRecipesData = sharedRecipesData;
      });
    } else {
      setState(() {
        _sharedRecipesData = {};
      });
    }
  }
```
