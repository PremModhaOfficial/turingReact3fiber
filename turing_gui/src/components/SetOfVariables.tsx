import { useState } from "react"
import '../index.css'

type usestateType = [
    string[],
    React.Dispatch<
        React.SetStateAction<
            string[]
        >>
]

function SetOfVariables(props: { usestate: usestateType, header: string }) {
    let [vars, setVars] = props.usestate
    let [inputVar, setInputVar] = useState("")
    let { header } = props
    return (
        <div style={{ height: '100vh', width: '100vw', border: '1px solid', margin: '0' }}>
            <div style={{ position: 'relative', top: "50%", left: "50%" }}>
                <div>
                    <h2> {header} </h2>
                    <ul>
                        {vars?.map((v, i) => {
                            return (
                                <span key={i}>
                                    <li > {v} </li>
                                    <button onClick={() =>
                                        setVars(vars.filter((el) => el !== v))
                                    }>
                                        <i className="nf nf-cod-trash"></i>
                                    </button>
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
                            if (vars) {
                                setVars([...new Set([...vars, inputVar])])
                            } else {
                                setVars([inputVar])
                            }
                        }

                        setInputVar("")
                        // console.log(vars)
                    }
                    }
                    type="submit"
                >
                    Add
                </button >
            </div>
        </div>
    )
}


export default SetOfVariables

