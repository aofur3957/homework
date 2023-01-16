const container = document.querySelector('#gallery')
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch'); 

const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
const per_page = 10;
const format = 'json';

const url = `${base}method=${method}&api_key=${api_key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

callPhoto(url);

container.addEventListener('click', e=>{
    e.preventDefault();

    if(!e.target.closest('a')) return;
    
    const imgBigSrc = e.target.closest('a').getAttribute('href');
    const pop = document.createElement('aside');
    pop.classList.add('pop');
    const htmls = `
                       <img src=${imgBigSrc} alt="">
                       <span class="btnClose">close</span> 
                    `
    pop.innerHTML = htmls;
    gallery.after(pop);
})

container.addEventListener('click', e=>{
    const pop = document.querySelector('.pop');
    if(pop !== null){
        const btnClose = pop.querySelector('.btnClose');
        if(e.target === btnClose) pop.remove();
    }
})

btnSearch.addEventListener('click', e=>{
    let tag = input.value;
    tag = tag.trim();

    const url = `${base}method=${method2}&api_key=${api_key}&per_page=${per_page}&privacy_filter=2&format=${format}&nojsoncallback=1&tags=${tag}`;

    callPhoto(url);
})

function callPhoto(url){
    fetch(url)
    .then(data=>data.json())
    .then(json=>{
        getPhotoInfo(json);
        // 이 위치에서 delayLoading 함수를 호출하면 아직 이미지가 비동기에 의해 로드되지 않은 상태이기 때문에 로딩 이미지가 보일 뿐 이미지가 로드된 화면은 보이지 않음
    })
}

function getPhotoInfo(json){
    let items = json.photos.photo;

    let htmls = '';
    items.map(item=>{
        console.log(item);
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=6695bb82cf9a3db1962df3f386dd83e8&photo_id=${item.id}&format=json&nojsoncallback=1`)
        .then(data=>data.json())
        .then(json=>{
            htmls += createList(json);
            gallery.innerHTML = htmls
            delayLoading();
        })       
    })
}

function createList(json){
    const photo = json.photo;
            let imgSrc = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`
            let imgBigSrc = photo.originalsecret ? `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.originalsecret}_4k.jpg` : `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`

            return  `
                        <article>
                            <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, similique!</h1>
                            <div class="wrap">
                                <p>
                                    nsnr<br><br>
                                    Lorem ipsum dolor sit amet, consectetur 
                                </p>
                                <p>
                                    nsnr<br><br>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </p>
                            </div>
                            <a class="pic" href="${imgBigSrc}">
                                <img src=${imgSrc} alt="">
                            </a>
                            <a href="${imgBigSrc}">view more</a>
                        </article>
                    `;
            
}

function delayLoading(){
    const imgs = gallery.querySelectorAll('img');
    const len = imgs.length;
    let count = 0;

    for(let img of imgs){
        img.onload = function(){
            count++;
            if(len === count){
                loading.classList.add('off');
                gallery.classList.add('on');
            }
        }
    }
}


