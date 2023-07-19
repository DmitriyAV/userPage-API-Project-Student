//This is the class that will manage all your APIs
class APIManager {

    #userUrl
    #kanyeQuote
    #data
    #pokeApi
    #baconApi

    constructor() {
        this.#userUrl = "https://randomuser.me/api/?results=7"
        this.#kanyeQuote = "https://api.kanye.rest"
        this.#pokeApi = "https://pokeapi.co/api/v2/pokemon/"
        this.#baconApi = "https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text"
        this.#data = {}

    }

    async getBaconApi() {
        return await $.get(this.#baconApi)
    }
    async callPokeApi(id) {
        return await $.get(`${this.#pokeApi}${id}`)
    }

    async getRandomPoke() {
        let randId = Math.floor(Math.random() * 949)
        return await this.callPokeApi(randId)
    }

    async callKanyeApi() {
        return await $.get(this.#kanyeQuote)
    }

    async getQuote() {
        return await this.callKanyeApi()
    }

    async callUserApi() {
        return await $.get(this.#userUrl)
    }

    async getUsers() {
        let data = await this.callUserApi()
        this.#data = data.results
    }

    getMainUser() {
        return this.#data[0]
    }

    getFriends() {
        return this.#data.map(u => {
            if (!u[0]) {
                return u
            }
        })
    }
}
