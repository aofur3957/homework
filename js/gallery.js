/*
api key: 6695bb82cf9a3db1962df3f386dd83e8
Secret: 901a0ce8ce9b6b22

base: https://www.flickr.com/services/rest/?

method: flickr.interestingness.getList

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
*/
const container = document.querySelector('#gallery')
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loading');

const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
const per_page = 10;
const format = 'json';

let url1 = `${base}method=${method}&api_key=${api_key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

let url2 = ``

fetch(url1)
.then(data=>{
    return data.json();
})
.then(json=>{
    let items = json.photos.photo;

    let htmls = '';
    items.map(item=>{
        
        let imgSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_w.jpg`
        let imgBigSrc = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
        
        htmls +=  `
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

    })
    gallery.innerHTML = htmls;

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


})


container.addEventListener('click', e=>{
    e.preventDefault();

    if(!e.target.closest('a')) return;
    
    const imgBigSrc = e.target.closest('a').getAttribute('href');
    const pop = document.createElement('aside');
    pop.classList.add('pop');
    let htmls = `
                       <img src=${imgBigSrc} alt="">
                       <span class="btnClose">close</span> 
                    `
    pop.innerHTML = htmls;
    gallery.after(pop);
})

container.addEventListener('click', e=>{
    const pop = document.querySelector('.pop');
    const btnClose = pop.querySelector('.btnClose');

    if(e.target === btnClose) pop.remove();
})
