import Event from "../app/event";
import getApp from "../utils/getApp";

export default new Event("on", "ready", async (app) => {
    await app.handler.registerSlashCommands();

    console.log(`${app.user.username} is ready!`);
});