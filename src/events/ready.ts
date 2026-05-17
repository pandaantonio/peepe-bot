import Event from "../app/event";
import { adminDb } from "../database/firebaseAdmin";

async function clearExpiredMessages() {
    const ref = adminDb.ref("messages");

    const snapshot = await ref.get();

    if (!snapshot.exists()) return;

    const data = snapshot.val();

    for (const userID in data) {
        for (const messageID in data[userID]) {
            const message = data[userID][messageID];

            if (
                message.expiresAt &&
                Date.now() >= message.expiresAt
            ) {
                await ref.child(`${userID}/${messageID}`).remove();
            }
        }
    }
}

export default new Event("on", "ready", async (app) => {
    await app.handler.registerSlashCommands();

    await clearExpiredMessages();

    console.log(`${app.user.username} is ready!`);
});