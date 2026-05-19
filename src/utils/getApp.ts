import axios, { AxiosResponse } from "axios";

export default async function (
    id: string
): Promise<any | undefined> {
    return await axios
        .get(
            `https://discord.com/api/v10/applications/${id}/rpc`,
            {
                headers: {
                    Authorization: `Bot ${process.env.TOKEN}`
                }
            }
        )
        .then((res) => res.data)
        .catch((err) => {
            console.log(err);
            return undefined;
        });
}