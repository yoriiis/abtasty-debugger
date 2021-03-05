export default function (key) {
	const wordings = {
		url_scope: 'URL',
		code_scope: 'Code',
		selector_scope: 'Selector',
		cookie_scope: 'Cookie',
		ip_scope: 'Ip'
	}

	return wordings[key] || ''
}
