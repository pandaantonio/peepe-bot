"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oceanic_js_1 = require("oceanic.js");
const TextDisplayBuilder_1 = __importDefault(require("./TextDisplayBuilder"));
class ComponentBuilder {
    // Inicializar como um objeto vazio para evitar erros de "undefined" em tempo de execução
    message = {};
    constructor() {
        this.message.flags = oceanic_js_1.MessageFlags.IS_COMPONENTS_V2;
        this.message.components = [];
    }
    // Alteração aqui: recebemos uma função que aceita o builder e retorna o builder modificado
    addTextDisplay(fn) {
        // 1. Instanciamos o builder do TextDisplay
        const builder = new TextDisplayBuilder_1.default();
        // 2. Passamos a instância para a função executada pelo usuário
        const configuredBuilder = fn(builder);
        // 3. Damos o push no resultado do .build()
        this.message.components?.push(configuredBuilder.build());
        // 4. Retornamos o "this" (ComponentBuilder) para permitir encadeamento
        return this;
    }
    build() {
        return this.message;
    }
}
exports.default = ComponentBuilder;
