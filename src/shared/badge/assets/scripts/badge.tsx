import { createElement } from 'jsx-dom'

/**
 * Badge template
 * @param {Object} options
 * @param {Object} options.status Badge status (accepted|target_pages_rejected|trigger_rejected|segment_rejected|audience_rejected|qa_parameters_rejected)
 * @returns {HTMLElement} Generated HTML
 */
export default function ({ status }: { status: string }) {
	const statusClass = status === 'accepted' ? 'accepted' : 'rejected'
	return <div className={`badge ${statusClass}`}>{status}</div>
}
