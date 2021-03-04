import { createElement, Fragment } from 'jsx-dom'

export default function ({ status, small = false }) {
	const statusClass = status === 'accepted' ? 'accepted' : 'rejected'
	return (
		<>
			<div className={`badge ${statusClass}${small ? ' small' : ''}`}>{!small && status}</div>
		</>
	)
}
