const headerSearch = document.querySelector('.header__search')
const searchInput = document.querySelector('.header__input')
const searchBtn = document.querySelector('.header__search-icon')
const clearBtn = document.querySelector('.header__close')
const images = document.querySelectorAll('.img')
const viewImg = document.querySelector('.view-img')
const closeImg = document.querySelector('.close-img')
const currentImg = document.querySelector('.current-img')
const prevImg = document.querySelector('.prev-img')
const nextImg = document.querySelector('.next-img')
const download = document.querySelector('.download')
let query = 'corgi'
let indexImg
let imgArr = []
let downloadLink = []

window.onscroll = function() {myFunction()}
let sticky = headerSearch.offsetTop
function myFunction() {
    if (window.pageYOffset >= sticky) {
        headerSearch.classList.add("sticky");
    } else {
        headerSearch.classList.remove("sticky");
    }
}

images.forEach(el => {
    imgArr.push(el)
})

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
    downloadLink = []
    for (let i = 0; i < images.length; i++){
        images[i].style.backgroundImage = `url('${data.results[i].urls.regular}')`
        downloadLink.push(data.results[i].links.download)
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

images.forEach(el => {
    el.addEventListener('click', () => {
        document.body.classList.add('overflow-none')
        viewImg.classList.remove('view-img-none')
        viewImg.classList.add('view-img-anim')
        currentImg.style.backgroundImage = el.style.backgroundImage
        indexImg = imgArr.indexOf(el)
        download.href = downloadLink[indexImg]
    })
})

closeImg.addEventListener('click', () => {
    document.body.classList.remove('overflow-none')
    viewImg.classList.add('view-img-none')
    viewImg.classList.remove('view-img-anim')
})

prevImg.addEventListener('click', () => {
    if (indexImg === 0){
        indexImg = 20
    }
    else{
        indexImg -= 1
    }
    currentImg.style.backgroundImage = images[indexImg].style.backgroundImage
    download.href = downloadLink[indexImg]
})

nextImg.addEventListener('click', () => {
    if (indexImg === 20){
        indexImg = 0
    }
    else{
        indexImg += 1
    }
    currentImg.style.backgroundImage = images[indexImg].style.backgroundImage
    download.href = downloadLink[indexImg]
})

