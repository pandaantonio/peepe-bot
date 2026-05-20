import Event from "../app/event";

export default new Event("on", "disconnect", async (app) => {
    app.connect();
});