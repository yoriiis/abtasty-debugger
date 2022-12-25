import { createElement } from 'costro/jsx'
import check from 'shared/assets/svgs/check.svg'
import cross from 'shared/assets/svgs/cross.svg'

/**
 * Badge template
 * @param {Object} options
 * @param {Object} options.text Badge text
 * @returns {HTMLElement} Generated HTML
 */
export default function ({
	text = '',
	color = 'green',
	withIcon = false
}: {
	text: string
	color: string
	withIcon?: boolean
}) {
	return (
		<div className={`badge ${color} ${withIcon ? 'withIcon' : ''}`}>
			{withIcon ? (
				<div className="badge-icon" innerHTML={color === 'green' ? check : cross}></div>
			) : (
				text
			)}
		</div>
	)
}
