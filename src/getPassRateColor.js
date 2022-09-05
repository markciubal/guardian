import between from './between.js';

export default function getPassRateColor(passRate) {
    var passRateNumber = parseFloat(passRate);
    var passColor = '';
    if (passRateNumber > 1) {
        passColor = "#5bff72";
    } else if (between(passRateNumber, .9, 1)) {
        passColor = "#5bff72";
    } else if (between(passRateNumber, .8, .9)) {
        passColor = "#a0e53d";
    } else if (between(passRateNumber, .7, .8)) {
        passColor = "#b5d727";
    } else if (between(passRateNumber, .6, .7)) {
        passColor = "#c7c915";
    } else if (between(passRateNumber, .5, .6)) {
        passColor = "#d4bb0d";
    } else if (between(passRateNumber, .4, .5)) {
        passColor = "#e79d20";
    } else if (between(passRateNumber, .3, .4)) {
        passColor = "#eb8e2d";
    } else if (between(passRateNumber, .2, .3)) {
        passColor = "#ed803a";
    } else if (between(passRateNumber, .1, .2)) {
        passColor = "#ec7346";
    } else if (between(passRateNumber, .0, .1)) {
        passColor = "#e96751";
    } else if (between(passRateNumber, .9, 0)) {
        passColor = "#e25c5c";
    }  else if (between(passRateNumber, -99, 0)) {
        passColor = "#e25c5c";
    }
    return passColor;
}