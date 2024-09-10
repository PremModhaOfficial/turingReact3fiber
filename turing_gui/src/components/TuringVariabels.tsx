import { useState } from "react"
import '../index.css'

function TuringVariables() {
    let [turingVariabels, setTuringVars] = useState<string[]>([])
    let [inputVar, setInputVar] = useState("")
    return (
        <>
            <div>
                <ul>
                    {turingVariabels.map((v, i) => {
                        return (
                            <span key={i}>
                                <li > {v} </li>
                                <button onClick={() =>
                                    setTuringVars(turingVariabels.filter((el) => el !== v))
                                }><i className="nf nf-cod-trash"></i></button>
                            </span>
                        )
                    })}
                </ul>
            </div>
            <input type="text"
                value={inputVar}
                onChange={e => setInputVar(e.target.value)} />
            <button
                onClick={() => {
                    if (inputVar?.length === 1) {
                        setTuringVars([...new Set([...turingVariabels, inputVar])])
                    }

                    setInputVar("")
                    console.log(turingVariabels)
                }
                }
                type="submit"
            >Add</button >
        </>
    )
}


export default TuringVariables
