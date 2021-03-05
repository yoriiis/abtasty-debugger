import { createElement } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Badge from 'shared/badge/assets/scripts/badge'

export default function ({ data }) {
	const results = data.results
	return (
		<div data-route-id="list">
			<ul className="list" data-route-id="list">
				{Object.keys(results).map((id, index) => {
					const listItem = results[id]
					return (
						<li className={`list-item${index !== null ? ' active' : ''}`}>
							<a href={`#view/${id}`} className="list-link">
								<span className="list-name">{listItem.name}</span>
								<Badge status={listItem.status} />
								<div className="list-icon" innerHTML={arrowBottom}></div>
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
