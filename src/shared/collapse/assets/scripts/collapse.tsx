import { createElement } from 'jsx-dom'
import BadgeTemplate from 'shared/badge/assets/scripts/badge'
import arrowBottom from 'shared/assets/svgs/arrow-bottom.svg'
import wording from 'shared/utils/wording'
import { Variation, Condition } from 'shared/assets/interfaces/interfaces'

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
					<span className="collapse-name">{header}</span>
					{badge && <BadgeTemplate text={badge.text} color={badge.color} />}
					{content && <div className="collapse-arrow" innerHTML={arrowBottom}></div>}
				</button>
			</div>
			{content && <div className="collapse-content">{content}</div>}
		</section>
	)
}
