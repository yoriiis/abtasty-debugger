"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const info_svg_1 = __importDefault(require("shared/assets/svgs/info.svg"));
/**
 * Empty template
 * @returns {HTMLElement} Generated HTML
 */
function default_1() {
    return (<div className="empty">
			<div className="empty-icon" innerHTML={info_svg_1.default}></div>
			<p className="empty-text">No tests available on the current page.</p>
		</div>);
}
exports.default = default_1;
