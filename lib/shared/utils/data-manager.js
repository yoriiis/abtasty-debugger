"use strict";
/**
 * Data manager for ABTasty data
 */
Object.defineProperty(exports, "__esModule", { value: true });
class DataManager {
    constructor({ data }) {
        this.data = data;
        this.testsSortedByStatus = this.getTestsSortedByStatus();
        this.targetingsSortedByStatus = this.getTargetingsSortedByStatus();
    }
    /**
     * Get tests sorted by status (accepted or not)
     * @returns {Object} Sorted tests
     */
    getTestsSortedByStatus() {
        return {
            accepted: Object.keys(this.data.results)
                .filter((id) => this.data.results[id].status === 'accepted')
                .map((id) => {
                this.data.results[id].key = id;
                return this.data.results[id];
            }),
            rejected: Object.keys(this.data.results)
                .filter((id) => this.data.results[id].status !== 'accepted')
                .map((id) => {
                this.data.results[id].key = id;
                return this.data.results[id];
            })
        };
    }
    /**
     * Get targetings sorted by status (success or not)
     * @returns {Object} Sorted targetings
     */
    getTargetingsSortedByStatus() {
        const data = {};
        Object.keys(this.data.results).forEach((id) => {
            const targetings = this.data.results[id].targetings;
            const acceptedTargetPages = Object.keys(targetings.targetPages)
                .filter((targetingKey) => targetings.targetPages[targetingKey].success === true)
                .map((targetingKey) => {
                targetings.targetPages[targetingKey].key = targetingKey;
                return targetings.targetPages[targetingKey];
            });
            const acceptedQaParameters = Object.keys(targetings.qaParameters)
                .filter((targetingKey) => targetings.qaParameters[targetingKey].success === true)
                .map((targetingKey) => {
                targetings.qaParameters[targetingKey].key = targetingKey;
                return targetings.qaParameters[targetingKey];
            });
            const rejectedTargetPages = Object.keys(targetings.targetPages)
                .filter((targetingKey) => targetings.targetPages[targetingKey].success === false)
                .map((targetingKey) => {
                targetings.targetPages[targetingKey].key = targetingKey;
                return targetings.targetPages[targetingKey];
            });
            const rejectedQaParameters = Object.keys(targetings.qaParameters)
                .filter((targetingKey) => targetings.qaParameters[targetingKey].success === false)
                .map((targetingKey) => {
                targetings.qaParameters[targetingKey].key = targetingKey;
                return targetings.qaParameters[targetingKey];
            });
            data[id] = {
                accepted: [...acceptedTargetPages, ...acceptedQaParameters],
                rejected: [...rejectedTargetPages, ...rejectedQaParameters]
            };
        });
        return data;
    }
}
exports.default = DataManager;
