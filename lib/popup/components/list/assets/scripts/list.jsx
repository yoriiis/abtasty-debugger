"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arrow_bottom_svg_1 = __importDefault(require("shared/assets/svgs/arrow-bottom.svg"));
const badge_1 = __importDefault(require("shared/badge/assets/scripts/badge"));
/**
 * List template
 * @param {Object} options
 * @param {Object} options.data List data
 * @returns {HTMLElement} Generated HTML
 */
function default_1({ data }) {
    return (<div data-route-id="list">
			<ul className="list" data-route-id="list">
				{data.accepted.map((item) => (<List data={item}/>))}
				{data.rejected.map((item) => (<List data={item}/>))}
			</ul>
		</div>);
}
exports.default = default_1;
/**
 * List item template
 * @param {Object} options
 * @param {Object} options.data List item data
 * @returns {HTMLElement} Generated HTML
 */
function List({ data }) {
    return (<li className="list-item">
			<a href={`#detail/${data.key}`} className="list-link">
				<span className="list-name">{data.name}</span>
				<badge_1.default status={data.status}/>
				<div className="list-icon" innerHTML={arrow_bottom_svg_1.default}></div>
			</a>
		</li>);
}
