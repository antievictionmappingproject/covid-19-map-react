# COVID-19 Emergency Tenants Protections Map

Mapping cities, counties, states, and countries that are enacting emergency tenant protections due to the COVID-19 pandemic, and where housing justice actions are taking place.

## Data Source

Data sourcing and maintenance is being provided by the [Anti-Eviction Mapping Project](https://www.antievictionmap.com/).

**DISCLAIMER:** This data is by no means perfect or exhaustive of all emergency tenant protection policies. It has been crowdsourced and is maintained by a team of dedicated volunteers. If you notice something missing or incorrect in the data, please [reach out to us](mailto:antievictionmap@riseup.net) to let us know so we may update it accordingly! The AEMP recognizes that we are mapping Indigenous lands that have been stolen, colonized, divided, and renamed. We have depicted colonial and nation-state geographies because tenant protection legislation exists within these borders. Our goal is to pay our respect to the original stewards of the land by using Indigenous names, whenever a third-part service that we depend on allows us to implement this modification.

## Development Environment

### Setup

Getting this project running locally requires that:

1. You are comfortable running programs on the [CLI](https://en.wikipedia.org/wiki/Command-line_interface) such as the [Terminal](https://support.apple.com/guide/terminal/welcome/mac) program on MacOS.

2. You have installed [NodeJS](https://nodejs.org/en/) >= `v10.13` and [NPM](https://www.npmjs.com/) >= `6.4` (NPM should automatically be installed with NodeJS). Older versions of any of these may or may not work.

After installing Node.js and cloning the repo, navigate to the root of the project directory and run `npm i` to install all dependencies. Now you are ready to get started. See the next section for the commands used in development.

### Development commands

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which provides the following commands. See `package.json` for all commands.

#### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Using `<iframe>`

When embedding this website with an `<iframe>`, the settings of the map can be configured with URL hash values. The available params are as follows:

```
/#lat=<float>&lng=<float>&z=<integer>&states=<boolean>&cities=<boolean>&counties=<boolean>&rentstrike=<boolean>
```

## Translations

To add translations:

1. Copy the file `src/locale/en.json`
2. Rename the file to using the [IETF language tag standard](https://gist.github.com/traysr/2001377) followed by `.json`. For example: `de.json`
3. Replace the existing text with the translated text.

- Do not change the keys. For example `{"do-not-change": "This text should be changed"}`

**Optional: implement the translation**
If you're comfortable with javascript, you can also add the language to the i18n configuration.

4. Add the language code to the value of `languages` in the file `src/utils/constants.js`. For example: `const languages = ['en', 'pt-BR', 'es-MX']`
5. Add the following to the file `src/locale/index.js`, substituting `de` for the language code you are working with:

```js
// In imports
import de from './de.json'

// Inside of the exported object
de: {
  translation: de,
},
```

6. To validate that you have all the correct keys in your language file:

- Add your locale to the test file, `locale/locale.test.js`, by importing at the top of the file, and adding it to the `translations` object.
- Run `npm run test`. If there are any missing or extra keys, you will see an error which informs you which key and language is the issue.

7. To check that your new language works, run the development environment, and add `?lang=<your-lang>` to the url. Make sure that all the expected text is displayed as expected.

Thank you for contributing!
