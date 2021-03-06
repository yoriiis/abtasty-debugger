import { Test, TargetingItemSortedByStatus } from 'shared/assets/interfaces/interfaces';
/**
 * Detail template
 * @param {Object} options
 * @param {String} options.id Test id
 * @param {StriObjectng} options.result Test data
 * @param {Object} options.targetingSorted Test data sorted by accepted and
 * @param {String} options.targetingMode Targeting mode (fastest|waituntil)
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ id, result, targetingSorted, targetingMode }: {
    id: string;
    result: Test;
    targetingSorted: TargetingItemSortedByStatus;
    targetingMode: string;
}): HTMLElement | SVGElement;
