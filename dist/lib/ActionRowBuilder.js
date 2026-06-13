"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ActionRowBuilder {
    actionRow;
    constructor() {
        this.actionRow = {
            type: 1,
            components: [],
        };
    }
    addLinkButton(url, label, emoji) {
        this.actionRow.components.push({
            url,
            label,
            emoji,
            type: 2,
            style: 5,
        });
        return this;
    }
    build() {
        return this.actionRow;
    }
}
exports.default = ActionRowBuilder;
;
