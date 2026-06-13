import { InteractionContent, MessageFlags } from "oceanic.js";
import TextDisplayBuilder from "./TextDisplayBuilder";

export default class ComponentBuilder {
    // Inicializar como um objeto vazio para evitar erros de "undefined" em tempo de execução
    message: InteractionContent = {};

    constructor(){
        this.message.flags = MessageFlags.IS_COMPONENTS_V2;
        this.message.components = [];
    }

    // Alteração aqui: recebemos uma função que aceita o builder e retorna o builder modificado
    addTextDisplay(fn: (textDisplay: TextDisplayBuilder) => TextDisplayBuilder) {
        // 1. Instanciamos o builder do TextDisplay
        const builder = new TextDisplayBuilder();
        
        // 2. Passamos a instância para a função executada pelo usuário
        const configuredBuilder = fn(builder);
        
        // 3. Damos o push no resultado do .build()
        this.message.components?.push(configuredBuilder.build());
        
        // 4. Retornamos o "this" (ComponentBuilder) para permitir encadeamento
        return this;
    }

    build(){
        return this.message;
    }
}