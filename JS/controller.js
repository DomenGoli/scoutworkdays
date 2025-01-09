import * as model from "./model.js";
import * as view from "./view.js";

/**
 * Posreduje unput v model kjer se shrani v local storage
 * @param {Array} inputDateArray Input data
 */
const controlTargetDate = function (inputDateArray) {
    model.saveTargetDate(inputDateArray);
    view.closeForm();
    updateState();
};

const controlRender = function () {
    view.renderTotalDays(model.state.totalDays);
    view.renderWorkingDays(model.state.workDays);
    view.renderButtonDate(model.state.targetDate, model.state.locale);
    view.renderNextHolliday(model.state.nextHolliday, model.state.locale, model.state.validDate);
};

const updateState = function () {
    model.loadTargetDate();
    model.totalDays();
    model.workDaysAndNextHolliday();
    controlRender();
};

const initialize = function () {
    model.setDateLocaleFormat();
    updateState();
    view.addHandlerOpenForm();
    view.addHandlerCloseForm();
    view.addHandlerSubmitButton(controlTargetDate);
};
initialize();
