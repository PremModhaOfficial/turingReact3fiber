import { useEffect, useState } from "react"

type TuringMoveInputProps = {
    row: string,
    col: string,
    cols: string[],
    rows: string[]
    data: any
    setData: React.Dispatch<any>
}
export default function TuringMoveInput({ row, col, rows, cols, data, setData }: TuringMoveInputProps) {

    let [inpt, setInpt] = useState({ m: "", r: "", d: "" })

    useEffect(() => {
        setData({ ...data, [row]: { ...data[row], [col]: inpt } })
    }, [inpt])


    return (
        <div>
            <select
                onChange={
                    e => { setInpt({ ...inpt, m: e.target.value }) }
                }
                id={`${row}:${col}:move`} >
                <option defaultValue={undefined} >-</option>
                {rows.map((r) => <option key={r} value={r}>{r}  </option>)}
            </select>
            <select
                onChange={
                    e => { setInpt({ ...inpt, r: e.target.value }) }
                }
            >
                <option defaultValue={undefined} >-</option>
                {cols.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
                onChange={
                    e => { setInpt({ ...inpt, d: e.target.value }) }
                }
                id={`${row}:${col}:dire`}>
                {["", "L", "R", "S"].map((mv) => <option key={mv} value={mv}>{mv}</option>)}
            </select>
        </div>
    )
}
