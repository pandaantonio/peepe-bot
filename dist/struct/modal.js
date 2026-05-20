"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Modal {
    names;
    run;
    addName(...names) {
        if (!this.names)
            this.names = [];
        this.names.push(...names);
        return this;
    }
    setRun(run) {
        this.run = run;
        return this;
    }
}
exports.default = Modal;
;
