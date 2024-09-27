import React, { useEffect, useState } from "react";

type TuringMove = {
    m: string;
    r: string;
    d: string;
};

type TuringMoveInputProps = {
    row: string;
    col: string;
    cols: string[];
    rows: string[];
    data: {
        [key: string]: {
            [key: string]: TuringMove;
        };
    };
    setData: React.Dispatch<React.SetStateAction<{
        [key: string]: {
            [key: string]: TuringMove;
        };
    }>>;
};

const TuringMoveInput: React.FC<TuringMoveInputProps> = ({
    row,
    col,
    rows,
    cols,
    setData,
}) => {
    const [input, setInput] = useState<TuringMove>({ m: "", r: "", d: "" });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            [col]: {
                ...prevData[col],
                [row]: input,
            },
        }));
    }, [input, row, col, setData]);

    const handleChange = (key: keyof TuringMove) => (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setInput((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const selectClass =
        "w-full p-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="flex flex-col space-y-1">
            <select
                className={selectClass}
                onChange={handleChange("m")}
                value={input.m}
                aria-label={`Move state for ${row}:${col}`}
            >
                <option value="">-</option>
                {rows.map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                ))}
            </select>
            <select
                className={selectClass}
                onChange={handleChange("r")}
                value={input.r}
                aria-label={`Write symbol for ${row}:${col}`}
            >
                <option value="">-</option>
                {cols.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>
            <select
                className={selectClass}
                onChange={handleChange("d")}
                value={input.d}
                aria-label={`Move direction for ${row}:${col}`}
            >
                {["", "L", "R", "S"].map((mv) => (
                    <option key={mv} value={mv}>
                        {mv || "-"}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TuringMoveInput;
