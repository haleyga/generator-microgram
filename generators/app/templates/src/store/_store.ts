/**
 * Used to store global state of the app.  Not perfect, but I'm experimenting here ;).
 */
export interface IDataStore {
    containers: { [key: string]: IContainer };

    getContainer(name: string, initializer?: (container: IContainer) => boolean): IContainer;
}

export interface IContainer {
    name: string;
    isInitialized: boolean;
    store: { [key: string]: any };
}

/**
 * Global data store object.  Not exactly "functional" programming, but I'm learning.
 *
 * @type {{}}
 */
const dataStore = {
    _instance: {},
    get instance(): IDataStore {
        if (!this._instance) {
            this._instance = {

                /**
                 * Just hold all the containers here.
                 */
                containers: {},

                /**
                 * Gets a container from the global data store.
                 *
                 * @param {string} name
                 * @param initializer
                 * @returns {IContainer}
                 */
                getContainer: (name: string, initializer?: (container: IContainer) => boolean): IContainer => {

                    // Ensure the container exists.
                    if (!dataStore.hasOwnProperty(name)) {

                        // If not, create it.
                        const store     = {};
                        const container = { name, store, isInitialized: false };

                        // Initialize it.
                        if (initializer) initializer(container);
                        this.containers[name] = container;
                    }

                    // Then, return it.
                    return this.containers[name];
                },
            };
        }

        return this._instance as IDataStore;
    },
};

//tslint:disable
export const DataStore = dataStore.instance;
//tslint:enable

/**
 * Get a value from the data store.
 *
 * @param container
 * @param {string} key
 * @returns {any}
 */
export const getContainerValue = (container: IContainer, key: string): any => {

    // If the data store has the requested key, return the associated value.
    if (container.store.hasOwnProperty(key)) return container.store[key];

    // Return null instead?
    return undefined;
};

/**
 * Put a new value into the data store.  Overwrites are not allowed.
 *
 * @param container
 * @param {string} key
 * @param value
 * @returns {boolean}
 */
export const putContainerValue = (container: IContainer, key: string, value: any): boolean => {

    // If the key already exists, return.
    if (container.store.hasOwnProperty(key)) return false;

    // Otherwise, add the new key/value.
    container.store[key] = value;

    // Indicate success.
    return true;
};

/**
 * Update an existing value in the data store.  This only works on existing keys.
 *
 * @param container
 * @param {string} key
 * @param value
 * @returns {boolean}
 */
export const updateContainerValue = (container: IContainer, key: string, value: any): boolean => {

    // If the key does not exist, return.
    if (!container.store.hasOwnProperty(key)) return false;

    // Otherwise, update the value.
    container.store[key] = value;

    // Indicate success.
    return true;
};
