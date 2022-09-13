import between from './between.js';

export default function getGPAPerformanceColor(gpa) {
    var gpa = parseFloat(gpa);
    var gpaColor = '';
    if (gpa > 3.9) {
        gpaColor = "#5bff72";
    } else if (between(gpa, 3, 3.9)) {
        gpaColor = "#93ec49";
    } else if (between(gpa, 2, 3)) {
        gpaColor = "#b5d727";
    } else if (between(gpa, 1, 2)) {
        gpaColor = "#cec20f";
    } else if (between(gpa, 0, 1)) {
        gpaColor = "#dfac14";
    } else if (between(gpa, -1, 0)) {
        gpaColor = "#e99627";
    } else if (between(gpa, -2, -1)) {
        gpaColor = "#ed803a";
    } else if (between(gpa, -3, -2)) {
        gpaColor = "#eb6c4b";
    } else if (between(gpa, -10, -3)) {
        gpaColor = "#e25c5c";
    }
    return gpaColor;
  }