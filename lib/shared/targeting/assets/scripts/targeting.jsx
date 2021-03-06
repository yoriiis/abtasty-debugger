"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const badge_1 = __importDefault(require("shared/badge/assets/scripts/badge"));
const arrow_bottom_svg_1 = __importDefault(require("shared/assets/svgs/arrow-bottom.svg"));
const wording_1 = __importDefault(require("shared/utils/wording"));
/**
 * Targeting template
 * @param {Object} options
 * @param {String} options.testStatus Status of the test
 * @param {Object} options.data Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
function default_1({ testStatus, data, headerOnly = false, textarea = false }) {
    return (<section className={`targeting${headerOnly ? ' headerOnly' : ''}`}>
			<div className="targeting-header">
				<button className="targeting-headerButton">
					<span className="targeting-name">{wording_1.default(data.key)} targeting</span>
					<badge_1.default status={data.success ? 'accepted' : testStatus}/>
					{!headerOnly && (<div className="targeting-headerIcon" innerHTML={arrow_bottom_svg_1.default}></div>)}
				</button>
			</div>
			{!headerOnly && (<div className="targeting-content">
					<table className="targeting-table">
						<tbody>
							{data.conditions.map((item) => {
        let value = item.value;
        if (data.key === 'cookie_scope') {
            value = `${item.name}=${item.value}`;
        }
        return (<tr>
										{typeof item.include !== 'undefined' && (<td>{item.include ? 'Include' : 'Exclude'}</td>)}
										<td>
											{textarea ? (<textarea className="textarea" disabled>
													{value}
												</textarea>) : (<input className="input" disabled type="text" value={value}/>)}
										</td>
									</tr>);
    })}
						</tbody>
					</table>
				</div>)}
		</section>);
}
exports.default = default_1;
