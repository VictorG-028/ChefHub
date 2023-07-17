// TODO: refatorar para deixar a lógica de preencher os prompts aqui
// tirar as strings grandes do prompt das outras partes do codigo minimiza bastante o que precisa ser lido

import { Ingredient } from "../beans/Ingredient";


export default class PromptCreator {

  static createRecipePrompt(ingredients: Ingredient[], preferences: string[]): string {
    const ingredientNames = ingredients.map((ingredient) => {
      return ingredient.name
    });
    const ingredientToInject: string = `["${ingredientNames.join('", "')}"]`;

    const previous = `User: escreva exemplos ingredientes na formatação {{ nome, [quantidade(opcional) UM(opcional)] }}\n
    Response: Abacate [1 unidade]; Suco de Uva;  Chocolate em barra [75 gramas]; Sal [A gosto]; Açucar; Cenoura Ralada [5 gramas]; Água [150 ml]; Corante Azul;\n
    User: Agora que você sabe a formatação dos ingredientes, tente responder ao pedido abaixo.\n
    Response: estou aguardando o pedido.\n
    \n`;

    const template_prompt = `${previous}
    User: Você é um chef de cozinha renomado que fornece receitas que qualquer pessoa conseguiria fazer. Seu trabalho é levar em consideração os ingredientes e preferências do cliente e gerar uma receita bem detalhada composta de nome, ingredientes e instrução. Você pode acrescentar ou não utilizar ingredientes do cliente. Não acrescente comentários antes da receita e nem depois das instruções.\n
    \n
    Considere lista de ingredientes = ${ingredientToInject}\n
    O cliente não gosta de guaca mole, gosta de comida japonesa.\n
    \n
    Nome da receita {{insira nome aqui}}\n
    \n
    Ingredientes:
    \n
    - {{Preencha os ingredientes aqui}}\n
    \n
    Instruções:\n
    \n
    1. {{Preencha instruções aqui}}`;

    return template_prompt;
  }

  static createCaloriesPrompt(ingredients: Ingredient[]): string {

    const ingredientNames = ingredients
      .map((ingredient) => { return '- ' + ingredient.name + '\n' })
      .reduce((previus, current) => { return previus + current });

    const template_prompt = `Você é uma calculadora de caloria de qualquer ingrediente. Para realizar suas tarefas, preencha os campos abaixo com poucas palavras:\n
    \n
    Exemplo\n
    - Nome_do_ingrediente  <Quantidade opcional do ingrediente> {{Preencha caloria aqui}}\n
    - Macarrão, 371 calorias (por 100g)\n
    \n
    \n
    Ingredientes:\n
    ${ingredientNames}
    \n
    Ingredientes com caloria:\n
    -`;

    return template_prompt;
  }

  static createShareRecipePrompt(recipe_title: string): string {

    const template_prompt = `${recipe_title}, one color vanilla background`;

    return template_prompt;
  }
}
