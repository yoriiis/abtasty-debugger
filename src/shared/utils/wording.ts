import type { Wording } from 'shared/assets/definitions/types.js'

/**
 * Correlation table for key
 * @param {String} key Key to search in the object wordings
 * @returns {String}) Text corresponding to the key or an empty string
 */

export default function (key: string): string {
	const wordings: Wording = {
		url_scope: 'URL',
		favorite_url_scope: 'URL',
		qa_url_parameter_enabled: 'QA URL parameter',
		code_scope: 'Code',
		selector_scope: 'Selector',
		cookie_scope: 'Cookie',
		ip_scope: 'Ip',
		segment: 'Segment',
		trigger: 'Trigger'
	}

	return wordings[key] || ''
}
