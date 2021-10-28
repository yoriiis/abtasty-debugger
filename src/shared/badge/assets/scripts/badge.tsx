import { createElement } from 'jsx-dom'

/**
 * Badge template
 * @param {Object} options
 * @param {Object} options.text Badge text (accepted|target_pages_rejected|trigger_rejected|segment_rejected|audience_rejected|qa_parameters_rejected)
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ text, color = 'green' }: { text: string; color: string }) {
	return <div className={`badge ${color}`}>{text}</div>
}
