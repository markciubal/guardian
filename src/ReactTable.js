import React from 'react'
import { useTable, useSortBy } from 'react-table'
const defaultPropGetter = () => ({})

function getGPAColor(gpa) {
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
  } else if (between(gpa, 0, 0.5)) {
      gpaColor = "#e25c5c";
  }
  return gpaColor;
}
function getGPAPerformanceColor(gpa) {
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
function getPassRateColor(passRate) {
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
  } else if (between(passRateNumber, 0, .1)) {
      passColor = "#e25c5c";
  } 
  return passColor;
}
function getActualUnitsColor(units) {
  var unitRateNumber = parseFloat(units);
  var unitColor = '';
  if (unitRateNumber > 15) {
      unitColor = "#5bff72";
  } else if (between(unitRateNumber, 14, 15)) {
      unitColor = "#5bff72";
  } else if (between(unitRateNumber, 13, 14)) {
      unitColor = "#a0e53d";
  } else if (between(unitRateNumber, 12, 13)) {
      unitColor = "#b5d727";
  } else if (between(unitRateNumber, 9, 12)) {
      unitColor = "#c7c915";
  } else if (between(unitRateNumber, 8, 9)) {
      unitColor = "#d4bb0d";
  } else if (between(unitRateNumber, 7, 8)) {
      unitColor = "#e79d20";
  } else if (between(unitRateNumber, 6, 7)) {
      unitColor = "#eb8e2d";
  } else if (between(unitRateNumber, 5, 6)) {
      unitColor = "#ed803a";
  } else if (between(unitRateNumber, 4, 5)) {
      unitColor = "#ec7346";
  } else if (between(unitRateNumber, 3, 4)) {
      unitColor = "#e96751";
  } else if (between(unitRateNumber, 2, 3)) {
      unitColor = "#e25c5c";
  }  else if (unitRateNumber < 2) {
      unitColor = "#e25c5c";
  }
  return unitColor;
}
function between(x, min, max) {
  return x >= min && x <= max;
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    getHeaderProps = defaultPropGetter,
    getColumnProps = defaultPropGetter,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, 
  useSortBy)

  // Render the UI for your table
  return (
    <table className="table center" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps([column.getSortByToggleProps()])}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps(getRowProps(row))}>
              {row.cells.map(cell => {
                var bgColor = '';
                // bgColor = '#FF00FF';
                if (cell.column.id === 'passRate') {
                  bgColor = getPassRateColor(cell.value);
                } else if (cell.column.id === 'classAverageGrade') {
                  bgColor = getGPAColor(cell.value);
                } else if (cell.column.id === 'gradeEarned') {
                  bgColor = getGPAColor(cell.value);
                } else if (cell.column.id === 'gradeAverage') {
                  bgColor = getGPAColor(cell.value);
                } else if (cell.column.id === 'termGPA') {
                  bgColor = getGPAColor(cell.value);
                } else if (cell.column.id === 'latestGPA') {
                  bgColor = getGPAColor(cell.value);
                } else if (cell.column.id === 'projectedGPA') {
                  bgColor = getGPAColor(cell.value);
                } else if (cell.column.id === 'aboveOrBelowGrade') {
                  bgColor = getGPAPerformanceColor(cell.value * 2);
                }  else if (cell.column.id === 'gradeDifference') {
                  bgColor = getGPAPerformanceColor(cell.value * 2);
                } else if (cell.column.id === 'avgPassedPerTerm') {
                  bgColor = getActualUnitsColor(cell.value);
                } else if (cell.column.id === 'avgBenefitUtil') {
                  bgColor = getPassRateColor(cell.value);
                } else if (cell.column.id === 'projectedBenefitUtil') {
                  bgColor = getPassRateColor(cell.value);
                } else if (cell.column.id === 'projectedClassDifficulty') {
                  bgColor = getActualUnitsColor(cell.value);
                } else {
                  bgColor = "#FFF";
                }
                return(
                  <td
                    // Return an array of prop objects and react-table will merge them appropriately
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: {
                          backgroundColor: bgColor
                        }
                      },
                      getColumnProps(cell.column),
                      getCellProps(cell)
                    ])}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table