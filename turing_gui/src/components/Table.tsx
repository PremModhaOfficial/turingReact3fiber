import { useState } from "react"
import TuringMoveInput from "./TuringMoveInput"
import api from "../api"


type TableProps = {
    vars: string[] | undefined, states: string[] | undefined
}
export default function Table({ vars, states }: TableProps) {

    let data: any = useState({})
    if (vars && states) {
        for (let i = 0; i < vars?.length; i++) {
            for (let j = 0; j < states?.length; j++) {
                data[0][`${vars[i]}`][`${states[j]}`] = { move: "", repl: "", dire: "" }
            }
        }
    }
    console.log(data)
    return (
        <>
            <table>
                <tbody>
                    {
                        vars?.map((v, i) => {
                            return <tr key={i}>{v}</tr>
                        })
                    }
                    {
                        states?.map((s, i) => {
                            return <tr key={i} id={s}>
                                <td>{s}</td>
                                {vars?.map((v, j) => {
                                    return (
                                        <td key={j} id={v}>
                                            <TuringMoveInput
                                                row={s}
                                                col={v}
                                                cols={vars}
                                                rows={states}
                                                data={data}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <button type="submit" onClick={e => {
                e.preventDefault()
                api.post('/config', { name: 'test', data: data[0] })
            }}>
                Send!
            </button>
        </>
    )
}
let ones_compliment_config = {
    "name": "1's compliment",
    "InitialState": "q0",
    "BlankSymbol": "*",
    "FinalStates": ["q2"],
    "TransitionTable": {
        "q0": { "0": "q0 1 R", "1": "q0 0 R", "*": "q1 * L" },
        "q1": { "0": "q1 0 L", "1": "q1 1 L", "*": "q2 * R" },
        "q2": { "0": [], "1": [], "*": [] },
    },
}
