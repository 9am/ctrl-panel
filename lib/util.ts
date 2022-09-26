export const clamp = (min: number, val: number, max: number): number =>
    Math.max(min, Math.min(val, max));

export const getDecimals = (num: number): number => {
    if (num % 1) {
        const [, decimals] = num.toString().split('.') ?? ['', ''];
        return decimals!.length;
    }
    return 0;
};

export const attr2num = (attr: string | null, defaultVal: number): number => {
    if (attr === null) {
        return defaultVal;
    }
    return parseFloat(attr);
};
