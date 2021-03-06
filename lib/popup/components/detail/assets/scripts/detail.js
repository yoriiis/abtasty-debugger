"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const external_link_svg_1 = __importDefault(require("shared/assets/svgs/external-link.svg"));
const arrow_bottom_svg_1 = __importDefault(require("shared/assets/svgs/arrow-bottom.svg"));
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
    return (data - route - id) = "detail" >
        className;
    "detail" >
        className;
    "detail-header" >
        href;
    "#list";
    className = "detail-headerBack" >
        className;
    "detail-headerBackIcon";
    innerHTML = { arrowBottom: arrow_bottom_svg_1.default } > /div>;
    Back
        < /a>
        < /li>
        < li >
        href;
    {
        `https://app2.abtasty.com/edit/test/${id}/audience`;
    }
    target = "_blank";
    without;
    rel = "noreferrer";
    className = "detail-headerDashboard"
        >
            Edit;
    on;
    AB;
    Tasty
        < div;
    className = "detail-headerDashboardIcon";
    innerHTML = { externalLink: external_link_svg_1.default }
        > /div>
        < /a>
        < /li>
        < /ul>
        < ul;
    className = "detail-list" >
        ID;
    {
        id;
    }
    /li>
        < li > Type;
    {
        result.type;
    }
    /li>;
    {
        result.variationName && Variation;
        {
            result.variationName;
        }
        {
            ' ';
        }
        {
            result.variationID && ({ result, : .variationID }) < />}
                < /li>;
        }
        Ajax;
        targeting: {
            targetingMode === 'waituntil' ? 'on' : 'off';
        }
        /li>
            < /ul>;
        {
            targetingSorted.rejected.map((item) => testStatus = { result, : .status }, key = { item, : .key }, data = { item }, textarea = { item, : .key === 'code_scope' }, headerOnly = { item, : .key === 'ip_scope' }
                /  >
            );
        }
        {
            targetingSorted.accepted.map((item) => testStatus = { result, : .status }, key = { item, : .key }, data = { item }, textarea = { item, : .key === 'code_scope' }, headerOnly = { item, : .key === 'ip_scope' }
                /  >
            );
        }
        /div>
            < /div>;
    }
}
exports.default = default_1;
