import { TestsSortedByStatus } from 'shared/assets/interfaces/interfaces';
/**
 * List template
 * @param {Object} options
 * @param {Object} options.data List data
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ data }: {
    data: TestsSortedByStatus;
}): HTMLElement | SVGElement;
