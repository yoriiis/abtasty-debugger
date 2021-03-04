import { createElement, Fragment } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Badge from 'shared/badge/assets/scripts/badge'

export default function ({ data }) {
	return (
		<>
			<ul className="list" data-route-id="list">
				{Object.keys(data).map((key, index) => {
					const listItem = data[key]
					return (
						<>
							<li className={`list-item${index !== null ? ' active' : ''}`}>
								<a href={`#view/${key}`} className="list-link">
									<span className="list-name">{listItem.name}</span>
									<Badge status={listItem.status} />
									<div className="list-icon" innerHTML={arrowBottom}></div>
								</a>
							</li>
						</>
					)
				})}
			</ul>
		</>
	)
}
