import between from './between.js';

export default function getGPAPerformanceColor(gpa) {
    var gpa = parseFloat(gpa);
    var gpaColor = '';
    if (gpa > 3.9) {
        gpaColor = "#ededed";
    } else if (between(gpa, 3, 3.9)) {
        gpaColor = "#d9d9d9";
    } else if (between(gpa, 2, 3)) {
        gpaColor = "#c6c6c6";
    } else if (between(gpa, 1, 2)) {
        gpaColor = "#b2b2b2";
    } else if (between(gpa, 0, 1)) {
        gpaColor = "#9f9f9f";
    } else if (between(gpa, -1, 0)) {
        gpaColor = "#8b8b8b";
    } else if (between(gpa, -2, -1)) {
        gpaColor = "#777777";
    } else if (between(gpa, -3, -2)) {
        gpaColor = "#646464";
    } else if (between(gpa, -10, -3)) {
        gpaColor = "#505050";
    }
    return gpaColor;
  }