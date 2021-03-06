import { Targeting } from 'shared/assets/interfaces/interfaces';
/**
 * Targeting template
 * @param {Object} options
 * @param {String} options.testStatus Status of the test
 * @param {Object} options.data Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ testStatus, data, headerOnly, textarea }: {
    testStatus: string;
    data: Targeting;
    headerOnly: Boolean;
    textarea: Boolean;
}): HTMLElement | SVGElement;
