"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const external_link_svg_1 = __importDefault(require("shared/assets/svgs/external-link.svg"));
const arrow_bottom_svg_1 = __importDefault(require("shared/assets/svgs/arrow-bottom.svg"));
const targeting_1 = __importDefault(require("shared/targeting/assets/scripts/targeting"));
/**
 * Detail template
 * @param {Object} options
 * @param {String} options.id Test id
 * @param {StriObjectng} options.result Test data
 * @param {Object} options.targetingSorted Test data sorted by accepted and
 * @param {String} options.targetingMode Targeting mode (fastest|waituntil)
 * @returns {HTMLElement} Generated HTML
 */
function default_1({ id, result, targetingSorted, targetingMode }) {
    return (<div data-route-id="detail">
			<div className="detail">
				<ul className="detail-header">
					<li>
						<a href="#list" className="detail-headerBack">
							<div className="detail-headerBackIcon" innerHTML={arrow_bottom_svg_1.default}></div>
							Back
						</a>
					</li>
					<li>
						<a href={`https://app2.abtasty.com/edit/test/${id}/audience`} target="_blank" rel="noreferrer" className="detail-headerDashboard">
							Edit on AB Tasty
							<div className="detail-headerDashboardIcon" innerHTML={external_link_svg_1.default}></div>
						</a>
					</li>
				</ul>
				<ul className="detail-list">
					<li>ID: {id}</li>
					<li>Type: {result.type}</li>
					{result.variationName && (<li>
							Variation: {result.variationName}{' '}
							{result.variationID && <>({result.variationID})</>}
						</li>)}
					<li>Ajax targeting: {targetingMode === 'waituntil' ? 'on' : 'off'}</li>
				</ul>

				{targetingSorted.rejected.map((item) => (<targeting_1.default testStatus={result.status} data={item} textarea={item.key === 'code_scope'} headerOnly={item.key === 'ip_scope'}/>))}
				{targetingSorted.accepted.map((item) => (<targeting_1.default testStatus={result.status} data={item} textarea={item.key === 'code_scope'} headerOnly={item.key === 'ip_scope'}/>))}
			</div>
		</div>);
}
exports.default = default_1;
