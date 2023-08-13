# Recipe Examples to mock backend

### 1 - Exemplo simples

POST http://localhost:3001/create_recipe

- input body
```json
{
 "user_id": "01167b33-078b-4450-ab31-a40197f6f3e7",
 "ingredients": [
  {
   "name": "açucar",
   "quantity": "50",
   "unit_measure": "g"
  },
  {
   "name": "leite",
   "quantity": "2",
   "unit_measure": "L"
  },
  {
   "name": "macarrão parafuso",
   "quantity": "500",
   "unit_measure": "g"
  }
 ],
 "preferences": [
  "prefere culinária italiana",
  "gosta de sabor doce"
 ]
}
```

- output json
```json
{
 "msg": "New recipe created!",
 "recipe_id": 6,
 "title": "Macarrão doce com Leite",
 "ingredients": [
  {
   "recipe_id": 6,
   "name": "Açúcar",
   "quantity": "50",
   "unit_measure": "gramas"
  },
  {
   "recipe_id": 6,
   "name": "Leite",
   "quantity": "2",
   "unit_measure": "Litros"
  },
  {
   "recipe_id": 6,
   "name": "Macarrão Parafuso",
   "quantity": "500",
   "unit_measure": "gramas"
  },
  {
   "recipe_id": 6,
   "name": "Canela em pó",
   "quantity": "a gosto",
   "unit_measure": ""
  }
 ],
 "instructions": [
  "Em uma panela, adicione o leite e o açúcar e deixe ferver em fogo médio.",
  "Adicione o macarrão parafuso e cozinhe até ficar al dente, mexendo de vez em quando.",
  "Escorra o macarrão e reserve um pouco do leite.",
  "Sirva o macarrão doce em pratos individuais, regue com um pouco do leite reservado e polvilhe canela em pó por cima.",
  "Sirva quente e aproveite!"
 ]
}
```

### 2 - Ingredientes sem quantidade e unidade de medida

POST http://localhost:3001/create_recipe

- input body
```json
{
 "user_id": "01167b33-078b-4450-ab31-a40197f6f3e7",
 "ingredients": [
  {
   "name": "açucar",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "leite",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "ovo",
   "quantity": "",
   "unit_measure": ""
  }
 ],
 "preferences": [
  "gosta de sabor doce"
 ]
}
```

- output json
```json
{
	"msg": "New recipe created!",
	"recipe_id": 7,
	"title": "Bolo de Leite Condensado",
	"ingredients": [
		{
			"recipe_id": 7,
			"name": "Açúcar",
			"quantity": "2",
			"unit_measure": "Xícaras de chá"
		},
		{
			"recipe_id": 7,
			"name": "Leite",
			"quantity": "1",
			"unit_measure": "Xícara de chá"
		},
		{
			"recipe_id": 7,
			"name": "Leite Condensado",
			"quantity": "1",
			"unit_measure": "Lata"
		},
		{
			"recipe_id": 7,
			"name": "Ovos",
			"quantity": "3",
			"unit_measure": "unidade"
		}
	],
	"instructions": [
		"Começando com a massa. Em uma tigela, misture os ovos, o açúcar, o leite e o leite condensado. Bata bem até obter uma massa homogênea.",
		"Em uma forma untada, despeje a massa e asse em forno médio (180 ºC) preaquecido por cerca de 40 minutos, ou até que esteja dourado e firme ao toque.",
		"Retire do forno e deixe esfriar antes de desenformar.",
		"Sirva o bolo de leite condensado acompanhado de uma xícara de chá ou café. Bom apetite!"
	]
}
```

### 3 - Muitos ingredientes e sem preferência

POST http://localhost:3001/create_recipe

- input body
```json
{
 "user_id": "01167b33-078b-4450-ab31-a40197f6f3e7",
 "ingredients": [
  {
   "name": "farinha",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "açucar",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "sardinha",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "sushi",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "salmão",
   "quantity": "",
   "unit_measure": ""
  },
  {
   "name": "salsicha",
   "quantity": "",
   "unit_measure": ""
  }
 ],
 "preferences": [
 ]
}
```

- output json
```json
{
	"msg": "New recipe created!",
	"recipe_id": 8,
	"title": "Sushi de Sardinha",
	"ingredients": [
		{
			"recipe_id": 8,
			"name": "Arroz para sushi",
			"quantity": "2",
			"unit_measure": "xícaras"
		},
		{
			"recipe_id": 8,
			"name": "Água",
			"quantity": "2",
			"unit_measure": "xícaras"
		},
		{
			"recipe_id": 8,
			"name": "Vinagre de arroz",
			"quantity": "3",
			"unit_measure": "colheres de sopa"
		},
		{
			"recipe_id": 8,
			"name": "Açúcar",
			"quantity": "1",
			"unit_measure": "colher de sopa"
		},
		{
			"recipe_id": 8,
			"name": "Sal",
			"quantity": "1/2",
			"unit_measure": "colher de chá"
		},
		{
			"recipe_id": 8,
			"name": "Sardinha",
			"quantity": "",
			"unit_measure": ""
		}
	],
	"instructions": [
		"Lave o arroz para sushi em água corrente até que a água saia limpa.",
		"Em uma panela, coloque o arroz e a água e leve ao fogo alto até ferver.",
		"Abaixe o fogo para médio e cozinhe o arroz tampado por 15 minutos.",
		"Enquanto o arroz cozinha, misture o vinagre de arroz, o açúcar e o sal em uma tigela pequena até dissolver.",
		"Após os 15 minutos, desligue o fogo e deixe o arroz descansar por 10 minutos com a panela tampada.",
		"Transfira o arroz para uma tigela grande e adicione a mistura de vinagre, açúcar e sal, mexendo delicadamente para que todos os grãos fiquem bem envolvidos.",
		"Deixe o arroz esfriar completamente antes de utilizar no sushi.",
		"Com o arroz para sushi pronto, monte os sushis: pegue uma folha de alga nori, espalhe uma camada fina e uniforme de arroz sobre ela e coloque uma sardinha no centro.",
		"Enrole cuidadosamente o sushi, selando as pontas com um pouco de água para que fiquem bem fechadas.",
		"Repita o processo até utilizar todo o arroz e as sardinhas.",
		"Corte os rolinhos em pedaços de aproximadamente 2 cm.",
		"Sirva o sushi de sardinha acompanhado de shoyu e wasabi."
	]
}
```
