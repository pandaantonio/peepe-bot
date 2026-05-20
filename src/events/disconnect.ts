import Event from "@/struct/event";

export default new Event("on", "disconnect", async (app) => {
    app.connect();
});