"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Badge template
 * @param {Object} options
 * @param {Object} options.status Badge status (accepted|target_pages_rejected|trigger_rejected|segment_rejected|audience_rejected|qa_parameters_rejected)
 * @returns {HTMLElement} Generated HTML
 */
function default_1({ status }) {
    const statusClass = status === 'accepted' ? 'accepted' : 'rejected';
    return (<>
			<div className={`badge ${statusClass}`}>{status}</div>
		</>);
}
exports.default = default_1;
