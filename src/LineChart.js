import React, { setState, useMemo }from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Chart, getDatasetAtEvent } from 'react-chartjs-2';
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";
import DynamicColors from './ColorFunctions';
import { Line, Bar } from "react-chartjs-2";
import { Component } from "react/cjs/react.production.min";
import { v4 as uuidv4 } from 'uuid';
import { sampleCorrelation } from 'simple-statistics';
import Tablesort from 'tablesort';
import Statistics from "statistics.js";
import { hasPointerEvents } from '@testing-library/user-event/dist/utils';
import _ from 'lodash';
import { useTable } from 'react-table'
import Table from './ReactTable';
import getGradeValue from './getGradeValue.js';
import getGPAColor from './getGPAColor.js';
import getPassRateColor from './getPassRateColor.js';
import getActualUnitsColor from './getActualUnitsColor.js';
import between from './between.js';
import average from './average.js';
import sleep from './sleep.js';
import cytoscape from 'cytoscape';
import CyGraph from './cy.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.rendered = false;
        this.numberRun = 0;
    }
    
    render() {
        if (!this.rendered) {
            this.numberRun++;
            function compareNumericString(rowA, rowB, id, desc) {
                let a = Number.parseFloat(rowA.values[id]);
                let b = Number.parseFloat(rowB.values[id]);
                if (Number.isNaN(a)) {  // Blanks and non-numeric strings to bottom
                    a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
                }
                if (Number.isNaN(b)) {
                    b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
                }
                if (a > b) return 1; 
                if (a < b) return -1;
                return 0;
            }

            var tableData = [];
            const tableHeaders =[
                    {
                    Header: 'Student ID',
                    accessor: 'studentID', // accessor is the "key" in the data
                    },
                    {
                    Header: 'Has Classes Next Term',
                    accessor: 'hasClasses',
                    },
                    {
                    Header: 'Progress Slope',
                    accessor: 'progressSlope',
                    sortType: compareNumericString,
                    },
                    {
                    Header: 'Class Grade Correlation',
                    accessor: 'classCorrelation',
                    sortType: compareNumericString,
                    },
                    {
                    Header: 'Terms Attended',
                    accessor: 'termsAttended',
                    },
                    {
                    Header: 'Units Attempted',
                    accessor: 'unitsAttempted',
                    },
                    {
                    Header: 'Units Passed',
                    accessor: 'unitsPassed',
                    },
                    {
                    Header: 'Pass Rate',
                    accessor: 'passRate',
                    },
                    {
                        Header: 'Average GPA Performance',
                        accessor: 'aboveOrBelowGrade',
                        sortType: compareNumericString,
                    },
                    {
                    Header: 'Average Units Passed Per Term',
                    accessor: 'avgPassedPerTerm',
                    },
                    {
                    Header: 'Average Benefit Utilization',
                    accessor: 'avgBenefitUtil',
                    },
                    {
                    Header: 'Projected Benefit Utilization',
                    accessor: 'projectedBenefitUtil',
                    },
                    {
                    Header: 'Projected Class Difficulty',
                    accessor: 'projectedClassDifficulty',
                    },
                    {
                    Header: 'Latest GPA',
                    accessor: 'latestGPA',
                    },
                    {
                    Header: 'Ethnicity',
                    accessor: 'ethnicity',
                    },
                    {
                    Header: 'Major',
                    accessor: 'major',
                    },
                    {
                    Header: 'Zip Code',
                    accessor: 'zip',
                    },
                    {
                    Header: 'Composite Score',
                    accessor: 'composite',
                    sortType: compareNumericString,
                    },
                    
                    
                ];
            const tableHeaderNoHistory =[
                {
                Header: 'Student ID',
                accessor: 'studentID', // accessor is the "key" in the data
                },
                {
                Header: 'Projected GPA',
                accessor: 'projectedGPA',
                sortType: compareNumericString,
                },
                {
                Header: 'Classes Registered',
                accessor: 'classesRegistered',
                }
            ];
            const tableHeaderClass =[
                {
                Header: 'Class',
                accessor: 'class', // accessor is the "key" in the data
                },
                {
                Header: 'Class Data Count',
                accessor: 'classDataCount',
                },
                {
                Header: 'Current Enrolled Count',
                accessor: 'currentEnrolledCount',
                },
                {
                Header: 'Classes Average Grade',
                accessor: 'classAverageGrade',
                }
            ];

            var studentData = [];
            const studentDataHeader =[
                {
                Header: 'Student ID',
                accessor: 'studentID', // accessor is the "key" in the data
                },
                {
                Header: 'Term',
                accessor: 'term', // accessor is the "key" in the data
                },
                {
                Header: 'Course',
                accessor: 'course', // accessor is the "key" in the data
                },
                {
                Header: 'Grade Earned',
                accessor: 'gradeEarned', // accessor is the "key" in the data
                },
                {
                Header: 'Course Average Grade',
                accessor: 'gradeAverage', // accessor is the "key" in the data
                },
                {
                Header: 'Grade Difference',
                accessor: 'gradeDifference'
                },
                {
                Header: 'Term GPA',
                accessor: 'termGPA', // accessor is the "key" in the data
                },
                
                
            ]
            var tableNoHistoryData = [];
            var tableClassData = [];
            var tableHead = ( <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Has Classes Next Term</th>
                    <th>Average GPA Performance</th>
                    <th>Progress Slope</th>
                    <th>Class Correlation</th>
                    <th>Terms Attended</th>
                    <th>Units Attempted</th>
                    <th>Units Passed</th>
                    <th>Pass Rate</th>
                    <th>Average Units Passed Per Term</th>
                    <th>Average Benefit Utilization</th>
                    <th>Projected Benefit Utilization</th>
                    <th>Projected Class Difficulty</th>
                    <th>GPA</th>
                    <th>Ethnicity</th>
                    <th>Major</th>
                    <th>Zip</th>
                    <th>Composite Score</th>
                </tr>
            </thead> );
            var returningStudentCount = 0;
            var newStudentCount = 0;
            var noRegistrationCount = 0;
            var processed = this.props.processedData;
            var courses = this.props.courseData[0];
            console.log(courses);
            var enrollment = this.props.enrollment;
            console.log(enrollment);
            var chart = [];
            var statisticsChart = [];
            var classChart = [];
            var preChart = [];
            var studentTable = [];
            studentTable.push(tableHead);
            var hasPreviousData = [];
            var dataStatistics = [];
            var courseGPA = [];
            var courseDataCount = [];
            var combinationChart = [];
            var combinationRef = React.createRef();
            combinationChart['datasets'] = [];
            combinationChart['labels'] = [];
            var courseCharts = [];
            var courseCounts = [];
            var newRegistrationCharts = [];
            console.log(enrollment);
            var tutorTableData = [];
            const tutorDataHeader =[
                {
                Header: 'Course',
                accessor: 'course', // accessor is the "key" in the data
                },
                {
                Header: 'Course Link',
                accessor: 'courseLink', // accessor is the "key" in the data
                },
                {
                Header: 'Grade Earned',
                accessor: 'gradeEarned', // accessor is the "key" in the data
                },
                {
                    Header: 'Grade Value',
                    accessor: 'gradeValue', // accessor is the "key" in the data
                },
                {
                Header: 'Tutor or Needs Tutor',
                accessor: 'tutorOrNeeds', // accessor is the "key" in the data
                },
                {
                Header: 'Student ID',
                accessor: 'studentID', // accessor is the "key" in the data
                },
                {
                Header: ' Term',
                accessor: 'term', // accessor is the "key" in the data
                }
            ]
            var chartOptions = {
                interaction: {
                    mode: 'index'
                },
                scales: {
                    y: {
                        min: 0,
                        max: 21,
                        position: 'left',
                        ticks: {
                            color: '#FFD700'
                        }    
                    },
                    y1: {
                        min: 0,
                        max: 4,
                        position: 'left',
                        ticks: {
                            color: 'green'
                        }                                     
                    },
                    y2: {
                        min: 0,
                        max: 1,
                        position: 'left',
                        ticks: {
                            color: 'blue'
                        }                            
                    }          
                },
                animation: {
                    duration: 0
                },
                maintainAspectRatio: true,
                responsive: true,
                aspectRatio: 4,
            }
            var chartOptionsMega = {
                scales: {
                    y: {
                        min: 0,
                        max: 21,
                        position: 'left',
                        ticks: {
                            color: 'orange'
                        }    
                    },
                    y1: {
                        min: 0,
                        max: 4,
                        position: 'left',
                        ticks: {
                            color: 'green'
                        }                                     
                    },
                    y2: {
                        min: 0,
                        max: 1,
                        position: 'left',
                        ticks: {
                            color: 'blue'
                        }                            
                    }                     
                },
                animation: {
                    duration: false
                },
                responsive: true,
                aspectRatio: 3,
            }

            var chartOptionsGrades = {
                responsive: true,
            }
            const uniqueSort = (arr = []) => {
                const map = {};
                const res = [];
                for (let i = 0; i < arr.length; i++) {
                if (!map[arr[i]]) {
                    map[arr[i]] = true;
                    res.push(arr[i]);
                };
                };
                return res.sort((a, b) => a - b);
            };
            
            function statisticsToBarChartDataBuilder(label, statisticsObject) 
            {
                statisticsObject.sort((a, b) => a.value - b.value);
                var barData = {};
                Object.keys(statisticsObject[0]).forEach(function(key) {
                    barData[key] = [];
                });
                for (const [key, value] of Object.entries(statisticsObject)) {
                    for (const [objectKey, objectValue] of Object.entries(value)) {
                        barData[objectKey].push(objectValue);
                    }
                }

                var chartData = {
                    labels: barData['value'],
                    datasets:  [
                        {
                            id: uuidv4(),
                            label: label,
                            data: barData['relative']
                        }
                    ]
                }
                return chartData;
            }

            function historicalGradesBarChartBuilder(label, enrollmentObject) 
            {
                var barColors = [];
                var enrollmentOrdered = Object.keys(enrollmentObject).sort().reduce(
                (obj, key) => { 
                    obj[key] = enrollmentObject[key]; 
                    return obj;
                }, 
                {}
                );

                Object.keys(enrollmentOrdered).forEach(function(key) {
                    if (key === 'A') {
                        barColors.push('rgba(54, 162, 235, 0.75)');
                    } else if (key === 'B') {
                        barColors.push('rgba(75, 192, 192, 0.75)');
                    } else if (key === 'C') {
                        barColors.push('rgba(255, 205, 86, 0.75)');
                    } else if (key === 'D') {
                        barColors.push('rgba(255, 159, 64, 0.75)');
                    } else if (key === 'F') {
                        barColors.push('rgba(255, 99, 132, 0.75)');
                    } else {
                        barColors.push('rgba(0, 0, 0, 0.75)');
                    }

                })
                var chartData = {
                    labels: Object.keys(enrollmentOrdered),
                    datasets:  [
                        {
                            id: uuidv4(),
                            label: label,
                            data: Object.values(enrollmentOrdered),
                            backgroundColor: barColors
                        }
                    ]
                }
                return chartData;
            }
            async function cycleData() {
                var combinationRefData = combinationRef.current.data.datasets;
                combinationRefData.forEach(async function(ds) {
                    ds.hidden = !ds.hidden;
                });
                combinationRef.current.update();
                combinationRefData.forEach(async function(ds, index) {
                    // The modulo checks to see if the amount of lines being drawn per student on the "combination chart".
                    // It looks ahead n values, and displays the lines in "chunks".
                    if ( (index % 4) === 0) {
                        sleep(5).then(() => {
                            ds.hidden = false;
                            combinationRefData[index+1].hidden = false;
                            combinationRefData[index+2].hidden = false;
                            combinationRefData[index+3].hidden = false;
                            combinationRef.current.update();

                        });
                        sleep(5).then(() => {
                            ds.hidden = true;
                            combinationRefData[index+1].hidden = true;
                            combinationRefData[index+2].hidden = true;
                            combinationRefData[index+3].hidden = true;
                            combinationRef.current.update();

                        });
                    }
                    
                });
                combinationRef.current.update();
            }

            function getSum(array) {
                return array.reduce(function(a, b) { return a + b; }, 0)
            }

            function getGPA(qualityPointsArray, unitsArray) {
                var qualityPointsSum = getSum(qualityPointsArray);
                var unitsSum = getSum(unitsArray);
                return qualityPointsSum/unitsSum;
            }
            function getQualityPoints(gradeValue, units) {
                return gradeValue*units;
            }
            
            try {
                var coursesOrdered = Object.keys(courses).sort().reduce(
                    (obj, key) => { 
                        obj[key] = courses[key]; 
                        return obj;
                    }, 
                    {}
                    );
                enrollment.forEach((enroll) => {
                    // console.log(enroll);
                    var thisCourse = enroll.SUBJECT_CODE + enroll.COURSE_NUMBER;
                    if (!courseCounts[thisCourse]) {
                        courseCounts[thisCourse] = 1;
                    } else {
                        courseCounts[thisCourse]++;
                    }
                });
                Object.keys(coursesOrdered).forEach(function(course) {
                    var thisChartData = historicalGradesBarChartBuilder(course, coursesOrdered[course]['grades']);
                    var gpaSum = 0;
                    var gradeSum = 0;
                    Object.keys(coursesOrdered[course]['grades']).forEach(function(grade) {
                        gpaSum += getGradeValue(grade) * coursesOrdered[course]['grades'][grade]
                        gradeSum += coursesOrdered[course]['grades'][grade]
                    });
                    if (gradeSum === 1) {
                        var gradeLang = "Grade";
                    } else {
                        var gradeLang = "Grades";
                    }
                    var averageGrade = (gpaSum/gradeSum).toFixed(1);
                    courseGPA[course] = averageGrade;
                    courseDataCount[course] = gradeSum;
                    if (courseCounts[course]) {
                        var useCourse = courseCounts[course];
                    } else {
                        var useCourse = 0;
                    }
                    tableClassData.push({
                        //(<a id={student.toString() + "_link"} href={"#" + student.toString()}>{student.toString() }</a>),
                        class: (<a id={"table_" + course} href={"#" + course}>{course}</a>),
                        classDataCount: gradeSum,
                        currentEnrolledCount: useCourse,
                        classAverageGrade: averageGrade
                    })
                    courseCharts.push(<div id={course} className="gradeChartCenter" style={{textAlign: 'center', position: 'relative', height: '10vh', width: '10vw', float: 'left'}}>
                                        <div className="gradeBox" style={{backgroundColor: getGPAColor(averageGrade)}}>
                                            <a href={'#table_' + course}>{course}</a>
                                            <br/>
                                            {averageGrade}
                                            <br/>
                                            <span style={{fontSize: '8pt'}}>(n={gradeSum}) {gradeLang}</span>
                                            </div>
                                            <Bar data={thisChartData}/>
                                        </div>);
                });
            } catch {
                
            }
            processed.forEach((lineDatum) => {
                var counter = 0;
                for (const [student, termData] of Object.entries(lineDatum)) {
                    var englishCourse = '';
                    var mathCourse = '';
                    counter++;
                    if (counter % 2 === 0) {
                        var css = 'even';
                    } else {
                        var css = 'odd';
                    }
                    var previousClassGrades = [];
                    var thisStudentProjectedGrades = [];
                    var projectedHTML = [];
                    var studentEnrollment = enrollment.filter(function (enrolled) {
                        return enrolled.ID.toString() === student.toString();
                    });
                    var hasClasses = 'No';
                    var projectedDifficulty = 0;
                    var finalDifficulty = 0;
                    var classCount = 0;
                    var comparisonVars;
                    var gradeCorrelationStats;
                    var gradeCorrelationCoefficient;
                    
                    var nodeData = [];
                    var classAverageData = {};
                    classAverageData['id'] = '';
                    classAverageData['data'] = [];
                    classAverageData['label'] = 'Average Class GPA';
                    classAverageData['borderColor'] = 'purple';
                    classAverageData['yAxisID'] = 'y1';

                    var aboveOrBelowGrade = [];
                    var gradeComparison = [];
                    var gpaSlope = [];
                    gpaSlope['point1'] = [];
                    gpaSlope['point2'] = [];
                    gpaSlope['point1']['x'] = 0;
                    gpaSlope['point1']['y'] = 0;
                    gpaSlope['point2']['y'] = 0;
                    gpaSlope['point2']['x'] = 0;

                    var studentGPADifference = [];
                    console.log(processed);
                    try {
                        // Building data for nodal charts.
                        Object.keys(processed).forEach(process => {
                            Object.keys(processed[process]).forEach(function(studentNode) {
                                if (studentNode === student) {
                                    studentData[student] = [];
                                    nodeData.push({data: { id: studentNode, label: studentNode, color: '#f5f5f5' }});
                                    var termLength = Object.keys(processed[process][studentNode]).length-1;
                                    var termCounter = 0;
                                    Object.keys(processed[process][studentNode]).forEach(function(term) {
                                        var thisTermGPASum = 0;
                                        if (termCounter === 0) {
                                            gpaSlope['point1']['x'] = 0;
                                            gpaSlope['point1']['y'] = processed[process][studentNode][term].gpa;
                                        }
                                        if (termCounter === termLength) {
                                            gpaSlope['point2']['x'] = termLength;
                                            gpaSlope['point2']['y'] = processed[process][studentNode][term].gpa;
                                            
                                        }
                                        termCounter++;
                                        nodeData.push({data: { id: studentNode + term, label: term, parent: studentNode, color: '#f5f5f5', }});
                                        var processConnections = [];
                                        // console.log(term);
                                        // If this statement isn't included, charts will generate double-connected nodes.
                                        for (var i = 0; i < Object.keys(processed[process][studentNode][term].courses).length; i++) {
                                            studentData[student].push({
                                                studentID: (<a id={student.toString() + "_link"} href={"#" + student.toString()}>{student.toString() }</a>),
                                                term: term,
                                                termGPA: processed[process][studentNode][term].gpa.toFixed(1),
                                                course: (<a id={student +"_table_" + processed[process][studentNode][term].courses[i]} href={"#" + processed[process][studentNode][term].courses[i]}>{processed[process][studentNode][term].courses[i]}</a>),
                                                gradeEarned: processed[process][studentNode][term].grades[i],
                                                gradeAverage: courseGPA[processed[process][studentNode][term].courses[i]],
                                                gradeDifference: (Number(processed[process][studentNode][term].grades[i]) - Number(courseGPA[processed[process][studentNode][term].courses[i]])).toFixed(1)
                                                
                                            })
                                            // if (!tutorData[processed[process][studentNode][term].courses[i]])
                                            // {
                                            //     tutorData[processed[process][studentNode][term].courses[i]] = [];
                                            //     tutorData[processed[process][studentNode][term].courses[i]]['tutorCandidate'] = [];
                                            //     tutorData[processed[process][studentNode][term].courses[i]]['needsTutor'] = [];
                                            // }
                                            var useTutorFlag = false;
                                            if (processed[process][studentNode][term].grades[i] >= 4.0) {
                                                if (Object.keys(studentEnrollment).length > 0) {
                                                    studentEnrollment.forEach((enrollment) => {
                                                            if (enrollment.ID === student) {
                                                                useTutorFlag = true;
                                                            }
                                                        })
                                                }
                                                if (useTutorFlag === true) {
                                                    tutorTableData.push({
                                                        course: processed[process][studentNode][term].courses[i],
                                                        courseLink: (<a id={student +"_table_" + processed[process][studentNode][term].courses[i]} href={"#" + processed[process][studentNode][term].courses[i]}>{processed[process][studentNode][term].courses[i]}</a>),
                                                        tutorOrNeeds: 'Tutor',
                                                        gradeValue: processed[process][studentNode][term].gradesActual[i],
                                                        gradeEarned: processed[process][studentNode][term].grades[i],
                                                        studentID: (<a id={student.toString() + "_link"} href={"#" + student.toString()}>{student.toString() }</a>),
                                                        term: term
                                                    })
                                                }
                                            }
                                            var useTutoringFlag = false;
                                            if (processed[process][studentNode][term].grades[i] < 2.0) {
                                                if (Object.keys(studentEnrollment).length > 0) {
                                                studentEnrollment.forEach((enrollment) => {
                                                         if (enrollment.ID === student) {
                                                            if ((enrollment.SUBJECT_CODE + enrollment.COURSE_NUMBER).toString() === processed[process][studentNode][term].courses[i]) {
                                                                tutorTableData.push({
                                                                    course: processed[process][studentNode][term].courses[i],
                                                                    courseLink: (<a id={student +"_table_" + processed[process][studentNode][term].courses[i]} href={"#" + processed[process][studentNode][term].courses[i]}>{processed[process][studentNode][term].courses[i]}</a>),
                                                                    tutorOrNeeds: 'Needs Tutor',
                                                                    gradeValue: processed[process][studentNode][term].gradesActual[i],
                                                                    gradeEarned: processed[process][studentNode][term].grades[i],
                                                                    studentID: (<a id={student.toString() + "_link"} href={"#" + student.toString()}>{student.toString() }</a>),
                                                                    term: enrollment.TERM_CODE
                                                                })
                                                            }
                                                         }
                                                     })
                                                 }
                                             }

                                        }
                                        if (Object.keys(processed[process][studentNode][term].courses).length === 1) {
                                            for (var i = 0; i < Object.keys(processed[process][studentNode][term].courses).length; i++) {
                                                nodeData.push({data: { id: processed[process][studentNode][term].courses[i], label: processed[process][studentNode][term].courses[i] + "\n(Earned: " + processed[process][studentNode][term].grades[i] + "/Average: " + + courseGPA[processed[process][studentNode][term].courses[i]] + ")", color: getGPAColor(courseGPA[processed[process][studentNode][term].courses[i]]), parent: studentNode + term }});
                                                thisTermGPASum = courseGPA[processed[process][studentNode][term].courses[i]];
                                                
                                                classAverageData['data'].push(thisTermGPASum);
                                                gradeComparison.push({ earned: Number(processed[process][studentNode][term].grades[i].toFixed(1)), anticipated: Number(courseGPA[processed[process][studentNode][term].courses[i]])});
                                            }
                                        } else {
                                            thisTermGPASum = courseGPA[processed[process][studentNode][term].courses[0]]
                                            gradeComparison.push({ earned: Number(processed[process][studentNode][term].grades[0].toFixed(1)), anticipated: Number(courseGPA[processed[process][studentNode][term].courses[0]])});

                                            for (var i = 1; i < Object.keys(processed[process][studentNode][term].courses).length; i++) {
                                                gradeComparison.push({ earned: Number(processed[process][studentNode][term].grades[i].toFixed(1)), anticipated: Number(courseGPA[processed[process][studentNode][term].courses[i]])});

                                                for (var j = 0; j < Object.keys(processed[process][studentNode][term].courses).length; j++) {

                                                    if (Object.keys(processed[process][studentNode][term].courses).length === 1) {
                                                        nodeData.push({data: { id: processed[process][studentNode][term].courses[i], label: processed[process][studentNode][term].courses[i] + "\n(Earned: " + processed[process][studentNode][term].grades[i] + "/Average: " + courseGPA[processed[process][studentNode][term].courses[i]] + ")", color: getGPAColor(courseGPA[processed[process][studentNode][term].courses[i]]), parent: studentNode + term }});
                                                        nodeData.push({data: { source: processed[process][studentNode][term].courses[i], target: processed[process][studentNode][term].courses[j], label: processed[process][studentNode][term].gpa.toFixed(1), color: '#f5f5f5', width: .1, color: getGPAColor(processed[process][studentNode][term].gpa.toFixed(1))}});
                                                        // console.log('j loop');
                                                        
                                                    }
                                                    if (processed[process][studentNode][term].courses[i] !== processed[process][studentNode][term].courses[j])
                                                    {  
                                                        if (!(processConnections.includes(processed[process][studentNode][term].courses[i]) && !processConnections.includes(processed[process][studentNode][term].courses[j])))
                                                        {
                                                            if (processed[process][studentNode][term].gpa.toFixed(1) === '0.0') {
                                                                var nodeWidth = .1;
                                                            } else {
                                                                var nodeWidth = processed[process][studentNode][term].gpa.toFixed(1);
                                                            }
                                                            nodeData.push({data: { id: processed[process][studentNode][term].courses[i], label: processed[process][studentNode][term].courses[i] + "\n(Earned: " + processed[process][studentNode][term].grades[i] + "/Average: " + + courseGPA[processed[process][studentNode][term].courses[i]] + ")", color: getGPAColor(courseGPA[processed[process][studentNode][term].courses[i]]), parent: studentNode + term }});
                                                            nodeData.push({data: { id: processed[process][studentNode][term].courses[j], label: processed[process][studentNode][term].courses[j] + "\n(Earned: " + processed[process][studentNode][term].grades[j] + "/Average: " + + courseGPA[processed[process][studentNode][term].courses[j]] + ")", color: getGPAColor(courseGPA[processed[process][studentNode][term].courses[j]]), parent: studentNode + term }});
                                                            nodeData.push({data: { source: processed[process][studentNode][term].courses[i], target: processed[process][studentNode][term].courses[j], label: processed[process][studentNode][term].gpa.toFixed(1), width: nodeWidth/1.2, color: getGPAColor(processed[process][studentNode][term].gpa.toFixed(1))}});
                                                            processConnections.push(processed[process][studentNode][term].courses[i]);
                                                            processConnections.push(processed[process][studentNode][term].courses[j]);
                                                        }
                                                    }   
                                                    
                                                    // console.log(thisTermGPASum);
                                                }
                                                thisTermGPASum = parseFloat(thisTermGPASum) + parseFloat(courseGPA[processed[process][studentNode][term].courses[i]]);
                                            }
                                            
                                        }
                                        // 5/9/2022
                                        // console.log(processed[process][studentNode][term]);
                                        // console.log(thisTermGPASum);
                                        var gpaDifference = processed[process][studentNode][term]['gpa'] - (thisTermGPASum/Object.keys(processed[process][studentNode][term].courses).length);
                                        
                                        // console.log(studentNode);
                                        // console.log(gradeComparison);
                                        aboveOrBelowGrade.push(gpaDifference);
                                        // console.log(Object.keys(processed[process][studentNode][term].courses).length);
                                        classAverageData['data'].push((thisTermGPASum/Object.keys(processed[process][studentNode][term].courses).length));
                                        
                                        
                                    })
                                    studentGPADifference[student] = average(aboveOrBelowGrade);
                                }
                                
                            })
                            comparisonVars = {
                                earned: 'metric',
                                anticipated: 'metric'
                            }
                            gradeCorrelationStats = new Statistics(gradeComparison, comparisonVars);
                            gradeCorrelationCoefficient = gradeCorrelationStats.correlationCoefficient('anticipated', 'earned');
                            // console.log(gradeComparison);
                            // console.log(gradeCorrelationCoefficient);
                        })
                        // console.log(tutorData);
                    } catch(e) {
                        // console.log(e);
                    }
                    if (Object.keys(studentEnrollment).length > 0) {
                        returningStudentCount++;
                        hasPreviousData.push(student);
                        hasClasses = 'Yes';
                        projectedHTML.push(<h2 style={{textAlign: 'center'}}>Current Enrollment Information</h2>);
                        projectedHTML.push(<p style={{textAlign: 'center'}}>These are the grades awarded to students for the classes this student is enrolled in. These are not grades for the current student.</p>);
                        studentEnrollment.forEach((enrollment) => {
                            var thisCourse = enrollment.SUBJECT_CODE + enrollment.COURSE_NUMBER;

                            if (enrollment.SUBJECT_CODE === "MATH") {
                                if (enrollment.COURSE_NUMBER > mathCourse) {
                                    mathCourse = enrollment.COURSE_NUMBER;
                                }
                            }
                            if (enrollment.SUBJECT_CODE === "ENGL") {
                                if (enrollment.COURSE_NUMBER > englishCourse) {
                                    englishCourse = enrollment.COURSE_NUMBER;
                                }
                            }
                            if (courseDataCount[thisCourse] === 1) {
                                var gradeLang = "Grade";
                            } else {
                                var gradeLang = "Grades";
                            }
                            try {
                                classCount++;
                                var thisChartData = historicalGradesBarChartBuilder(thisCourse, courses[thisCourse]['grades']);
                                projectedDifficulty = Number(projectedDifficulty) + Number(courseGPA[thisCourse]);
                                var adjustedForecastGrade = (Number(studentGPADifference[student]) + Number(courseGPA[thisCourse])).toFixed(1);
                                thisStudentProjectedGrades.push(<div className="gradeChartCenter" style={{textAlign: 'center', position: 'relative', height: '10vh', width: '10vw', float: 'left'}}><div className="gradeBox" style={{backgroundColor: getGPAColor(courseGPA[thisCourse])}}>{enrollment.TERM_CODE}<br/>{courseGPA[thisCourse]}<br/><div className="gradeBox" style={{margin: '5px', color: 'black', backgroundColor: getGPAColor(adjustedForecastGrade)}}>{adjustedForecastGrade}<br/><span style={{fontSize: '8pt'}}>Based On Averages</span></div><span style={{fontSize: '8pt'}}>(n={courseDataCount[thisCourse]}) {gradeLang}</span></div><Bar data={thisChartData}/></div>);
                            } catch {
                                classCount--;
                                thisStudentProjectedGrades.push(<div className="gradeChartCenter" style={{textAlign: 'center', position: 'relative', height: '10vh', width: '10vw', float: 'left'}}>No data for {thisCourse}</div>);
                            }
                            
                        });
                        finalDifficulty = (projectedDifficulty/classCount).toFixed(1);
                        if (classCount === 0) {
                            finalDifficulty = 0;
                        }
                    } else {
                        noRegistrationCount++;
                    }


                    var lastTwoSlope = 0;
                    var dataAggregation = {};
                    var unitsPassed = 0;
                    var studentUnitSum = 0;
                    var termsAttended = 0;
                    var termsAttended12 = 0;
                    var studentColorGPA = 'green';

                    
                    // Build the object for each student.
                    var studentChart = {};
                    studentChart['labels'] = [];
                    studentChart['datasets'] = []; 
                    studentChart['datasets']['labels'] = [];
                    studentChart['datasets']['data'] = [];

                    // Build the object for student GPA data.
                    var gpaDataset = {};
                    gpaDataset['id'] = '';
                    gpaDataset['data'] = [];
                    gpaDataset['label'] = '';
                    gpaDataset['borderColor'] = studentColorGPA;
                    gpaDataset['yAxisID'] = 'y1';

                    // Build the object for unit data
                    var unitDataset = {};
                    unitDataset['id'] = '';
                    unitDataset['data'] = [];
                    unitDataset['label'] = '';
                    unitDataset['borderColor'] = studentColorGPA;
                    unitDataset['yAxisID'] = 'y1';

                    var unitsAttempted = {};
                    unitsAttempted['id'] = '';
                    unitsAttempted['data'] =[];
                    unitsAttempted['label'] = '';
                    unitsAttempted['borderColor'] = 'darkorange';
                    unitsAttempted['yAxisID'] = 'y';

                    var unitsActual = {};
                    unitsActual['id'] = '';
                    unitsActual['data'] = [];
                    unitsActual['actualPassed'] = [];
                    unitsActual['label'] = '';
                    unitsActual['borderColor'] = 'red';
                    unitsActual['yAxisID'] = 'y';

                    var benefitUtilization = {};
                    benefitUtilization['id'] = '';
                    benefitUtilization['data'] = [];
                    benefitUtilization['label'] = '';
                    benefitUtilization['borderColor'] = unitsActualColor;
                    benefitUtilization['yAxisID'] = 'y2';
        
                    for (const [term, grades] of Object.entries(termData)) {
                        var unitsAttemptedThisTerm = 0;
                        var unitsPassedThisTerm = 0;
                        var thisTermValue = 0;
                        if (String(term).slice(-2) === '60')
                        {
                            thisTermValue += .5;
                        } else {
                            thisTermValue += 1;
                        }
                        termsAttended += thisTermValue;

                        
                        for (const [gradeIndex, gradeValue] of Object.entries(grades['grades'])) {
                            unitsAttemptedThisTerm += grades['units'][gradeIndex];
                            if (gradeValue >= 2) { // Cs are passing.
                                unitsPassed += grades['units'][gradeIndex];
                                unitsPassedThisTerm += grades['units'][gradeIndex];
                            }
                        }
                        
                        studentChart['labels'].push(term);
                        combinationChart['labels'].push(term);
                        
                        gpaDataset['id'] = uuidv4();
                        gpaDataset['tension'] = 0.1;
                        gpaDataset['fill'] = false;
                        gpaDataset['label'] = student + ' GPA';
                        gpaDataset['data'].push(grades['gpa']);

                        unitDataset['id'] = uuidv4();
                        unitDataset['tension'] = 0.1;
                        unitDataset['fill'] = false;
                        unitDataset['label'] = student + ' Units';

                        var termUnitSum = grades['units'].reduce(function(a, b) { return a + b; }, 0);
                        studentUnitSum += termUnitSum;
                        unitDataset['data'].push(termUnitSum);

                        if (termUnitSum >= 12) {
                            termsAttended12 += thisTermValue;
                        }
                        var unitsAttemptedValue = unitsAttemptedThisTerm/thisTermValue;
                        var unitsAttemptedColor = 'orange';

                        // Get effective units taken during each semester.
                        unitsAttempted['id'] = uuidv4();
                        unitsAttempted['tension'] = 0.1;
                        unitsAttempted['fill'] = false;
                        unitsAttempted['label'] = student + ' Units Attempted';
                        unitsAttempted['data'].push(unitsAttemptedValue);
                        unitsAttempted['borderColor'] = unitsAttemptedColor;

                        var unitsActualValue = unitsPassedThisTerm/thisTermValue;
                        var unitsActualPercentage = unitsActualValue/unitsAttemptedValue;
                        var unitsActualColor = '';                   

                        // Get effective units taken during each semester.
                        unitsActual['id'] = uuidv4();
                        // unitDataset['cubicInterpolationMode'] = 'monotone';
                        unitsActual['tension'] = .1;
                        unitsActual['fill'] = false;
                        unitsActual['label'] = student + ' Units Actual';
                        unitsActual['data'].push(unitsActualValue);
                        unitsActual['borderColor'] = getActualUnitsColor(unitsActualValue);


                        benefitUtilization['id'] = uuidv4();
                        benefitUtilization['tension'] = .1;
                        benefitUtilization['fill'] = false;
                        benefitUtilization['label'] = student + ' Benefit Utilization';

                        var benefitValue = 0;
                        if (unitsAttemptedValue > 12) {
                            benefitValue = ((((unitsActualValue/unitsAttemptedValue)*15))/15).toFixed(1);
                        } else if (unitsAttemptedValue >= 7 && unitsAttemptedValue <= 12) {
                            benefitValue = (((unitsActualValue/unitsAttemptedValue)*12)/15).toFixed(1);
                        } else {
                            benefitValue = (((unitsActualValue/unitsAttemptedValue)*unitsAttemptedValue)/15).toFixed(1);
                        }

                        benefitUtilization['data'].push(benefitValue);
                        benefitUtilization['borderColor'] = 'blue';

                    }
                    
                    studentChart['datasets'].push(classAverageData);
                    studentChart['datasets'].push(gpaDataset);
                    studentChart['datasets'].push(unitsActual);
                    studentChart['datasets'].push(unitsAttempted);
                    studentChart['datasets'].push(benefitUtilization);
                    combinationChart['datasets'].push(gpaDataset);
                    combinationChart['datasets'].push(unitsActual);
                    combinationChart['datasets'].push(unitsAttempted);
                    combinationChart['datasets'].push(benefitUtilization);

                    var passRate = (unitsPassed/studentUnitSum).toFixed(1);
                    var passColor = getPassRateColor(passRate);
                    var averageBenefitUtil = average(benefitUtilization['data']).toFixed(1);
                    // 
                    var usePassRate = 0;
                    if (passRate === 0)
                    {
                        usePassRate = .01;
                    } else  {
                        usePassRate = passRate;
                    }

                    dataAggregation['id'] = student.toString();
                    dataAggregation['terms'] = termsAttended;
                    if (termUnitSum > 0) {
                        dataAggregation['terms12'] = termsAttended12;
                    }
                    dataAggregation['units'] = studentUnitSum;
                    dataAggregation['unitsPassed'] = unitsPassed;
                    dataAggregation['passRate'] = passRate;
                    dataAggregation['avgUnitsPassedPerTerm'] = Number((unitsPassed/termsAttended).toFixed(1)).toFixed(1);
                    dataAggregation['benefitUtilization'] = average(benefitUtilization['data']).toFixed(1);
                    dataAggregation['gpa'] = average(gpaDataset['data']).toFixed(1);
                    
                    var termsAttendedNormalized = (4-dataAggregation['terms']);
                    if (termsAttendedNormalized <= 0) {
                        termsAttendedNormalized = .001;
                    }
                    // Arbitrary value, relative to how confident the rate of pursuit is based on previous experience.
                    dataAggregation['projectedBenefitUtil'] = Number((((dataAggregation['avgUnitsPassedPerTerm']*dataAggregation['terms'])/(dataAggregation['terms']*15)))*dataAggregation['passRate']).toFixed(1);
                    
                    dataStatistics.push(dataAggregation);
                    if (finalDifficulty === 0) {
                        finalDifficulty = 1+finalDifficulty;
                        var noDataFlag = (<span style={{fontSize: '8pt'}}><br/>No Data.</span>)
                    } else {
                        var noDataFlag = '';
                    } 
                    var difficultyScore = (finalDifficulty*dataAggregation['gpa']).toFixed(1);
                    
                    if (hasClasses === 'Yes') {
                        var hasClassesValue = 1;
                    } else {
                        var hasClassesValue = .1;
                    }
                    // gpaSlope['point1'] = [];
                    // gpaSlope['point2'] = [];
                    // gpaSlope['point1']['x'] = 0;
                    // gpaSlope['point1']['y'] = 0;
                    // gpaSlope['point2']['y'] = 0;
                    // gpaSlope['point2']['x'] = 0;
                    var pSlope = ((gpaSlope['point2']['y']-gpaSlope['point1']['y'])/(gpaSlope['point2']['x']-gpaSlope['point1']['x'])).toFixed(1);
                    var pSlopeAdjusted = 1;
                    if (pSlope === "NaN") {
                        pSlope = "Need data.";
                        pSlopeAdjusted = 0;
                    }

                    var compositeScore = ((4 + pSlopeAdjusted) * (4 + average(aboveOrBelowGrade)) * dataAggregation['passRate'] * dataAggregation['projectedBenefitUtil'] * difficultyScore).toFixed(1);
                    var enrollmentDataFound = enrollment.find(e => e.ID.toString() === student.toString());
                    console.log(enrollmentDataFound);
                    try {
                        var ethn = enrollmentDataFound.ETHNIC_DESC;
                        var z = enrollmentDataFound.ADDR_ZIP_5;
                        var major = enrollmentDataFound.MAJOR_DESC;
                    } catch {
                        var ethn = "N/A"
                        var z = "N/A"
                        var major = "N/A"
                    }
                    
                    tableData.push({
                        studentID: (<a id={student.toString() + "_link"} href={"#" + student.toString()}>{student.toString() }</a>),
                        hasClasses: hasClasses,
                        classCorrelation: gradeCorrelationCoefficient['correlationCoefficient'].toFixed(1),
                        progressSlope: pSlope,
                        termsAttended: termsAttended,
                        unitsAttempted: studentUnitSum,
                        unitsPassed: unitsPassed,
                        passRate: dataAggregation['passRate'],
                        avgPassedPerTerm: dataAggregation['avgUnitsPassedPerTerm'],
                        avgBenefitUtil: averageBenefitUtil,
                        projectedBenefitUtil: dataAggregation['projectedBenefitUtil'],
                        projectedClassDifficulty: difficultyScore,
                        aboveOrBelowGrade: average(aboveOrBelowGrade).toFixed(1),
                        latestGPA: dataAggregation['gpa'],
                        ethnicity: ethn,
                        major: major,
                        zip: z,
                        composite: compositeScore,
                    })
                    if (mathCourse === '') {
                        mathCourse = '(NONE)';
                    }
                    if (englishCourse === '') {
                        englishCourse = '(NONE)';
                    }
                    
                    var tableBody = (
                    <tbody>
                        <tr>
                            <td><a id={student.toString() + "_link"} href={"#" + student.toString()}>{student.toString()}</a></td>
                            <td>{hasClasses}</td>
                            <td>{average(aboveOrBelowGrade).toFixed(1)}</td>
                            <td>{pSlope}</td>
                            <td>{gradeCorrelationCoefficient['correlationCoefficient'].toFixed(1)}</td>
                            <td>{termsAttended}</td>
                            <td>{studentUnitSum}</td>
                            <td>{unitsPassed}</td>
                            <td style={{backgroundColor: getPassRateColor(dataAggregation['passRate'])}}>{dataAggregation['passRate']}</td>
                            <td style={{backgroundColor: getActualUnitsColor(dataAggregation['avgUnitsPassedPerTerm'])}}>{dataAggregation['avgUnitsPassedPerTerm']}</td>
                            <td style={{backgroundColor: getPassRateColor(averageBenefitUtil)}}>{averageBenefitUtil}</td>
                            <td style={{backgroundColor: getPassRateColor(dataAggregation['projectedBenefitUtil'])}}>{dataAggregation['projectedBenefitUtil']}</td>
                            <td style={{backgroundColor: getActualUnitsColor(difficultyScore)}}>{difficultyScore}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{compositeScore}</td>
                        </tr>
                    </tbody>);
                    studentTable.push(tableBody);
                    chart.push(
                    <div className={css} style={{border: "5px solid #f5f5f5"}}>
                        <h2 style={{textAlign: 'center'}} id={student.toString()}>{student.toString()}</h2>
                        <h3 style={{textAlign: 'center'}}><a href={'#' + student.toString() + "_link"}>Jump to Table</a></h3>
                        <h4 style={{textAlign: 'center'}}>MATH {mathCourse} | ENGL {englishCourse}</h4>
                        <table className="table center">
                            {tableHead}
                            {tableBody}
                        </table>
                        <Table style={{textAlign: 'center'}} columns={studentDataHeader} data={studentData[student]}/>

                        <div className="center" style={{marginBottom: "-50px", position: "relative", height: "400px",  width:"80vw"}}>
                            <Line datasetIdKey={uuidv4()} key={uuidv4()} options={chartOptions} data={studentChart} />
                        </div>
                        {/* <CyGraph key={uuidv4()} elements={nodeData} /> */}
                        <div className="center">{projectedHTML}</div>
                        <div className="center gradeChartParent">{thisStudentProjectedGrades}</div>
                    </div>
                    )
                    chart.push();
                }
                combinationChart['labels'] = uniqueSort(combinationChart['labels']);
                // chart.push(<Line datasetIdKey={uuidv4()} key={uuidv4()} options={chartOptionsMega} data={combinationChart} ref={combinationRef} />)
                // chart.push(<button onClick={cycleData}>Cycle Data</button>)

                var columnsForStatistics = {
                    // id: 'nominal',
                    terms: 'metric',
                    terms12: 'metric',
                    units: 'metric',
                    unitsPassed: 'metric',
                    avgUnitsPassedPerTerm: 'metric',
                    passRate: 'metric',
                    benefitUtilization: 'metric',
                    gpa: 'metric',
                    projectedBenefitUtil: 'metric',
                }
                var stats = new Statistics(dataStatistics, columnsForStatistics);
                

                try {
                    // console.log('Mean');
                    var meanTerms = stats.arithmeticMean('terms');
                    // console.log(meanTerms);
                    var meanUnits = stats.arithmeticMean('units');
                    // console.log(meanUnits);
                    var meanUnits = stats.arithmeticMean('unitsPassed');
                    // console.log(unitsPassed);
                    var avgUnitsPassedPerTerm = stats.arithmeticMean('avgUnitsPassedPerTerm');
                    // console.log(avgUnitsPassedPerTerm);
                    var passRate = stats.arithmeticMean('passRate');
                    // console.log(passRate);
                    var benefitUtilization = stats.arithmeticMean('benefitUtilization');
                    // console.log(benefitUtilization);

                    // Build charts.
                    for (const [key, value] of Object.entries(columnsForStatistics))  {
                        
                        var chartDataforStatistic = statisticsToBarChartDataBuilder(key, stats.frequencies(key));
                        statisticsChart.push(<Bar data={chartDataforStatistic}/>);
                    }
                    
                } catch(e) {
                    // console.log(e);
                }
                
            })
            var groupedEnrollment = [enrollment],
            groupedResult = enrollment.reduce(function (r, a) {
                r[a.ID] = r[a.ID] || [];
                r[a.ID].push(a);
                return r;
            }, Object.create(null));
            Object.keys(groupedResult).forEach(function(enroll) {
                let buffer = [];
                try {
                    if (!hasPreviousData.includes(String(groupedResult[enroll][0]['ID'])))
                    {
                        var newStudentProjectedGPA = [];
                        var classesRegistered = 0;
                        
                        buffer.push(<h2 id={"no_enroll_" + groupedResult[enroll][0]['ID']}>{groupedResult[enroll][0]['ID']}</h2>);
                        buffer.push(<p className="center"><a href={"#table_no_enroll_" + groupedResult[enroll][0]['ID']}>Jump to Table</a></p>);
                        Object.keys(groupedResult[enroll]).forEach(function(enrolled) {
                            classesRegistered++;
                            var enrolledCourse = groupedResult[enroll][enrolled]['SUBJECT_CODE'] + groupedResult[enroll][enrolled]['COURSE_NUMBER'];
                            var thisChartData = historicalGradesBarChartBuilder(enrolledCourse, coursesOrdered[enrolledCourse]['grades']);
                            var gpaSum = 0;
                            var gradeSum = 0;
                            if (gradeSum === 1) {
                                var gradeLang = "Grade";
                            } else {
                                var gradeLang = "Grades";
                            }
                            Object.keys(coursesOrdered[enrolledCourse]['grades']).forEach(function(grade) {
                                gpaSum += getGradeValue(grade) * coursesOrdered[enrolledCourse]['grades'][grade]
                                gradeSum += coursesOrdered[enrolledCourse]['grades'][grade]
                            });
                            var averageGrade = (gpaSum/gradeSum).toFixed(1);
                            newStudentProjectedGPA.push(averageGrade);
                            courseGPA[enrolledCourse] = averageGrade;
                            buffer.push(<div className="gradeChartCenter" style={{textAlign: 'center', position: 'relative', height: '10vh', width: '10vw', float: 'left'}}><div className="gradeBox" style={{backgroundColor: getGPAColor(averageGrade)}}><span style={{fontSize: '8pt'}}>{groupedResult[enroll][enrolled]['TERM_CODE']}</span><br/>{averageGrade}<br/><span style={{fontSize: '8pt'}}>(n={gradeSum}) {gradeLang}</span></div><Bar data={thisChartData}/></div>)
                        });
                        newRegistrationCharts.push(<div style={{wordBreak: 'break-all'}} className="center gradeChartParent"><p>{buffer}</p></div>);
                        newStudentCount++;
                        tableNoHistoryData.push({
                            studentID: (<a id={"table_no_enroll_" + groupedResult[enroll][0]['ID']} href={"#no_enroll_" + groupedResult[enroll][0]['ID']}>{groupedResult[enroll][0]['ID']}</a>),
                            projectedGPA: average(newStudentProjectedGPA).toFixed(1),
                            classesRegistered: classesRegistered
                        })
                    }
                } catch (e) {
                    // console.log(e);
                }
            });
            this.rendered = true;
            return (
                <>
                    <div key={uuidv4()}>
                        <p style={{clear: 'both', textAlign: 'center'}}>Returning Students: {returningStudentCount}</p>
                        <p style={{clear: 'both', textAlign: 'center'}}>New Students: {newStudentCount}</p>
                        <p style={{clear: 'both', textAlign: 'center'}}>No Registration Old Students: {noRegistrationCount}</p>
                        <div id={"student_snapshot"}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <h1 style={{clear: 'both', textAlign: 'center'}}>Student Snapshot</h1>
                        <p style={{textAlign: 'center'}} >Click on header to sort, Shift + click for additional sorting.</p>
                        <Table style={{textAlign: 'center'}} columns={tableHeaders} data={tableData}/>
                        <div id={"student_details"}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Student Details</h1> 
                        {chart}
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Student Forecast Table</h1>
                        <div id={"student_forecast"}><h1 style={{clear: 'both', color: "#ffffff"}} >-</h1></div>
                        <Table style={{textAlign: 'center'}} columns={tableHeaderNoHistory} data={tableNoHistoryData}/>
                        <div id={"new_student_charts"}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Student Forecast Charts</h1>
                        <div style={{textAlign: 'center'}} className="center">
                        {newRegistrationCharts}
                        </div>
                        <div id={"class_statistics"}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Class Statistics</h1>
                        {courseCharts}
                        <div id={""}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <div id={""}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <div id={""}><h1 style={{clear: 'both', color: "#ffffff"}} >-</h1></div>
                        <h1 id={"class_table"} style={{color: "#ffffff", clear: 'both', textAlign: 'center'}}>Class Data Table</h1>
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Class Data Table</h1>
                        <Table style={{textAlign: 'center'}} columns={tableHeaderClass} data={tableClassData}/>
                        <div id={"tutor_center"}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Tutor Center</h1>
                        <Table style={{textAlign: 'center'}} columns={tutorDataHeader} data={tutorTableData}/>
                        <div id={"statistics_summary"}><h1 style={{color: "#ffffff"}} >-</h1></div>
                        <h1 id={""} style={{clear: 'both', textAlign: 'center'}}>Statistics Summary</h1>
                        {statisticsChart}
                    </div>               
                </>
            )
        }
    }
}
