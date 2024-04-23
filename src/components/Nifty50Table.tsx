/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useTable } from "react-table";
import '../App.css'
interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
  }
const StocksTable: React.FC<Props> = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "All Companies ▲", 
        accessor: "All Companies ▲", 
      },
      {
        Header: "LTP", 
        accessor: "LTP", 
      },
      {
        Header: "Change %",
        accessor: "Change %",
      },
      {
        Header: "Weightage",
        accessor: "Weightage",
      },
      {
        Header: "PE Ratio",
        accessor: "PE Ratio",
      },
      {
        Header: "52W High",
        accessor: "52W High",
      },
      {
        Header: "52W Low",
        accessor: "52W Low",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data, columns });

  return (
    <div>
      
    <table {...getTableProps()} style={{ border: 'solid 1px blue', marginTop: '10px' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => ( // Corrected here: iterating over headerGroup.headers
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row); // Moved this line outside of the map function
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} >{cell.render('Cell')}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
};

export default StocksTable;
