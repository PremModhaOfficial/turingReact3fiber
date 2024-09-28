import axios from "axios";


class TuringConfig {
    name: string;
    description: string;
    config: Object;
    constructor(
        { name, description, table }: {
            name: string,
            description: string,
            table: Object
        }
    ) {
        this.name = name;
        this.description = description;
        this.config = table;
    }

    toString() {
        return `${JSON.stringify(this)}`
    }
}

let api = axios.create({
    baseURL: "http://localhost:8000/api/"
})



let postTuringConfig = (data: TuringConfig) => {
    api.post('config/', data.toString())
}
let set_blank_symbol = async (data: string) => {
    let res = await api.post('blank/', { blank: data })
    console.log(res)
    return res.data
}

let set_turing_tape = async (data: string) => {
    let res = await api.post('tape/', { tape: data })
    console.log(res)
    return res.data
}

let getTuringTrace = async () => {
    let res = await api.get('run/')
    return res.data
}


export default api;

export { postTuringConfig, getTuringTrace, set_turing_tape, set_blank_symbol }
