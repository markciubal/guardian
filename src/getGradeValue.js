export default function getGradeValue(grade)
{
    if (grade === 'A')
    {
        return 4;
    } else if (grade === 'B') {
        return 3;
    } else if (grade === 'C') {
        return 2;
    } else if (grade === 'D') {
        return 1;
    } else if (grade === 'P') {
        return 2;
    } else if (grade === 'NP') {
        return 0;
    } else if (grade === 'W') {
        return 0;
    } else {
        return 0;
    }

}