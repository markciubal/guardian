import React from 'react'
import { useTable, useSortBy } from 'react-table'
import getGPAColor from './getGPAColor.js';
import getPassRateColor from './getPassRateColor.js';
import getActualUnitsColor from './getActualUnitsColor.js';
import getGPAPerformanceColor from './getGPAPerformanceColor.js';

const defaultPropGetter = () => ({})

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