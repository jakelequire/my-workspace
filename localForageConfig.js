import localForage from 'localforage';

// Configure localForage
const config = {
    driver: localForage.INDEXEDDB, // Use IndexedDB first if available
    name: 'Local DB',
    storeName: 'myAppStore', // Should be alphanumeric, with underscores.
    description: 'My app data storage',
};

localForage.config(config);

export default localForage;
