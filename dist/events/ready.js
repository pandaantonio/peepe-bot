"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = __importDefault(require("../app/event"));
const firebaseAdmin_1 = require("../database/firebaseAdmin");
async function clearExpiredMessages() {
    const ref = firebaseAdmin_1.adminDb.ref("messages");
    const snapshot = await ref.get();
    if (!snapshot.exists())
        return;
    const data = snapshot.val();
    for (const userID in data) {
        for (const messageID in data[userID]) {
            const message = data[userID][messageID];
            if (message.expiresAt &&
                Date.now() >= message.expiresAt) {
                await ref.child(`${userID}/${messageID}`).remove();
            }
        }
    }
}
exports.default = new event_1.default("on", "ready", async (app) => {
    await app.handler.registerSlashCommands();
    await clearExpiredMessages();
    console.log(`${app.user.username} is ready!`);
});
