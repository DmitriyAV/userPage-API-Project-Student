
class Renderer {

    userInfo(user) {
        const source = $('#user-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({user})
        $('.user-container').append(newHtml)
    }

    friends(users) {
        const source = $('#friends-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({users})
        $('.friends-container').append(newHtml)
    }

    quote(text) {
        const source = $('#quote-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({text})
        $('.quote-container').append(newHtml)
    }

    poke(poke) {
        let pokeImg = poke.sprites.front_default
        let pokeName = poke.name
        let resName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
        const source = $('#pokemon-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({pokeImg: pokeImg, pokeName: resName})
        $('.pokemon-container').append(newHtml)
    }

    aboutMe(bacon) {
        const source = $('#about-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({bacon})
        $('.meat-container').append(newHtml)
    }

    menu(users) {
        const source = $('#menu-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({users})
        $('#menu-container').append(newHtml)
    }
}
