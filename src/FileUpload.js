import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LineChartProcess from "./LineChartProcess";
import * as XLSX from 'xlsx';
import DynamicColors from './ColorFunctions';

const FileUpload = () => {
    const [lineData, setLineData] = useState([]);
    const [enrollmentData, setEnrollmentData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const filters = {
        minTermValue: {
            valueRef: useRef(),
            label: 'Minimum Term (format YYYYSS, "202040")'
        },
        maxTermValue: {
            valueRef: useRef(),
            label: 'Maximum Term (format YYYYSS, "202040")'
        },
        includeTermValue: {
            valueRef: useRef(),
            label: 'Must Include Term (format YYYYSS, "202040")'
        },
        minGPA: {
            valueRef: useRef(),
            label: 'Minimum GPA (format DD.D, "3.14")'
        },
        maxGPA: {
            valueRef: useRef(),
            label: 'Maximum GPA (format DD.D, "3.14")'
        },
    }
    const filterHTML = [];
    const minTermValue = useRef(); 
    const maxTermValue = useRef();
    const minGPA = useRef();
    const maxGPA = useRef();
    function handleAddData(newData) {
        setLineData(prevLineData => {
          return [...prevLineData, newData]
        })
    }
    function handleEnrollmentAddData(newData) {
        setEnrollmentData(prevEnrollmentData => {
          return [...prevEnrollmentData, newData]
        })
    }
    function handleFilterAddData(newData) {
        setFilterData(prevFilterData => {
          return [...prevFilterData, newData]
        })
    }
    const fileInputField = useRef();
    const enrollmentInputField = useRef();
    const filterInputField = useRef();

    const readExcel = (file) => 
    {
        const formData = [];

        const promise = new Promise((resolve, reject) => {
        
        const fileReader = new FileReader();
        
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const workbook = XLSX.read(bufferArray, { type: "buffer"} );

            const worksheetName = workbook.SheetNames[0];

            const worksheet = workbook.Sheets[worksheetName];

            const data = XLSX.utils.sheet_to_json(worksheet);

            resolve(data);

        };

        fileReader.onerror = (error) => {
            reject(error);
        };
        });
        

        promise.then((d) => {
            setLineData(d);
        });
    }

    const readEnrollmentExcel = (file) => 
    {
        const formData = [];

        const promise = new Promise((resolve, reject) => {
        
        const fileReader = new FileReader();
        
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const workbook = XLSX.read(bufferArray, { type: "buffer"} );

            const worksheetName = workbook.SheetNames[0];

            const worksheet = workbook.Sheets[worksheetName];

            const data = XLSX.utils.sheet_to_json(worksheet);

            resolve(data);

        };

        fileReader.onerror = (error) => {
            reject(error);
        };
        });
        

        promise.then((d) => {
            setEnrollmentData(d);
        });
    }
    const readFilterExcel = (file) => 
    {

        const promise = new Promise((resolve, reject) => {
        
        const fileReader = new FileReader();
        
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            const workbook = XLSX.read(bufferArray, { type: "buffer"} );

            const worksheetName = workbook.SheetNames[0];

            const worksheet = workbook.Sheets[worksheetName];

            const data = XLSX.utils.sheet_to_json(worksheet);

            resolve(data);

        };

        fileReader.onerror = (error) => {
            reject(error);
        };
        });
        

        promise.then((d) => {
            setFilterData(d);
        });
    }
    for (const [index, filter] of Object.entries(filters)) {
        filterHTML.push(<div><label>{filter.label}<br/><input type="text" ref={filter.valueRef}></input></label><br/></div>)
    }
    function buildData(gradeData, enrollmentExcelData, filterData) {
        readExcel(gradeData);
        readEnrollmentExcel(enrollmentExcelData);
        readFilterExcel(filterData);
    }
    return (
        <div >
            {/* const minTermValue = useRef(); 
            const maxTermValue = useRef();
            const minGPA = useRef();
            const maxGPA = useRef(); */}
            <h2 style={{textAlign: 'center'}}>Upload Filter IDs (Optional)</h2>
            <center><input style={{textAlign: 'center'}} key={uuidv4()} type="file" ref={filterInputField} onChange={(e)=>{
                // const enrollmentFile = e.target.files[0];
                // readExcel(enrollmentFile);
            }}
            /></center><br/>
            <h2 style={{textAlign: 'center'}}>Upload Enrollment Data (Optional)</h2>
            <center><input style={{textAlign: 'center'}} key={uuidv4()} type="file" ref={enrollmentInputField} onChange={(e)=>{
                // const enrollmentFile = e.target.files[0];
                // readExcel(enrollmentFile);
            }}
            /></center><br/>
            <h2 style={{textAlign: 'center'}}>Upload Grade Data</h2>
            <center><input style={{textAlign: 'center'}} key={uuidv4()} type="file" ref={fileInputField} onChange={(e)=>{
                const enrollmentFile = enrollmentInputField.current.files[0];
                const filterFile = filterInputField.current.files[0];
                console.log(filterFile);
                const file = e.target.files[0];
                buildData(file, enrollmentFile, filterFile);
            }}
            /></center>
            {/* <h2>Parameter Filters</h2> */}
            {/* {filterHTML} */}
            <LineChartProcess key={uuidv4()} filterData={filterData} enrollment={enrollmentData} data={lineData} />
        </div>
    )
}

export default FileUpload;