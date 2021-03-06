import { Event, Data } from 'shared/assets/interfaces/interfaces';
export default class Popup {
    data: Data | null;
    currentRoute: null | string;
    previousRoute: null | string;
    defaultRoute: string;
    stepCreated: Boolean;
    app: Element;
    dataManager: any;
    templates: {
        empty: Function;
        list: Function;
        detail: Function;
    };
    constructor({ data }: {
        data: Data;
    });
    /**
     * Initialize the popup
     */
    init(): void;
    /**
     * Get the current route
     * @returns {String} Current route
     */
    getRoute(): string;
    /**
     * Set the route
     */
    setRoute(route: string): void;
    /**
     * On hash change event listener
     * @param {Obhect} e Event data
     */
    hashChanged(e?: Event): void;
    /**
     * Get the previous route
     * @param {Object} event Event listener datas
     * @returns {String} Previous route
     */
    getPreviousRoute(e: Event): string | null;
    /**
     * Destroy step
     * @param {String} route Route of the step to destroy
     */
    destroyStep(route: string): void;
    /**
     * Create step
     * @param {String} route Route of the step to create
     */
    createStep(route: string): void;
    /**
     * Get the current route section (view/000001 => view)
     * @param {String} route Route
     * @returns {String} Current route section
     */
    getRouteSection(route: string): string;
    /**
     * Get id from route
     * @param {String} route  Route
     * @returns {String} Detail id
     */
    getIdFromRoute(route: string | null): string | null;
    /**
     * Add event listeners
     */
    addEvents(): void;
    /**
     * On click event listener on the app
     * @param {Object} e Event data
     */
    onClickOnApp(e: Event): void;
    /**
     * Toggle targeting content
     * @param {Object} e Event data
     */
    toggleTageting(e: Event): void;
}
