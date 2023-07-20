//This is the class that will manage all your APIs
class APIManager {
    #giphy
    #userUrl
    #kanyeQuote
    #data
    #pokeApi
    #baconApi

    constructor() {
        this.#giphy = "https://api.giphy.com/v1/gifs/search?q"
        this.#userUrl = "https://randomuser.me/api/?results=7"
        this.#kanyeQuote = "https://api.kanye.rest"
        this.#pokeApi = "https://pokeapi.co/api/v2/pokemon/"
        this.#baconApi = "https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1"
        this.#data = {}

    }

    async callGiphy(search) {
        let api_key = "NjQjqYxuRKXNyE9dbjyHmq3JfQNe3neA";
        let uri = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${api_key}&limit=5`;
        return await $.get(uri)
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
