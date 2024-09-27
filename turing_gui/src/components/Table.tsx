import React, { useState, useMemo } from "react";
import TuringMoveInput from "./TuringMoveInput";
import api from "../api";
import { useNavigate } from "react-router-dom";

type TableProps = {
    vars: string[] | undefined;
    states: string[] | undefined;
};

type TuringMove = {
    m: string;
    r: string;
    d: string;
};

type TableData = {
    [key: string]: {
        [key: string]: TuringMove;
    };
};

const Table: React.FC<TableProps> = ({ vars, states }) => {
    let navigate = useNavigate();
    const initialData: TableData = useMemo(() => {
        const data: TableData = {};
        if (vars && states) {
            for (const v of vars) {
                data[v] = {};
                for (const s of states) {
                    data[v][s] = { m: "", r: "", d: "" };
                }
            }
        }
        return data;
    }, [vars, states]);

    const [dynData, setDynData] = useState<TableData>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let resp = api.post('/config', { name: 'test', table: dynData });
        let isOk = false;
        resp.then((res) => {
            isOk = res.status == 200;
            navigate('/animate');
        })
    };

    if (!vars || !states) {
        return <div className="text-center py-8">No variables or states defined.</div>;
    }

    return (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl overflow-x-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Turing Machine Configuration</h2>
                <table className="w-full border-collapse mb-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">M</th>
                            {vars.map((v, i) => (
                                <th key={i} className="border p-2">{v}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {states.map((s, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="border p-2 font-medium">{s}</td>
                                {vars.map((v, j) => (
                                    <td key={j} className="border p-2">
                                        <TuringMoveInput
                                            row={s}
                                            col={v}
                                            cols={vars}
                                            rows={states}
                                            data={dynData}
                                            setData={setDynData}
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Table;
