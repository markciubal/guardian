import between from './between.js';

export default function getActualUnitsColor(units) {
    var unitRateNumber = parseFloat(units);
    var unitColor = '';
    if (unitRateNumber > 15) {
        unitColor = "#ededed";
    } else if (between(unitRateNumber, 14, 15)) {
        unitColor = "#e0e0e0";
    } else if (between(unitRateNumber, 13, 14)) {
        unitColor = "#d3d3d3";
    } else if (between(unitRateNumber, 12, 13)) {
        unitColor = "#c6c6c6";
    } else if (between(unitRateNumber, 9, 12)) {
        unitColor = "#b9b9b9";
    } else if (between(unitRateNumber, 8, 9)) {
        unitColor = "#acacac";
    } else if (between(unitRateNumber, 7, 8)) {
        unitColor = "#9f9f9f";
    } else if (between(unitRateNumber, 6, 7)) {
        unitColor = "#919191";
    } else if (between(unitRateNumber, 5, 6)) {
        unitColor = "#848484";
    } else if (between(unitRateNumber, 4, 5)) {
        unitColor = "#777777";
    } else if (between(unitRateNumber, 3, 4)) {
        unitColor = "#6a6a6a";
    } else if (between(unitRateNumber, 2, 3)) {
        unitColor = "#5d5d5d";
    }  else if (unitRateNumber < 2) {
        unitColor = "#505050";
    }
    return unitColor;
}