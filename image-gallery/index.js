const headerSearch = document.querySelector('.header__search')
const searchInput = document.querySelector('.header__input')
const searchBtn = document.querySelector('.header__search-icon')
const clearBtn = document.querySelector('.header__close')
const images = document.querySelectorAll('.img')
let query = 'corgi'

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
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=21&client_id=TS0LXFtaXGTtxyfY0b9hxCgGu6-SvwieysgFyIcZ8Bo`);
    const data = await res.json();
    let link = `https://api.unsplash.com/search/photos?query=${query}&page=${Math.floor(Math.random() * (data.total_pages - 1)) + 1}&per_page=21&client_id=TS0LXFtaXGTtxyfY0b9hxCgGu6-SvwieysgFyIcZ8Bo`
    const currRes = await fetch(link)
    const currData = await currRes.json()
    console.log(currData)
    showData(currData)
}
getData();

async function showData(data){
    for (let i = 0; i < images.length; i++){
        images[i].style.backgroundImage = `url('${data.results[i].urls.regular}')`
    }
}

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        query = searchInput.value.toLowerCase()
        getData()
        location.href = '#main-content'
    }
})

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length > 0){
        query = searchInput.value.toLowerCase()
        getData()
        location.href = '#main-content'
    }
})