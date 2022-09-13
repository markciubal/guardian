import between from './between.js';

export default function getGPAColor(gpa) {
    var gpa = parseFloat(gpa);
    var gpaColor = '';
    if (gpa > 3.9) {
        gpaColor = "#5bff72";
    } else if (between(gpa, 3.5, 3.9)) {
        gpaColor = "#93ec49";
    } else if (between(gpa, 3.0, 3.5)) {
        gpaColor = "#b5d727";
    } else if (between(gpa, 2.5, 3.0)) {
        gpaColor = "#cec20f";
    } else if (between(gpa, 2.0, 2.5)) {
        gpaColor = "#dfac14";
    } else if (between(gpa, 1.5, 2.0)) {
        gpaColor = "#e99627";
    } else if (between(gpa, 1, 1.5)) {
        gpaColor = "#ed803a";
    } else if (between(gpa, 0.5, 1)) {
        gpaColor = "#eb6c4b";
    } else if (between(gpa, -10, 0.5)) {
        gpaColor = "#e25c5c";
    }
    return gpaColor;
}