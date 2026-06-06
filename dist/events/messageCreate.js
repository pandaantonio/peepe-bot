"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("@/struct/event"));
const InviteRegex = /(?:https?:\/\/)?(?:www\.)?(?:discord\.gg|discord(?:app)?\.com\/invite)\/([A-Za-z0-9_-]+)/gi;
// Configurações do anti-flood
const FLOOD_CONFIG = {
    MAX_MESSAGES: 5, // Número máximo de mensagens permitidas
    TIME_WINDOW: 5000, // Janela de tempo em milissegundos (5 segundos)
    WARNING_DURATION: 10000 // Duração da mensagem de aviso (10 segundos)
};
// Armazenamento de mensagens por usuário (guardando IDs das mensagens)
const userMessages = new Map();
exports.default = new event_1.default("on", "messageCreate", async function (app, message) {
    if (!message.guild || message.author.bot)
        return;
    //if(message.guildID !== "1441209914830880843") return;
    // ========== ANTI-FLOOD ==========
    const now = Date.now();
    const userId = message.author.id;
    // Recupera ou cria registro do usuário
    if (!userMessages.has(userId)) {
        userMessages.set(userId, { timestamps: [], messageIds: [] });
    }
    const userData = userMessages.get(userId);
    // Filtra mensagens antigas fora da janela de tempo
    const validIndices = [];
    const validTimestamps = [];
    const validMessageIds = [];
    for (let i = 0; i < userData.timestamps.length; i++) {
        if (now - userData.timestamps[i] < FLOOD_CONFIG.TIME_WINDOW) {
            validTimestamps.push(userData.timestamps[i]);
            validMessageIds.push(userData.messageIds[i]);
            validIndices.push(i);
        }
    }
    // Adiciona a mensagem atual
    validTimestamps.push(now);
    validMessageIds.push(message.id);
    // Verifica se excedeu o limite
    if (validTimestamps.length > FLOOD_CONFIG.MAX_MESSAGES) {
        // Apaga TODAS as mensagens do usuário na janela de tempo (incluindo as antigas)
        const messagesToDelete = [...validMessageIds];
        for (const msgId of messagesToDelete) {
            try {
                const channel = message.channel;
                const msgToDelete = await channel?.getMessage(msgId).catch(() => null);
                if (msgToDelete) {
                    await msgToDelete.delete().catch(() => { });
                }
            }
            catch (error) {
                // Ignora erros (mensagem já deletada, sem permissão, etc)
            }
        }
        // Tenta deletar a mensagem atual se não estiver na lista
        try {
            await message.delete().catch(() => { });
        }
        catch (error) { }
        // Envia aviso
        const warning = await message.channel?.createMessage({
            content: `${message.author.mention} ⚠️ **Anti-Flood:** Você enviou ${validTimestamps.length} mensagens em poucos segundos! Todas as mensagens foram apagadas. Por favor, aguarde alguns segundos antes de enviar novas mensagens.`
        }).catch(() => null);
        if (warning) {
            setTimeout(() => {
                warning.delete().catch(() => { });
            }, FLOOD_CONFIG.WARNING_DURATION);
        }
        // Limpa os dados do usuário para evitar re-flood imediato
        userMessages.set(userId, { timestamps: [], messageIds: [] });
        return; // Impede o processamento do anti-link
    }
    // Atualiza os dados do usuário com as mensagens válidas
    userMessages.set(userId, {
        timestamps: validTimestamps,
        messageIds: validMessageIds
    });
    // Limpeza periódica do mapa
    if (Math.random() < 0.01) {
        for (const [uid, data] of userMessages.entries()) {
            const validStamps = data.timestamps.filter(ts => now - ts < FLOOD_CONFIG.TIME_WINDOW);
            if (validStamps.length === 0) {
                userMessages.delete(uid);
            }
        }
    }
    // ========== ANTI-LINK ==========
    const matches = [...message.content.matchAll(InviteRegex)];
    if (matches.length) {
        const invites = await message.guild.getInvites();
        const localCodes = new Set(invites.map((i) => i.code.toLowerCase()));
        const externalInvite = matches.some(([, code]) => !localCodes.has(code.toLowerCase()));
        if (externalInvite) {
            await message.delete().catch(() => { });
            // Também deleta mensagens anteriores de link do mesmo usuário
            const userDataLink = userMessages.get(userId);
            if (userDataLink && userDataLink.messageIds.length > 0) {
                for (const msgId of userDataLink.messageIds) {
                    try {
                        const channel = message.channel;
                        const oldMsg = await channel?.getMessage(msgId).catch(() => null);
                        if (oldMsg && oldMsg.content.match(InviteRegex)) {
                            await oldMsg.delete().catch(() => { });
                        }
                    }
                    catch (error) { }
                }
            }
            const warning = await message.channel?.createMessage({
                content: `${message.author.mention} 🚫 Não é permitido divulgar convites de servidores externos.`
            }).catch(() => null);
            if (warning) {
                setTimeout(() => {
                    warning.delete().catch(() => { });
                }, 15000);
            }
        }
    }
    // ========== ANTI-CAPS LOCK ==========
    if (isCapsLock(message.content)) {
        await message.delete();
        const warning = await message.channel?.createMessage({
            content: `${message.author.mention} 🔤 Evite escrever em CAPS LOCK.`
        });
        setTimeout(() => warning?.delete().catch(() => { }), 5000);
    }
});
function isCapsLock(text, threshold = 0.7) {
    const letters = text.match(/[a-zA-ZÀ-ÿ]/g);
    if (!letters || letters.length < 5)
        return false;
    const upper = letters.filter((c) => c === c.toUpperCase()).length;
    return upper / letters.length >= threshold;
}
