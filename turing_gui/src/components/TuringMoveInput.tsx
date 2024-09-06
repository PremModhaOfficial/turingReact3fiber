
type TuringMoveInputProps = { row: number, col: string, rows: string[] | number[] }
export default function TuringMoveInput({ row, col, rows }: TuringMoveInputProps) {
    // <input type="text" id={`${row}:${col}:move`} />
    return (
        <>
            <select id={`${row}:${col}:move`}>
                <option value={undefined} selected>-</option>
                {rows.map((r) => <option key={r} value={r}>{r}  </option>)}
            </select>
            <input type="text" id={`${row}:${col}:repl`} />
            <select id={`${row}:${col}:dire`}>
                {["", "L", "R", "S"].map((mv) => <option key={mv} value={mv}>{mv}</option>)}
            </select>
        </>
    )
}
