import queryString from 'query-string';

const defaultMapConfig = {
    lat: 45.356488,
    lng: 12.771901,
    z: 3,
    bounds: [
        [-85.05, -220], // lower left
        [85.05, 230], // upper right
    ],
    // Default status of layers
    nations: true,
    states: true,
    cities: true,
    counties: true,
    rentStrikes: true,
};

// Returns the default config combined with any overrides set in the URL string
export default () => {
    // Get any hash values from the URL
    const parsedHash = queryString.parse(window.location.hash, {
        parseBooleans: true,
    });

    return {
        ...defaultMapConfig,
        // Merge URL hash values to the default values
        ...Object.entries(parsedHash).reduce((acc, [key, value]) => {
            if (key) return {
                [key]: value, ...acc };
            return acc;
        }, {}),
    };
};