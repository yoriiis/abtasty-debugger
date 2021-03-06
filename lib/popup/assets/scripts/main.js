"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const popup_1 = __importDefault(require("./popup"));
const abtasty_json_1 = __importDefault(require("shared/assets/fixtures/abtasty.json"));
const isExtensionMode = typeof chrome !== 'undefined' &&
    typeof chrome.tabs !== 'undefined' &&
    typeof chrome.storage !== 'undefined';
if (isExtensionMode) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        if (currentTab) {
            const storageKey = `tab-${currentTab.id}-ABTastyData`;
            chrome.storage.local.get([storageKey], function (response) {
                // Initialize the popup with data received from the storage
                const popup = new popup_1.default({ data: response[storageKey] });
                popup.init();
                // Remove the badge when the popup is open
                chrome.action.setBadgeText({
                    text: ''
                });
            });
        }
    });
}
else {
    const popup = new popup_1.default({ data: JSON.parse(abtasty_json_1.default) });
    popup.init();
}
