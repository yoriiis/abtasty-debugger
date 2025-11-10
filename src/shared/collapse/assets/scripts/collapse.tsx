import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import BadgeTemplate from 'shared/badge/assets/scripts/badge.js'

/**
 * Collapse template
 * @param options
 * @param options.header Collapse header title
 * @param options.content Collapse content
 * @param options.badge Badge options
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
				<button type="button" className="collapse-headerButton">
					{badge && (
						<BadgeTemplate text={badge.text} color={badge.color} withIcon={badge.withIcon} />
					)}
					<span className="collapse-name">{header}</span>
					{content && <div className="collapse-arrow" innerHTML={arrowBottom} />}
				</button>
			</div>
			{content && <div className="collapse-content">{content}</div>}
		</section>
	)
}
