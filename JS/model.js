export const state = {
    targetDate: "",
    totalDays: 0,
    workDays: 0,
    nextHolliday: "",
    locale: "",
    validDate: false
};

const hollidays = [
    "1-1",
    "2-1",
    "8-2",
    "27-4",
    "1-5",
    "2-5",
    "25-6",
    "15-8",
    "31-10",
    "1-11",
    "25-12",
    "26-12",
];

export const setDateLocaleFormat = function () {
    // state.locale = navigator.language
    state.locale = "sl-SI";
};

export const loadTargetDate = function () {
    if (!localStorage.setDatum)
        localStorage.setItem("setDatum", new Date(1970, 0, 1));

    state.targetDate = new Date(localStorage.getItem("setDatum"));
    state.validDate = new Date() < state.targetDate
        ? true
        : false
};

/**
 * Shrani input data v localStorage
 * @param {Array[Numbers]} inputDateArray Input data [Year, Month, Day]
 */
export const saveTargetDate = function (inputDateArray) {
    const [year, month, day] = inputDateArray;
    const output = new Date(Number(year), Number(month - 1), Number(day)); //.getTime()
    localStorage.setItem("setDatum", output);
};

export const totalDays = function () {
    if(!state.validDate) {
        state.totalDays = 0;
        return;
    }

    state.totalDays = Math.floor(Math.abs(state.targetDate - new Date()) / (1000 * 60 * 60 * 24) + 1);
};

export const workDaysAndNextHolliday = function () {
    let count = 0;
    const currentDate = new Date();
    const easterDates = populateEasterDates();

    // Guard clause
    if (!state.validDate) {
        state.workDays = 0;
        return;
    }

    while (currentDate <= state.targetDate) {
        const dayOfWeak = currentDate.getDay();
        const dayMonthString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}`;
        const easterString = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        const notWeekend = (day) => day !== 0 && day !== 6;

        if (notWeekend(dayOfWeak) 
            && !hollidays.includes(dayMonthString) 
            && !easterDates.includes(easterString))
            count++;
            

        // Nastavi nasledni praznik med tednom
        if (!state.nextHolliday) {
            if ((notWeekend(dayOfWeak) 
                && hollidays.includes(dayMonthString)) 
                || easterDates.includes(easterString)) {
                state.nextHolliday = new Date(currentDate);
            }
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    state.workDays = count;
};

const populateEasterDates = function () {
    let easterDates = [];
    let currentYear = new Date().getFullYear();

    const goldenNumberHashmap = new Map();
    goldenNumberHashmap
        .set(0, [27, 3])
        .set(1, [14, 4])
        .set(2, [3, 4])
        .set(3, [23, 3])
        .set(4, [11, 4])
        .set(5, [31, 3])
        .set(6, [18, 4])
        .set(7, [8, 4])
        .set(8, [28, 3])
        .set(9, [16, 4])
        .set(10, [5, 4])
        .set(11, [25, 3])
        .set(12, [13, 4])
        .set(13, [2, 4])
        .set(14, [22, 3])
        .set(15, [10, 4])
        .set(16, [30, 3])
        .set(17, [17, 4])
        .set(18, [7, 4])
        .set(19, [27, 3]);

    while (currentYear <= state.targetDate.getFullYear()) {
        const goldenNumber =
            currentYear - Math.floor(currentYear / 19) * 19 + 1;
        const [day, month] = goldenNumberHashmap.get(goldenNumber);
        const date = new Date(currentYear, month - 1, day);
        const dayOfWeak = date.getDay();
        const untillSunday = 7 - dayOfWeak;
        const timestamp = date.getTime() + untillSunday * 24 * 60 * 60 * 1000;
        const newDate = new Date(timestamp);
        const outputDay = newDate.getDate();
        const outputMonth = newDate.getMonth();
        easterDates.push(`${outputDay + 1}-${outputMonth + 1}-${currentYear}`); // day +1 da prestavi iz NED na PON
        currentYear++;
    }
    return easterDates;
};
