//Controller

class Controller {
    #model
    #view

    constructor(model, view) {
        this.#model = model
        this.#view = view

    }

    emptyAll() {
        $('.user-container').empty()
        $('.quote-container').empty()
        $('.meat-container').empty()
        $('.pokemon-container').empty()
        $('.friends-container').empty()
    }

    async loadGif() { await this.#model.callGiphy(this.#model.getPokeName()) }

    async load() { await this.#model.callAllAPI()}

    render() {
        this.#view.userInfo(this.#model.getMainUser())
        this.#view.friend(this.#model.getFriends())
        this.#view.quot(this.#model.getQuote())
        this.#view.poke(this.#model.getPoke())
        this.#view.aboutMe(this.#model.getAbout())
        this.#view.giphy(this.#model.getGiphyPoke())
    }

    saveUser(key, value) {
        this.#model.saveInLocalStore(key, value)
    }

    renderMenuSavedUsers() {
        let users = this.#model.getLocalUsers()
        if (users.length !== 0) {
            this.#view.menu(users)
        }
        else alert("User list is empty saved.")
    }

    getMainUser() { return this.#model.getMainUser() }
    getAllData() { return this.#model.getAllData() }
}

const main = new Controller(new APIManager(), new Renderer())

$("#gen-page").on("click", async function () {
    main.emptyAll()
    await main.load()
    await main.loadGif()
    await main.render()
})

$('#save-user').on("click", function () {
    let name = main.getMainUser()
    let data = main.getAllData()
    let fullName = `${name.name.first} ${name.name.last}`
    main.saveUser(fullName, data)
    alert("User is saved!")
})

$('#display-user').on("mouseenter",function () {
    main.renderMenuSavedUsers()
})

$('#display-user').on("mouseleave",function () {
    $(this).closest("#menu-container").find(".menu").remove()
})