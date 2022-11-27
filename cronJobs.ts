import {schedule} from "node-cron";
import soloFight from "./tasks/soloFight";
import ograbStart from "./tasks/ograbStart";
import openCases from "./tasks/openCases";


const every10Mins = '*/10 * * * *';
schedule(every10Mins, now => {
    soloFight().then(console.log);
});

const onceADayAt18 = '0 18 * * *';
schedule(onceADayAt18, now => {
    ograbStart().then(console.log);
});

const every30Mins = '*/30 * * * *';
schedule(every30Mins, now => {
    openCases().then(console.log);
});