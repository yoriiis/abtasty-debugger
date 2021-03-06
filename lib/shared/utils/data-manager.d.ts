/**
 * Data manager for ABTasty data
 */
import { Data, TestsSortedByStatus, TargetingsSortedByStatus } from 'shared/assets/interfaces/interfaces';
export default class DataManager {
    data: Data;
    testsSortedByStatus: TestsSortedByStatus;
    targetingsSortedByStatus: TargetingsSortedByStatus;
    constructor({ data }: {
        data: Data;
    });
    /**
     * Get tests sorted by status (accepted or not)
     * @returns {Object} Sorted tests
     */
    getTestsSortedByStatus(): TestsSortedByStatus;
    /**
     * Get targetings sorted by status (success or not)
     * @returns {Object} Sorted targetings
     */
    getTargetingsSortedByStatus(): TargetingsSortedByStatus;
}
