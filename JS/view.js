// Elementi
const allDays = document.querySelector("#absolute");
const delovniki = document.querySelector("#delovniki");
const datum = document.querySelector(".btn");
const datumButtton = document.querySelector(".btn");
const modal = document.querySelector(".datum_input");
const submitButton = document.querySelector(".btn_input");
const dayInput = document.querySelector(".day_input");
const monthInput = document.querySelector(".month_input");
const yearInput = document.querySelector(".year_input");
const overlay = document.querySelector(".overlay");
const disPraznik = document.querySelector(".praznik");
const closeButton = document.querySelector(".close-modal")

export const renderTotalDays = function (numberOfDays) {
    allDays.textContent = numberOfDays;
};

export const renderWorkingDays = function (numberOfDays) {
    delovniki.textContent = numberOfDays;
};

export const renderNextHolliday = function (date, locale, validDate) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    };
    disPraznik.textContent = validDate
        ? new Intl.DateTimeFormat(locale, options).format(date)
        : "/"
};

export const renderButtonDate = function (targetDate, locale) {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        // weekday: "long"
    };
    datum.textContent = targetDate.getFullYear() === 1970
        ? "Vnesi Datum"
        : new Intl.DateTimeFormat(locale, options).format(targetDate);
};

export const addHandlerOpenForm = function () {
    datumButtton.addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        dayInput.focus();
    });
};

export const addHandlerCloseForm = function () {
    overlay.addEventListener("click", closeForm);
    closeButton.addEventListener("click", closeForm);
};

export const addHandlerSubmitButton = function (handler) {
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;
        const output = [year, month, day];

        if (day.length !== 0 && month.length !== 0 && year.length !== 0) {
            if (day < 32 && month < 13 && year > 2024) {
                if(day > 0 && month > 0 && year > 2024) {
                    handler(output);
                }
            }
        }
    });
};

export const closeForm = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    dayInput.value = monthInput.value = yearInput.value = "";
};
