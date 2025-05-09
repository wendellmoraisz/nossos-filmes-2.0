export function abbreviateNumber(value: number) {
    if (value < 1000)
        return value;

    if (value >= 1000 && value < 1000000)
        return abbreviation(1000, "K");

    if (value >= 1000000 && value < 1000000000)
        return abbreviation(1000000, "M");

    return abbreviation(1000000000, "B");

    function abbreviation(divisor: number, suffix: string) {
        const fractionDigits = Number.isInteger(value / divisor) ? 0 : 1;
        return `${parseFloat((value / divisor).toFixed(fractionDigits))}${suffix}`;
    }
}
