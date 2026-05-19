import axios from "axios";
import Event from "../app/event";

export default new Event("on", "ready", async (app) => {
    await app.handler.registerSlashCommands();

    console.log(`${app.user.username} is ready!`);
});