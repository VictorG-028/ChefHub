import { ChatCompletionRequestMessage } from "openai";
import Ingredient from "../beans/Ingredient";
import InventoryIngredient from "../beans/InventoryIngredient";
import RecipeIngredient from "../beans/RecipeIngredient";


export default class PromptCreator {

  static createRecipePrompt(
    ingredients: InventoryIngredient[],
    preferences: string[],
    shouldConcatenatePrompt = false
  ): ChatCompletionRequestMessage[] {

    const ingredientsToInject: string = ingredients.map((i) => {
      return `{"nome": ${i.name}, "quantidade": ${i.quantity}, "unidade_de_medida": ${i.unit_measure}}\n`
    }).join(",");

    const preferencesToInject: string = preferences.map((p) => {
      return `"${p}"`;
    }).join(",\n");

    const user_1 = "escreva exemplos de componentes na formatação JSON";
    const system_1 = `{
      [
        {"nome": "Abacate", "quantidade": "1", "unidade_de_medida": "unidade"},
        {"nome": "Suco de Uva", "quantidade": "", "unidade_de_medida": ""},
        {"nome": "Chocolate em barra", "quantidade": "75", "unidade_de_medida": "gramas"},
        {"nome": "Sal", "quantidade": "A gosto", "unidade_de_medida": ""},
        {"nome": "Açucar", "quantidade": "", "unidade_de_medida": ""},
        {"nome": "Cenoura Ralada", "quantidade": "5", "unidade_de_medida": "gramas"},
        {"nome": "Água", "quantidade": "150", "unidade_de_medida": "ml"},
        {"nome": "Corante Azul", "quantidade": "", "unidade_de_medida": ""},
      ]
    }
    `;
    const user_2 = "Agora que você sabe a formatação dos componentes, escrever uma receita em formato JSON (nome, componentes e passos).";
    const system_2 = `{
      "nome": "Bolo de Chocolate",
      "componentes": [ 
        {"nome": "Ovos", "quantidade": "4", "unidade_de_medida": "unidade"},
        {"nome": "Manteiga", "quantidade": "4", "unidade_de_medida": "Colheres de sopa"},
        {"nome": "Açúcar", "quantidade": "5", "unidade_de_medida": "Xícaras de chá"},
        {"nome": "Leite", "quantidade": "1", "unidade_de_medida": "Xícara de chá"},
        {"nome": "Chocolate em Pó", "quantidade": "11", "unidade_de_medida": "Colheres de sopa"},
        {"nome": "Farinha de trigo", "quantidade": "3", "unidade_de_medida": "Xícaras de chá"},
        {"nome": "Fermento", "quantidade": "2", "unidade_de_medida": "Colheres de sopa"},
        {"nome": "Creme de leite com soro", "quantidade": "2", "unidade_de_medida": "Latas"},
      ],
      "passos": [
        "Começando com a massa. Em um liquidificador adicione 4 ovos,  4 colheres de chocolate em pó, 2 colheres de manteiga, 3 xícaras de farinha de trigo, 2 xícaras de açucar e o leite, depois bata por 5 minutos.",
        "Adicione o fermento e misture com uma espátula delicadamente.",
        "Em uma forma untada, despeje a massa e asse em forno médio (180 ºC) preaquecido por cerca de 40 minutos. Não se esqueça de usar uma forma alta para essa receita: como leva duas colheres de fermento, ela cresce bastante! Outra solução pode ser colocar apenas uma colher de fermento e manter a sua receita em uma forma pequena.",
        "Acrescente o creme de leite e misture bem até obter uma consistência cremosa.",
        "Seguindo com a calda. Em uma panela, aqueça a manteiga e misture o chocolate em pó até que esteja homogêneo.",
        "Desligue o fogo e acrescente o açúcar."
      ]
    }`;

    const user_3 = `Agora que você sabe a formatação nome, componentes e passos, tente responder ao pedido abaixo em formatação JSON. Você é um chef de cozinha renomado que fornece (nome, componentes e passos) em JSON que qualquer pessoa conseguiria fazer. Seu trabalho é levar em consideração os componentes e preferências do cliente e gerar (nome, componentes e passos) composta de nome, componentes e passos. Você pode acrescentar ou não utilizar componentes do cliente.
      {
      "componentes_do_cliente":  [
      ${ingredientsToInject}
      ]
      "preferências_do_cliente": [
      ${preferencesToInject}
      ]
      }
      
      sem comentários extras, apenas preencha (nome, componentes e passos) abaixo
      {
        "nome": {{preencha aqui}},
        "componentes": [
        {{preencha aqui}}
        ],
        "passos": [
        {{preencha aqui}}
        ]
      }`;

    const concatenatedPrompt = `User: ${user_1}
      Response: ${system_1}
      User: ${user_2}
      Response: ${system_2}
      User: ${user_3}
    `;

    const messages: ChatCompletionRequestMessage[] = shouldConcatenatePrompt
      ? [
        { role: "user", content: concatenatedPrompt }
      ]
      : [
        { role: "user", content: user_1 },
        { role: "system", content: system_1 },
        { role: "user", content: user_2 },
        { role: "system", content: system_2 },
        { role: "user", content: user_3 },
      ];

    return messages;
  }

  // InventoryIngredient[] | RecipeIngredient[]
  static createCaloriesPrompt(ingredients: Ingredient[]): string {

    const ingredientNames = ingredients
      .map((ingredient) => { return '- ' + ingredient.name + '\n' })
      .reduce((previus, current) => { return previus + current });

    const template_prompt = `Você é uma calculadora de caloria de qualquer ingrediente. Para realizar suas tarefas, preencha os campos abaixo com poucas palavras:
    
    Exemplo
    - Nome_do_ingrediente  <Quantidade opcional do ingrediente> {{Preencha caloria aqui}}
    - Macarrão, 371 calorias (por 100g)
    
    
    Ingredientes:
    ${ingredientNames}
    
    Ingredientes com caloria:
    -`;

    return template_prompt;
  }

  static createShareRecipePrompt(recipe_title: string): string {

    const template_prompt = `${recipe_title}, one color vanilla background, table underneath`;

    return template_prompt;
  }
}
