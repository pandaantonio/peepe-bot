export default function timeoutUtil(time: string): number | null {
    const regex = /(\d+)\s*(s|m|h|d|w)/gi;

    let total = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(time)) !== null) {
        const value = Number(match[1]);
        const unit = match[2].toLowerCase();

        switch (unit) {
            case "s":
                total += value * 1000;
                break;
            case "m":
                total += value * 60_000;
                break;
            case "h":
                total += value * 3_600_000;
                break;
            case "d":
                total += value * 86_400_000;
                break;
            case "w":
                total += value * 604_800_000;
                break;
        }
    }

    return total > 0 ? total : null;
}