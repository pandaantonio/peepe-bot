"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
class Component {
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
exports.default = Component;
;
