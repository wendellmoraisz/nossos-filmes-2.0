export function abbreviateNumber(value: number) {
    if (value < 1000) {
        return value;
    }
    if (value >= 1000 && value < 1000000) {
        return `${(value / 1000).toFixed(0)}K`;
    }
    if (value >= 1000000 && value < 1000000000) {
        return `${(value / 1000000).toFixed(0)}M`;
    }
    return `${(value / 1000000000).toFixed(0)}B`;
}