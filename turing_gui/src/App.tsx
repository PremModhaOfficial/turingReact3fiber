import api from './api'
import SetOfVariables from './components/SetOfVariables'
import Table from './components/Table'
import { useState } from 'react'


function App() {

    let fet = async () => {
        let res = await api.post('/config', { name: 'test' })
        console.log(res.data)
    }
    // fet()
    let vars = useState<string[]>()
    let stats = useState<string[]>()

    return (
        <>
            <SetOfVariables usestate={vars} header={`Variables`} />
            <SetOfVariables usestate={stats} header={`States`} />
            <Table vars={vars[0]} states={stats[0]} />

        </>
    )
}

export default App
