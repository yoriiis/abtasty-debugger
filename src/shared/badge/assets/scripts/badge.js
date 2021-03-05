import { createElement, Fragment } from 'jsx-dom'

export default function ({ status }) {
	const statusClass = status === 'accepted' ? 'accepted' : 'rejected'
	return (
		<>
			<div className={`badge ${statusClass}`}>{status}</div>
		</>
	)
}
