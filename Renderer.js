class Renderer {

    userInfo(user) {
        const source = $('#user-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({user})
        $('.user-container').append(newHtml)
    }

    friend(users) {
        const source = $('#friends-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({users})
        $('.friends-container').append(newHtml)
    }

    quot(text) {
        const source = $('#quote-template').html()
        const template = Handlebars.compile(source)
        const newHtml = template({text})
        $('.quote-container').append(newHtml)
    }

    poke(poke) {
        let pokeImg = poke.img
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

    giphy(giphy) {
        if (giphy !== "") {
            const source = $('#giphy-template').html()
            const template = Handlebars.compile(source)
            const newHtml = template({giphy})
            $('.pokemon-container').append(newHtml)
        }
    }
}

