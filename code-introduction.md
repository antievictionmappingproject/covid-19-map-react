# Code Introduction

## Stack

- React
  - Redux
  - i18next
  - `react-leaflet`
- S

## Features

### i18n

Uses `i18next`. See the docs here: .

In the file `src/utils/i18n.js` there are the options and the function that initialise i18n. This function also makes sure that the `react-i18next` hooks work properly. It is initialised in `src/components/App.js`. The application only displays content after the i18n is loaded.

To use it, we use the hook `useTranslation` from `react-i18n`:

```
const { t } = useTranslation();
```

Then, inside of your templates, you can use this function, and pass the path to a translation string.

```
<h2>{t('modal.title`)}</h2>
```
