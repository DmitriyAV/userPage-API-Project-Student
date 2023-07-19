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
const getNewUser = async function () {
    await data.getUsers()
}
$("#gen-page").on("click", async function () {
    emptyAll()
    await getNewUser()
    let user = data.getMainUser()
    let usersFriends = data.getFriends()
    let quote = await data.getQuote()
    let poke = await data.getRandomPoke()
    let bacon = await data.getBaconApi()
    let u = {user, usersFriends, quote, poke, bacon}
    mainUser.push(u)
    render.userInfo(user)
    render.friends(usersFriends)
    render.quote(quote)
    render.poke(poke)
    render.aboutMe(bacon)
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

$('#display-user').on("mouseleave", function () {
    $(this).find(".menu").remove()
})