import api from './api'
import Table from './components/Table'


function App() {

    let fet = async () => {
        let res = await api.get('/config')
        console.log(res.data)
    }

    fet()

    return (
        <>
            <Table />
        </>
    )
}

export default App
