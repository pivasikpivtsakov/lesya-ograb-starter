import {getRandomIntInclusive} from "./common";

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const callRandomDistributed = async (func: () => Promise<any>, overMs: number) => {
    const minWaitTime = 20000;
    const maxWaitTime = 90000;

    let passedTime = 0;
    while (passedTime < overMs) {
        const waitTime = getRandomIntInclusive(minWaitTime, maxWaitTime);
        await func();
        await delay(waitTime);
        passedTime += waitTime;
    }
};