function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
const DynamicColors = function(opacity, rMax, gMax, bMax, rMin, gMin, bMin) {
    if (!rMax) {
        rMax = 255;
    }
    if (!gMax) {
        gMax = 255;
    }
    if (!bMax) {
        bMax = 255;
    }
    if (!rMin) {
        rMin = 0;
    }
    if (!gMin) {
        gMin = 0;
    }
    if (!bMin) {
        bMin = 0;
    }
    var r = Math.floor(randomIntFromInterval(rMin, rMax));
    var g = Math.floor(randomIntFromInterval(gMin, gMax));
    var b = Math.floor(randomIntFromInterval(bMin, bMax));

    return "rgb(" + r + "," + g + "," + b + "," + opacity + ")";
};

export default DynamicColors;