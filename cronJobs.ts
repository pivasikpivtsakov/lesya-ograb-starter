import {schedule} from "node-cron";
import soloFight from "./tasks/soloFight";
import ograbStart from "./tasks/ograbStart";
import openCases from "./tasks/openCases";


const every10Mins = '*/10 * * * *';
schedule(every10Mins, now => {
    soloFight().then(_ => {});
});

const onceADayAt18 = '0 18 * * *';
schedule(onceADayAt18, now => {
    ograbStart().then(_ => {});
});

const every30Mins = '*/30 * * * *';
schedule(every30Mins, now => {
    openCases().then(_ => {});
});