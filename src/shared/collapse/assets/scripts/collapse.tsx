import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'

/**
 * Collapse template
 * @param {Object} options
 * @param {String} options.header Collapse header title
 * @param {Object} options.content Collapse content
 * @param {Object} options.badge Badge options
 * @returns {HTMLElement} Generated HTML
 */
export default function TemplateCollapse({
	header,
	content,
	badge
}: {
	header: string
	content: any
	badge?: any
}) {
	return (
		<section className={`collapse${!content ? ' headerOnly' : ''}`}>
			<div className="collapse-header">
				<button className="collapse-headerButton">
					{badge && (
						<BadgeTemplate
							text={badge.text}
							color={badge.color}
							withIcon={badge.withIcon}
						/>
					)}
					<span className="collapse-name">{header}</span>
					{content && <div className="collapse-arrow" innerHTML={arrowBottom}></div>}
				</button>
			</div>
			{content && <div className="collapse-content">{content}</div>}
		</section>
	)
}
