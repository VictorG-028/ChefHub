import pluralize from 'pluralize';

export function stripAccents(words: string): string {
  const mapAccents = {
    'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
    'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
    'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c',
    'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A',
    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
    'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
    'Ó': 'O', 'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O',
    'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
    'Ç': 'C'
  };

  return words.replace(
    /[áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇ]/g,
    (matchedSubstring) => {
      return mapAccents[matchedSubstring as keyof typeof mapAccents];
    }
  );
}

export function abbreviate(words: string): string {
  const mapAbbreviations = {
    'miligrama': 'mg', 'grama': 'g', 'quilograma': 'kg', 'kilograma': 'kg',
    'mililitro': 'ml', 'litro': 'l'
  };

  // TODO: aumentar o número de abreviações até ter um mapa grande suficiente

  const pattern = /\b(miligrama|grama|quilograma|kilograma|mililitro|litro)\b/g;
  return words.replace(pattern, (matchedSubstring) => {
    return mapAbbreviations[matchedSubstring as keyof typeof mapAbbreviations];
  });
}


export function removePlural(words: string): string {

  const singularWords = words
    .split(' ')
    .map(word => pluralize.singular(word))
    .join(' ');

  return singularWords;
}

export function parseToCompare(words: string): string {
  return abbreviate(
    removePlural(
      stripAccents(words).toLowerCase()
    )
  );
}
