const en = require('./en.json');
const ptBR = require('./pt-BR.json');
const es = require('./es.json');
const it = require('./it.json');
const de = require('./de.json');
const sr = require('./sr.json');
const el = require('./el.json');
const ro = require('./ro.json');
const hu = require('./hu.json');
const cs = require('./cs.json');

// Add non-English translations here, to test against the English file
const translations = { es, ptBR, it, de, sr, el, ro, hu, cs };

const keyify = (obj, prefix = '') =>
  Object.keys(obj).reduce((res, el) => {
    if (Array.isArray(obj[el])) {
      return res;
    } else if (typeof obj[el] === 'object' && obj[el] !== null) {
      return [...res, ...keyify(obj[el], prefix + el + '.')];
    } else {
      return [...res, prefix + el];
    }
  }, []);

describe('Validate translations', () => {
    const enKeys = keyify(en);
    // Get the list of keys for each localisation file
    const translationKeys = Object.values(translations).map(translation => {
      return keyify(translation);
    });

    // For all translations
    translationKeys.forEach((translation, index) => {
      test('"' + Object.keys(translations)[index] + '" has the same keys as "en"', () => {
        // Check against the english file
        expect(
          enKeys.sort()
        ).toEqual(translation.sort());
      });
  });
});
