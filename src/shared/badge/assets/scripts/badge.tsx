import check from 'shared/assets/svgs/check.svg'
import cross from 'shared/assets/svgs/cross.svg'

/**
 * Badge template
 * @param options
 * @param options.text Badge text
 * @returns Generated HTML
 */
export default function BadgeTemplate({
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
				<div className="badge-icon" innerHTML={color === 'green' ? check : cross} />
			) : (
				text
			)}
		</div>
	)
}
