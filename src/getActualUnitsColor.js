import between from './between.js';

export default function getActualUnitsColor(units) {
    var unitRateNumber = parseFloat(units);
    var unitColor = '';
    if (unitRateNumber > 15) {
        unitColor = "#5bff72";
    } else if (between(unitRateNumber, 14, 15)) {
        unitColor = "#5bff72";
    } else if (between(unitRateNumber, 13, 14)) {
        unitColor = "#a0e53d";
    } else if (between(unitRateNumber, 12, 13)) {
        unitColor = "#b5d727";
    } else if (between(unitRateNumber, 9, 12)) {
        unitColor = "#c7c915";
    } else if (between(unitRateNumber, 8, 9)) {
        unitColor = "#d4bb0d";
    } else if (between(unitRateNumber, 7, 8)) {
        unitColor = "#e79d20";
    } else if (between(unitRateNumber, 6, 7)) {
        unitColor = "#eb8e2d";
    } else if (between(unitRateNumber, 5, 6)) {
        unitColor = "#ed803a";
    } else if (between(unitRateNumber, 4, 5)) {
        unitColor = "#ec7346";
    } else if (between(unitRateNumber, 3, 4)) {
        unitColor = "#e96751";
    } else if (between(unitRateNumber, 2, 3)) {
        unitColor = "#e25c5c";
    }  else if (unitRateNumber < 2) {
        unitColor = "#e25c5c";
    }
    return unitColor;
}