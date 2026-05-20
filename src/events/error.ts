import Event from "@/struct/event";

export default new Event("on", "error", async (app, error) => {
    console.log(error);
});