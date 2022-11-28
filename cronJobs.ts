import {schedule} from "node-cron";
import soloFight from "./tasks/soloFight";
import ograbStart from "./tasks/ograbStart";
import openCases from "./tasks/openCases";
import buildCity from "./tasks/buildCity";


const scheduleFunc = (cronTime: string, func: () => Promise<any>) =>
    schedule(cronTime, () => {
        func().then(_ => {});
    })

const every10Mins = '*/10 * * * *';
const every20Mins = '*/20 * * * *';
const onceAnHour = '40 * * * *';

scheduleFunc(every10Mins, soloFight);
scheduleFunc(onceAnHour, ograbStart);
scheduleFunc(every20Mins, openCases);
scheduleFunc(every20Mins, buildCity);