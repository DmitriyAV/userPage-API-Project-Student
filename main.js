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

    async loadGif() {
        await this.#model.callGiphy(this.#model.getPokeName())
    }

    async load() {
        await this.#model.callAllAPI()
    }


    render() {
        this.#view.userInfo(this.#model.getMainUser())
        this.#view.friend(this.#model.getFriends())
        this.#view.quot(this.#model.getQuote())
        this.#view.poke(this.#model.getPoke())
        this.#view.aboutMe(this.#model.getAbout())
        this.#view.giphy(this.#model.getGiphyPoke())
    }

    renderMenuSavedUsers() {
        let users = this.#model.getAllData()
        if (users.length !== 0) {
            this.#view.menu(users)
        }
    }

    getMainUser() {
        return this.#model.getMainUser()
    }

    getAllData() {
        return this.#model.getAllData()
    }

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
    localStorage.setItem(`${name}`, data)

})

$('#display-user').on("mouseenter", function () {
    main.renderMenuSavedUsers()
    $(this).find('.menu').show();

})

$('#display-user').on("mouseleave", function () {
    $('.menu').empty()
    $(this).find(".menu").remove()
})