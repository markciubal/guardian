import between from './between.js';

export default function getPassRateColor(passRate) {
    var passRateNumber = parseFloat(passRate);
    var passColor = '';
    if (passRateNumber === 1) {
        passColor = "#ededed";
    } else if (between(passRateNumber, .9, 1)) {
        passColor = "#e0e0e0";
    } else if (between(passRateNumber, .8, .9)) {
        passColor = "#d3d3d3";
    } else if (between(passRateNumber, .7, .8)) {
        passColor = "#b9b9b9";
    } else if (between(passRateNumber, .6, .7)) {
        passColor = "#acacac";
    } else if (between(passRateNumber, .5, .6)) {
        passColor = "#9f9f9f";
    } else if (between(passRateNumber, .4, .5)) {
        passColor = "#919191";
    } else if (between(passRateNumber, .3, .4)) {
        passColor = "#848484";
    } else if (between(passRateNumber, .2, .3)) {
        passColor = "#777777";
    } else if (between(passRateNumber, .1, .2)) {
        passColor = "#6a6a6a";
    } else if (between(passRateNumber, .0, .1)) {
        passColor = "#5d5d5d";
    } else if (between(passRateNumber, .9, 0)) {
        passColor = "#505050";
    }  else if (between(passRateNumber, -99, 0)) {
        passColor = "#505050";
    }
    return passColor;
}