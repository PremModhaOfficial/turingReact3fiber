import { useState } from "react"
import TuringInput from "./TuringMoveInput"
import api from "../api"

// # this is a table for the turing machine

export default function Table() {

    let [tableDimentions, setTableDimentions] = useState({ rows: [0, 1, 2], cols: ['a', 'b', 'c'] })

    return (
        <form method="POST" action="null" onSubmit={e => {
            e.preventDefault()
            console.log(e.target)
            api.post('config', e)
        }}>
            <table color="red" border={1}>
                <thead>
                    <tr>
                        <th> </th>
                        {tableDimentions.cols.map((col, i) => <th key={i}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableDimentions.rows.map((row, i) => (
                        <tr key={i}>
                            <td>{row}</td>
                            {tableDimentions.cols.map((col, j) => (
                                <td key={j}>
                                    <TuringInput
                                        col={col}
                                        row={row}
                                        rows={tableDimentions.rows}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="submit" > submit </button>
            <button type="reset" > reset </button>
        </form>
    )
}
