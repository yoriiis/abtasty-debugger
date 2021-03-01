import { createElement } from 'jsx-dom'

export default function (name) {
	return (
		<svg className={`icon icon-${name}`}>
			<use href={`#${name}`}></use>
		</svg>
	)
}
