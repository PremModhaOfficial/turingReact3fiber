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


export default api;

export { postTuringConfig }
