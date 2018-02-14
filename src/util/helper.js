export const convertToBtc = (balance) => {
    return balance / 100000000;
}

export const convertTime = (time) => {
    const result = Date(time);
    return result;
}