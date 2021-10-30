import { createElement } from 'jsx-dom'

/**
 * Badge template
 * @param {Object} options
 * @param {Object} options.text Badge text
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ text, color = 'green' }: { text: string; color: string }) {
	return <div className={`badge ${color}`}>{text}</div>
}
