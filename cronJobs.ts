import {schedule} from "node-cron";
import soloFight from "./tasks/soloFight";
import ograbStart from "./tasks/ograbStart";


const every10Mins = '*/10 * * * *';
schedule(every10Mins, async now => {
    await soloFight();
});

const onceADayAt18 = '0 18 * * *';
schedule(onceADayAt18, async now => {
    await ograbStart();
});