"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const path_1 = require("path");
const oceanic_js_1 = require("oceanic.js");
class Handler {
    app;
    constructor(app) {
        this.app = app;
    }
    async init() {
        await this.loadEvents();
        await this.loadModals();
        await this.loadCommands();
        await this.loadComponents();
    }
    async loadEvents() {
        for (const dir of await (0, glob_1.glob)("dist/events/**/*.js")) {
            const event = (await Promise.resolve(`${(0, path_1.resolve)(dir)}`).then(s => __importStar(require(s)))).default;
            this.app[event.type](event.name, async (...args) => {
                await event.run(this.app, ...args);
            });
        }
    }
    async loadCommands() {
        for (const dir of await (0, glob_1.glob)("dist/commands/**/*.js")) {
            const file = (await Promise.resolve(`${(0, path_1.resolve)(dir)}`).then(s => __importStar(require(s))));
            for (const command of Object.values(file)) {
                for (const name of command.names) {
                    this.app.commands.set(name, command);
                }
            }
        }
    }
    async loadComponents() {
        this.app.components = new oceanic_js_1.Collection();
        for (const dir of await (0, glob_1.glob)("dist/components/**/*.js")) {
            const component = (await Promise.resolve(`${(0, path_1.resolve)(dir)}`).then(s => __importStar(require(s)))).default;
            for (const name of component.names) {
                this.app.components.set(name, component);
            }
        }
    }
    async loadModals() {
        this.app.modals = new oceanic_js_1.Collection();
        for (const dir of await (0, glob_1.glob)("dist/modals/**/*.js")) {
            const modal = (await Promise.resolve(`${(0, path_1.resolve)(dir)}`).then(s => __importStar(require(s)))).default;
            for (const name of modal.names) {
                this.app.modals.set(name, modal);
            }
        }
    }
}
exports.default = Handler;
;
