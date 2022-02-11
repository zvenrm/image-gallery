const headerSearch = document.querySelector('.header__search')
const searchInput = document.querySelector('.header__input')
const searchBtn = document.querySelector('.header__search-icon')
const clearBtn = document.querySelector('.header__close')
const images = document.querySelectorAll('.img')
let query = 'https://api.unsplash.com/search/photos?query=corgi&page=2&per_page=21&client_id=TS0LXFtaXGTtxyfY0b9hxCgGu6-SvwieysgFyIcZ8Bo'

window.onscroll = function() {myFunction()}
let sticky = headerSearch.offsetTop
function myFunction() {
    if (window.pageYOffset >= sticky) {
        headerSearch.classList.add("sticky");
    } else {
        headerSearch.classList.remove("sticky");
    }
}

searchInput.addEventListener('input', () => {
    if (searchInput.value.length > 0){
        clearBtn.classList.add('close-display')
    }
    else{
        clearBtn.classList.remove('close-display')
    }
})

clearBtn.addEventListener('click', () => {
    searchInput.value = ''
    clearBtn.classList.remove('close-display')
})

async function getData() {
    const res = await fetch(query);
    const data = await res.json();
    showData(data)
}
getData();

async function showData(data){
    for (let i = 0; i < images.length; i++){
        images[i].style.backgroundImage = `url('${data.results[i].urls.regular}')`
    }
}

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        query = `https://api.unsplash.com/search/photos?query=${searchInput.value.toLowerCase()}&page=2&per_page=21&client_id=TS0LXFtaXGTtxyfY0b9hxCgGu6-SvwieysgFyIcZ8Bo`
        getData()
        location.href = '#main-content'
    }
})

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length > 0){
        query = `https://api.unsplash.com/search/photos?query=${searchInput.value.toLowerCase()}&page=2&per_page=21&client_id=TS0LXFtaXGTtxyfY0b9hxCgGu6-SvwieysgFyIcZ8Bo`
        getData()
        location.href = '#main-content'
    }
})