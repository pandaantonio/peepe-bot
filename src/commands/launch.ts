import Command from "@/struct/command";

export default new Command().setCommand({
    type: 4,
    name: "launch",
    nameLocalizations: {
        "pt-BR": "Abrir atividade",
    },
    handler: 2,
    dmPermission: true,
});