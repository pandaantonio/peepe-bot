import Command from "@/struct/command";

export default new Command().setCommand({
    type: 4, // PRIMARY_ENTRY_POINT
    name: "launch",
    nameLocalizations: {
        "pt-BR": "Abrir atividade",
    },
    handler: 2,
    dmPermission: true,
});