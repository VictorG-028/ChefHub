// import { mock, instance, when, anything } from 'ts-mockito';
import Helper from '../Helper';
import PromptCreator from '../../src/utils/promptCreator';
import http from 'http';


describe('Unit Tests of all PromptCreator methods', () => {
  let server: http.Server;

  beforeAll(async () => {
    server = await Helper.getServer(4004);
  });
  afterAll(async () => {
    server.close();
  });

  it('should create a recipe prompt in array of messages format', () => {
    const ingredients = Helper.generateIngredientExamples(5);
    const preferences = Array.from({ length: 2 }, () => Helper.generatePreference());
    const prompt = PromptCreator.createRecipePrompt(ingredients, preferences);

    expect(prompt).toBeInstanceOf(Array);
    ingredients.forEach((ingredient) => {
      expect(prompt[prompt.length - 1].content).toContain(ingredient.name);
      expect(prompt[prompt.length - 1].content).toContain(ingredient.quantity);
      expect(prompt[prompt.length - 1].content).toContain(ingredient.unit_measure);
    });
    preferences.forEach((preference) => {
      expect(prompt[prompt.length - 1].content).toContain(preference);
    });
  });

  it('should create calories prompt and return in array of messages format', () => {
    const recipeTitle = "Bolo de Chocolate Japonês";
    const prompt = PromptCreator.createShareRecipePrompt(recipeTitle);

    expect(typeof prompt).toBe('string');
    expect(prompt).toContain(recipeTitle);
  });

  it('should create a shared recipe prompt and return a template string', () => {
    const recipeTitle = "Bolo de Chocolate Japonês";
    const prompt = PromptCreator.createShareRecipePrompt(recipeTitle);

    expect(typeof prompt).toBe('string');
    expect(prompt).toContain(recipeTitle);
  });

});
