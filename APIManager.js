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
        let phrase = "pokemon "
        let api_key = "NjQjqYxuRKXNyE9dbjyHmq3JfQNe3neA";
        let uri = `https://api.giphy.com/v1/gifs/search?q=${phrase}${search}&api_key=${api_key}&limit=5`;
        return $.get(uri)
    }

    async callBaconApi() {
        return await $.get(this.#baconApi)
    }

    async #callPokeApi(id) {
        return await $.get(`${this.#pokeApi}${id}`)
    }

    async getRandomPoke() {
        let randId = Math.floor(Math.random() * 949)
        return await this.#callPokeApi(randId)
    }

    async callKanyeApi() {
        return await $.get(this.#kanyeQuote)
    }

    async callUsersApi() {
        return await $.get(this.#userUrl)
    }

    async callAllAPI() {
        try {
            const [usersData, kanyeData, pokeData, baconData] = await Promise
                .all([this.callUsersApi(), this.callKanyeApi(), this.getRandomPoke(), this.callBaconApi()])
            this.#data.mainUser = usersData.results[0]
            this.#data.friends = usersData.results.map(user => {
                if (!user[0]) {
                    return user
                }
            })
            this.#data.pokemon = {name: pokeData.name, img: pokeData.sprites.front_default}
            this.#data.pokemon.gif = await this.callGiphy(this.#data.pokemon.name)
            console.log(this.#data.pokemon.gif)
            this.#data.quote = kanyeData
            this.#data.adout = baconData

        } catch (err) {
            console.log(err)

        }
    }

    // setGiphyPoke(giphyUrl) { this.#data.pokemon.gif = giphyUrl }

    getMainUser() {
        return this.#data.mainUser
    }

    getFriends() {
        return this.#data.friends
    }

    getQuote() {
        return this.#data.quote
    }

    getPoke() {
        return this.#data.pokemon
    }

    getAbout() {
        return this.#data.adout
    }

    getPokeName() {
        return this.#data.pokemon.name
    }

    getGiphyPoke() {
        return this.#data.pokemon.gif
    }

    getAllData() {
        return this.#data
    }

    saveInLocalStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    getLocalUsers = function () {
        const values = []
        const keys = Object.keys(localStorage)
        let i = keys.length

        while (i--) {
            const key = keys[i]
            const val = JSON.parse(localStorage.getItem(key))
            values.push({key, val})
        }
        return values
    }

}
