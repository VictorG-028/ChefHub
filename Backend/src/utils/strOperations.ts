import pluralize from 'pluralize';

export function stripAccents(words: string): string {
  const mapAccents = {
    'á': 'a', 'à': 'a', 'ã': 'a', 'â': 'a', 'ä': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'í': 'i', 'ì': 'i', 'î': 'i', 'ï': 'i',
    'ó': 'o', 'ò': 'o', 'õ': 'o', 'ô': 'o', 'ö': 'o',
    'ú': 'u', 'ù': 'u', 'û': 'u', 'ü': 'u',
    'ç': 'c', 'ñ': 'n',
    'Á': 'A', 'À': 'A', 'Ã': 'A', 'Â': 'A', 'Ä': 'A',
    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
    'Í': 'I', 'Ì': 'I', 'Î': 'I', 'Ï': 'I',
    'Ó': 'O', 'Ò': 'O', 'Õ': 'O', 'Ô': 'O', 'Ö': 'O',
    'Ú': 'U', 'Ù': 'U', 'Û': 'U', 'Ü': 'U',
    'Ç': 'C', 'Ñ': 'n',
  };

  return words.split(' ').map((word) => {
    return word.replace(
      /[áàãâäéèêëíìîïóòõôöúùûüçñÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇÑ]/g,
      (matchedSubstring) => {
        return mapAccents[matchedSubstring as keyof typeof mapAccents];
      }
    );
  }).join(' ');
}

export function abbreviate(words: string): string {

  // Function to escape special characters in regex
  function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const supportedUnitMeasures = [
    'miligrama', 'grama',
    'quilograma', 'kilograma',
    'mililitro', 'litro',
    'pitada',
    'colher', 'de',
    'xícara', 'xicara', 'taça',
    'fatia', 'unidade',
    'dente', 'ramo', 'folha',
  ];

  const abbreviatedSupportedUnitMeasures = [
    'mg', 'g',
    'kg', 'kg',
    'ml', 'l',
    'pit.',
    'c', '',
    'xíc.', 'xic.', 'taça',
    'fatia', 'unid.',
    'dente', 'ramo', 'folha',
  ];

  const mapAbbreviations: { [key: string]: string } = {};
  supportedUnitMeasures.forEach((unitMeasure, index) => {
    mapAbbreviations[unitMeasure] = abbreviatedSupportedUnitMeasures[index];
  });

  const pattern = new RegExp(`\\b(${supportedUnitMeasures.join('|')})\\b`, 'g');

  return words.split(' ').map((word) => {
    return word.toLowerCase().replace(pattern, (matchedSubstring) => {
      return mapAbbreviations[matchedSubstring];
    })
  }).join('');
}


export function removePlural(words: string): string {

  const singularWords = words
    .split(' ')
    .map(word => word === "colheres" ? word.slice(0, -2) : word)
    // .map(word => word === "xicaras" ? word.slice(0, -2) : word)
    .map(word => pluralize.singular(word))
    .map(word => word.slice(-1).toLowerCase() === "s" ? word.slice(0, -1) : word)
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
