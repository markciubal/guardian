import React, { useState, useEffect } from "react";
import LineChart from './LineChart';
import { v4 as uuidv4 } from 'uuid';
import getGradeValue from './getGradeValue.js';
export default function LineChartProcess({data, filterData, enrollment}) {
    const [lineData, setStudentData] = useState([]);
    const [courseData, setCourseData] = useState([]);
    const [nodeData, setNodeData] = useState([]);
    console.log(filterData);
    var numberRun = 0;
   
    function getSum(array) {
        return array.reduce(function(a, b) { return a + b; }, 0)
    }
    function average(nums) {
        return nums.reduce((a, b) => a + b) / nums.length;
    }
    function getGPA(qualityPointsArray, unitsArray) {
        var qualityPointsSum = getSum(qualityPointsArray);
        var unitsSum = getSum(unitsArray);
        return qualityPointsSum/unitsSum;
    }
    function getQualityPoints(gradeValue, units) {
        return gradeValue*units;
    }

    useEffect(() => {
        function handleAddStudentData(newData) {
            setStudentData(prevLineData => {
                return [...prevLineData, newData]
            })
            
        }

        function handleAddCourseData(newData) {
            setCourseData(prevCourseData => {
                return [...prevCourseData, newData]
            })
            
        }

        function handleAddNodeData(newData) {
            setNodeData(prevCourseData => {
                return [...prevCourseData, newData]
            })
            
        }

        var studentProcessedData = [];
        var courseProcessedData = [];

        var filterEmpty = true;
        var filterIDs = [];
        try {
            filterData.forEach((filter) => {
                console.log(filter);
                filterIDs.push(filter.ID);
            });
        } catch(e) {
            console.log(e);
        }
        console.log(filterIDs);

        data.forEach((gradeData) => {
            if (filterData === []) {
                filterEmpty = true;
            } else {
                filterEmpty = false;
            }
            // if (filterEmpty || filterIDs.includes(gradeData.ID)) {
                var thisCourse = gradeData.SUBJECT_CODE + gradeData.COURSE_NUMBER;
                var qualityPoints = getQualityPoints(getGradeValue(gradeData.GRADE), gradeData.UNITS);
                if (!courseProcessedData[thisCourse]) {
                    courseProcessedData[thisCourse] = {};
                }
                if (!courseProcessedData[thisCourse]['grades']) {
                    courseProcessedData[thisCourse]['grades'] = {};
                    courseProcessedData[thisCourse]['grades'][gradeData.GRADE] = 0;
                }
                if (!courseProcessedData[thisCourse]['grades'][gradeData.GRADE]) {
                    courseProcessedData[thisCourse]['grades'][gradeData.GRADE] = {};
                    courseProcessedData[thisCourse]['grades'][gradeData.GRADE] = 1;
                } else {
                    courseProcessedData[thisCourse]['grades'][gradeData.GRADE] += 1;
                }
                if (!studentProcessedData[gradeData.ID]) {
                    studentProcessedData[gradeData.ID] = {};
                    studentProcessedData[gradeData.ID][gradeData.TERM_CODE] = {};
                    studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['grades'] = [];
                    studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['gradesActual'] = [];
                    studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['units'] = [];
                    studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['courses'] = [];
                    studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['qualityPoints'] = [];                
                } else {
                    if (!studentProcessedData[gradeData.ID][gradeData.TERM_CODE]) {
                        studentProcessedData[gradeData.ID][gradeData.TERM_CODE] = {};
                    }
                    if (!studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['grades']) {
                        studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['grades'] = [];
                    }
                    if (!studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['gradesActual']) {
                        studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['gradesActual'] = [];
                    }
                    if (!studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['units']) {
                        studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['units'] = [];
                    }
                    if (!studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['courses']) {
                        studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['courses'] = [];
                    }
                    if (!studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['qualityPoints']) {
                        studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['qualityPoints'] = [];
                    }

                }
                studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['grades'].push(getGradeValue(gradeData.GRADE));
                studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['gradesActual'].push(gradeData.GRADE);
                studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['units'].push(gradeData.UNITS);
                studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['courses'].push(thisCourse);
                studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['qualityPoints'].push(qualityPoints);
                studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['gpa'] = getGPA(studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['qualityPoints'], studentProcessedData[gradeData.ID][gradeData.TERM_CODE]['units']);
            // }
        })
        handleAddStudentData(studentProcessedData);
        // console.log(studentProcessedData);
        handleAddCourseData(courseProcessedData);
        // console.log(courseProcessedData);
    }, [data])
    return (
        <div  key={uuidv4()}>
            <LineChart datasetIdKey={uuidv4()} key={uuidv4()} enrollment={enrollment} filterData={filterData} courseData={courseData} processedData={lineData}/>
        </div>
  )
}
