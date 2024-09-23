import { useState } from 'react'
import TuringMachineAnimation from './components/TapeHead.tsx'
import api from './api.ts'
import SetOfVariables from './components/SetOfVariables.tsx'
import Table from './components/Table.tsx'


function App() {

    let res: any = ""
    let [table, setTable] = useState("")
    let fet = async () => {
        return await api.post('/run', { name: 'test', table: table })
        // console.log(res.data)
    }
    let vars = useState<string[]>(["*"])
    let stats = useState<string[]>([])
    // <SetOfVariables usestate={vars} header={`Variables`} />
    // <SetOfVariables usestate={stats} header={`States`} />
    // <Table vars={vars[0]} states={stats[0]} />

    return (
        <>
        </>
    )
}

export default App
