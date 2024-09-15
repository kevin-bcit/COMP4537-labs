class LocalStorage {
    constructor() {
    }

    add(id, value) {
        const items = JSON.parse(localStorage.getItem("data"))
        if (items === null) {
            localStorage.setItem("data", JSON.stringify({}))
        }else{
            items[id] = value;
            localStorage.setItem("data", JSON.stringify(items))
        }
    }

    remove(id) {
        const items = JSON.parse(localStorage.getItem("data"))
        delete items[id]
        localStorage.setItem("data", JSON.stringify(items))
    }

    refresh(){
        localStorage.clear();
    }

    getAllValue(){
        const result = JSON.parse(localStorage.getItem("data"))
        return result === null ? "" : result
    }
}