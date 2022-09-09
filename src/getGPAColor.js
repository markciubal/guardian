import between from './between.js';

export default function getGPAColor(gpa) {
    var gpa = parseFloat(gpa);
    var gpaColor = '';
    if (gpa > 3.9) {
        gpaColor = "#ededed";
    } else if (between(gpa, 3.5, 3.9)) {
        gpaColor = "#d9d9d9";
    } else if (between(gpa, 3.0, 3.5)) {
        gpaColor = "#c6c6c6";
    } else if (between(gpa, 2.5, 3.0)) {
        gpaColor = "#b2b2b2";
    } else if (between(gpa, 2.0, 2.5)) {
        gpaColor = "#9f9f9f";
    } else if (between(gpa, 1.5, 2.0)) {
        gpaColor = "#8b8b8b";
    } else if (between(gpa, 1, 1.5)) {
        gpaColor = "#777777";
    } else if (between(gpa, 0.5, 1)) {
        gpaColor = "#646464";
    } else if (between(gpa, -10, 0.5)) {
        gpaColor = "#505050";
    }
    return gpaColor;
}