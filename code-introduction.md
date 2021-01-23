# Code Introduction

## Stack

- React
  - [Redux](https://redux.js.org/)
  - [`i18next`](https://react.i18next.com/)
  - [`react-leaflet`](https://react-leaflet.js.org/)
- [SASS](https://sass-lang.com/)
- [Carto DB (Backend)](https://carto.com/developers/sql-api/)

## Terms

- InfoWindow: The popup window with content about the selected feature.
- Titlebox: The leftmost box.
- Key: May be used to refer to the Titlebox as well.
- Modal: The modal that shows at the beginning.
- Stripeys: River's word for the stripes on expired protections.

## How To

### Leaflet

We use [`react-leaflet`](https://react-leaflet.js.org/) for rendering the map, which has a very good API. The `src/components/Map.js` component initialises the map, passing options from `src/config/map-config.js`, and it renders the map layers once they are loaded.

This library uses components, so we put each layer on the map by looping through the layer data,
creating a Pane and GeoJson component for each layer, and passing the configuration as props to those components. The Pane component is there to handle the Z index.

### i18n

Uses `i18next`. See the docs here: .

In the file `src/utils/i18n.js` there are the options and the function that initialise i18n. Check here when adding a new language that it's included in the available languages. It is initialised in `src/components/App.js`. The application only displays content after the i18n is loaded.

To use it, we use the hook `useTranslation` from `react-i18n`:

```
const { t } = useTranslation();
```

Then, inside of your templates, you can use this function, and pass the path to a translation string.

```
<h2>{ t('modal.title`) }</h2>
```

#### Locales

The translations files are in `src/locale`, the name corresponding to the language code. To change the locale in the browser, use the query param `lang`. Such as: `localhost:8000?lang=pt-BR`.

### Redux

[Redux reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers) are used for handling state that needs to be shared between components. They are split in to files in `/src/reducers` depending on what parts of the application they relate to. The reducers define and update their own states. The provider is mounted in the file `src/index.js`

The state is accessed in each component with the `useSelector` hook.

```js
const infoWindowFeatureProps = useSelector(
  state => state.ui.infoWindowFeatureProps
);
```

Updating the state using the reducer actions is done with `useDispatch`. See the [docs](https://redux.js.org/tutorials/fundamentals/part-4-store#dispatching-actions).

### Carto

Carto is used as the backend for our data. Carto's Query API exposes readonly queries from a PostGIS server.

The queries are in `src/carto/queries.js` and are just SQL queries in template strings.

The `getCartoData` function in `src/carto/api` serialises the query as URL parameters and makes a GET request. The response is a GeoJSON feature collection for the corresponding layer. They are linked to the relevant layer in `map-layers.js`.

Carto is populated through scripts that are connected to Airtable tables, however that's all exposed in the handy query endpoint.

### Config

The `src/config` directory is where you will find constants used around the application, options for configuring the leaflet map, and `map-layers.js`.

#### `map-layers.js`

Contains a list of objects that describe the information about each layer we show on the map. Each object includes things such as GeoJson properties, styling for the layer's features, the i18n key for localising the layer's name, and the z index.

### SASS

Our SASS files generally correspond to HTML elements that they target. They are imported in `src/index.js` where they are loaded using the create-react-app SASS loader.
