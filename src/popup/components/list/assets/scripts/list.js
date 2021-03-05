import { createElement } from 'jsx-dom'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import Badge from 'shared/badge/assets/scripts/badge'

export default function ({ data }) {
	return (
		<div data-route-id="list">
			<ul className="list" data-route-id="list">
				{data.accepted.map((item) => (
					<List data={item} />
				))}
				{data.rejected.map((item) => (
					<List data={item} />
				))}
			</ul>
		</div>
	)
}

function List({ data }) {
	return (
		<li className="list-item">
			<a href={`#view/${data.key}`} className="list-link">
				<span className="list-name">{data.name}</span>
				<Badge status={data.status} />
				<div className="list-icon" innerHTML={arrowBottom}></div>
			</a>
		</li>
	)
}
