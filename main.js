//Controller
const data = new APIManager()
const render = new Renderer()
let mainUser = []

const emptyAll = function () {
    $('.user-container').empty()
    $('.quote-container').empty()
    $('.meat-container').empty()
    $('.pokemon-container').empty()
    $('.friends-container').empty()
}

const load = async function () {
    let pok = "pokemon "
    await getNewUser()
    let user = data.getMainUser()
    let usersFriends = data.getFriends()
    let quote = await data.getQuote()
    let poke = await data.getRandomPoke()
    let bacon = await data.getBaconApi()
    let giphy = await data.callGiphy(`${pok}${poke.name}`)
    let u = {user, usersFriends, quote, poke, bacon, giphy}
    mainUser.push(u)
}
const getNewUser = async function () {
    await data.getUsers()
}
$("#gen-page").on("click", async function () {
    mainUser = []
    emptyAll()
    await load()
    const d = mainUser[0]
    render.userInfo(d.user)
    render.friends(d.usersFriends)
    render.quote(d.quote)
    render.poke(d.poke)
    render.aboutMe(d.bacon)
    render.giphy(d.giphy)
})

$('#save-user').on("click", function () {
    let name = mainUser[0].user.name.first
    console.log(name)
    localStorage.setItem(`${name}`, mainUser)
    mainUser = []
})

const getLocalUsers = function () {
    const values = []
    const keys = Object.keys(localStorage)
    let i = keys.length

    while (i--) {
        const key = keys[i]
        const val = localStorage.getItem(key)
        values.push({key, val})
    }
    return values
}

$('#display-user').on("mouseenter",  function () {
    let users = getLocalUsers()
    console.log(users)
    if (users.length !== 0){
        render.menu(users)
        $(this).find('.menu').show();
    }
})

$('#display-user').on("mouseleave",  function () {
    $('.menu').empty()
    $(this).find(".menu").remove()
})