import Command from "@/struct/command";

export default new Command().setCommand({
    type: 1,
    name: "config",
    description: "Configure recursos do servidor.",
    options: [{
        type: 1,
        name: "autorole",
        description: "Configure o cargo automático para novos membros.",
    }],
    dmPermission: false,
    defaultMemberPermissions: "268435488",
});