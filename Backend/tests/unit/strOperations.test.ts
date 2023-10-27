// import { mock, instance, when, anything } from 'ts-mockito';
import Helper from '../Helper';
import { stripAccents, abbreviate, removePlural, parseToCompare } from '../../src/utils/strOperations';
import http from 'http';

describe('Unit Tests of strOperation.ts utils functions', () => {
  let server: http.Server;

  beforeAll(async () => {
    server = await Helper.getServer(4005);
  });
  afterAll(async () => {
    server.close();
  });

  it('should strip all accets of any letter and be case insensitive', () => {
    const wordsWithAccents = [
      'Açúcar',         // Português
      'Résumé',         // Francês
      'über',           // Alemão // case insensitive
      'Über',           // Alemão
      'Página',         // Espanhol
      'Mañana',         // Espanhol
      'Jalapeño',       // Espanhol
      'Cliché',         // Francês
      'Façade',         // Francês
      'Naïve',          // Francês
      'Voilà',          // Francês
      'Café',           // Francês
      'Übermensch',     // Alemão
      'Schön',          // Alemão
      'Não',            // Português
      'Coração',        // Português
      'Déjà vu',        // Francês
    ];

    const wordsWithoutAccents = [
      'Acucar',         // Português
      'Resume',         // Francês
      'uber',           // Alemão
      'Uber',           // Alemão
      'Pagina',         // Espanhol
      'Manana',         // Espanhol
      'Jalapeno',       // Espanhol
      'Cliche',         // Francês
      'Facade',         // Francês
      'Naive',          // Francês
      'Voila',          // Francês
      'Cafe',           // Francês
      'Ubermensch',     // Alemão
      'Schon',          // Alemão
      'Nao',            // Português
      'Coracao',        // Português
      'Deja vu',        // Francês
    ];

    for (let i = 0; i < wordsWithAccents.length; i++) {
      const strippedWord = stripAccents(wordsWithAccents[i]);
      expect(strippedWord).toBe(wordsWithoutAccents[i]);
    }
  });

  it('should abbreviate all supported unit measures', () => {
    const supportedUnitMeasures = [
      'miligrama', 'grama',
      'quilograma', 'kilograma',
      'mililitro', 'litro',
      'pitada',
      'xícara', 'taça',
      'fatia', 'unidade',
      'dente', 'ramo', 'folha',
    ];

    const abbreviatedSupportedUnitMeasures = [
      'mg', 'g',
      'kg', 'kg',
      'ml', 'l',
      'pit.',
      'xíc.', 'taça',
      'fatia', 'unid.',
      'dente', 'ramo', 'folha',
    ];


    for (let i = 0; i < supportedUnitMeasures.length; i++) {
      const strippedWord = abbreviate(supportedUnitMeasures[i]);
      expect(strippedWord).toBe(abbreviatedSupportedUnitMeasures[i]);
    }
  });

  it('should remove plural of any word while not changing singular words', () => {
    const words = [
      'miligramas', 'gramas', 'quilogramas', 'kilogramas', 'mililitros',
      'litros', 'pitadas', 'colheres de chá', 'colheres de sopa', 'xícaras',
      'taças', 'fatias', 'unidades', 'dentes', 'ramos', 'folhas', 'banana',
      'abacate', 'tomate',
    ];

    const singularWords = [
      'miligrama', 'grama', 'quilograma', 'kilograma', 'mililitro',
      'litro', 'pitada', 'colher de chá', 'colher de sopa', 'xícara',
      'taça', 'fatia', 'unidade', 'dente', 'ramo', 'folha', 'banana',
      'abacate', 'tomate',
    ];


    for (let i = 0; i < words.length; i++) {
      const singularWord = removePlural(words[i]);
      expect(singularWord).toBe(singularWords[i]);
    }
  });

  it('should be able to compare any string value related to ingredient', () => {

    const words = [
      'Miligramas', 'açúcar',
      '200', 'gramas', 'farinha',
      '3', 'quilogramas', 'batata',
      '2', 'xícaras', 'leite',
      '1', 'pitada', 'sal',
    ];

    const comparableWords = [
      'mg', 'acucar',
      '200', 'g', 'farinha',
      '3', 'kg', 'batata',
      '2', 'xic.', 'leite',
      '1', 'pit.', 'sal',
    ];

    for (let i = 0; i < words.length; i++) {
      const comparableWord = parseToCompare(words[i]);
      expect(comparableWord).toBe(comparableWords[i]);
    }
  });

});
