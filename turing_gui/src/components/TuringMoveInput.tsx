
type TuringMoveInputProps = {
    row: string,
    col: string,
    cols: string[],
    rows: string[]
    data: any
}
export default function TuringMoveInput({ row, col, rows, cols, data }: TuringMoveInputProps) {
    // <input type="text" id={`${row}:${col}:move`} />
    return (
        <div>
            <select
                onChange={
                    e => {
                        let obj = { ...data[0][`${row}`][`${col}`], move: e.target.value }
                        data[1]({ ...data[0], obj })
                    }
                }
                id={`${row}:${col}:move`} >
                <option defaultValue={undefined} >-</option>
                {rows.map((r) => <option key={r} value={r}>{r}  </option>)}
            </select>
            <select
                onChange={
                    e => {
                        let obj = { ...data[0][`${row}`][`${col}`], repl: e.target.value }
                        data[1]({ ...data[0], obj })
                    }
                }
                id={`${row}:${col}:repl`}>
                <option defaultValue={undefined} >-</option>
                {cols.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select
                onChange={
                    e => {
                        let obj = { ...data[0][`${row}`][`${col}`], dire: e.target.value }
                        data[1]({ ...data[0], obj })
                    }
                }
                id={`${row}:${col}:dire`}>
                {["", "L", "R", "S"].map((mv) => <option key={mv} value={mv}>{mv}</option>)}
            </select>
        </div>
    )
}
