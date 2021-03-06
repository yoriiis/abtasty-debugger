"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const badge_ts_1 = __importDefault(require("shared/badge/assets/scripts/badge.ts"));
const arrow_bottom_svg_1 = __importDefault(require("shared/assets/svgs/arrow-bottom.svg"));
/**
 * Targeting template
 * @param {Object} options
 * @param {Object} options.key Targeting key (url_scope|code_scope|selector_scope|cookie_scope|ip_scope)
 * @param {Object} options.testStatus Status of the test
 * @param {Object} options.data Targeting data
 * @param {Object} options.headerOnly Display the header only, without content
 * @param {Object} options.textarea Use textarea instead of input field
 * @returns {HTMLElement} Generated HTML
 */
function default_1({ key, testStatus, data, headerOnly = false, textarea = false }) {
    return className = {} `targeting${headerOnly ? ' headerOnly' : ''}`;
}
exports.default = default_1;
 >
    className;
"targeting-header" >
    className;
"targeting-headerButton" >
    className;
"targeting-name" > {};
targeting < /span>
    < badge_ts_1.default;
status = { data, : .success ? 'accepted' : testStatus } /  >
    {};
headerOnly && className;
"targeting-headerIcon";
innerHTML = { arrowBottom: arrow_bottom_svg_1.default } > /div>;
/button>
    < /div>;
{
    !headerOnly && className;
    "targeting-content" >
        className;
    "targeting-table" >
        { data, : .conditions.map((item) => {
                let value = item.value;
                if (data.key === 'cookie_scope') {
                    value = `${item.name}=${item.value}`;
                }
                return ({ typeof: item.include !== 'undefined' && ({ item, : .include ? 'Include' : 'Exclude' } < /td>) }
                    < td >
                    {} >
                    { value }
                    < /textarea>);
                className = "input";
                disabled;
                type = "text";
                value = { value }
                    /  >
                ;
            }) }
        < /td>
        < /tr>;
}
/tbody>
    < /table>
    < /div>;
/section>;
