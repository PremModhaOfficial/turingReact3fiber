import { useState } from "react"
import TuringMoveInput from "./TuringMoveInput"
import api, { postTuringConfig } from "../api"


type TableProps = {
    vars: string[] | undefined, states: string[] | undefined
}
export default function Table({ vars, states }: TableProps) {

    let data: any = {}
    if (vars && states) {
        for (let i = 0; i < vars?.length; i++) {
            for (let j = 0; j < states?.length; j++) {
                data[`${vars[i]}`] = []
                data[`${vars[i]}`][`${states[j]}`] = { m: "", r: "", d: "" }
            }
        }
    }
    let [dynData, setDynData] = useState(data)
    // console.log(dynData)

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <div style={{ position: "relative", top: '50%', left: '50%', }}>
                <table border={1}>
                    <tbody>
                        <tr>
                            <td>M</td>
                            {
                                vars?.map((v, i) => {
                                    return <td key={i}><center>{v}</center></td>
                                })
                            }
                        </tr>
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
                                                    data={dynData}
                                                    setData={setDynData}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button type="submit"
                    onClick={e => {
                        e.preventDefault()
                        api.post('/config', { name: 'test', table: dynData })
                        // postTuringConfig({ ...dynData })
                    }}
                >
                    Send!
                </button>
            </div>
        </div>
    )
}

