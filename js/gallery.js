/*
api key: 6695bb82cf9a3db1962df3f386dd83e8
Secret: 901a0ce8ce9b6b22

base: https://www.flickr.com/services/rest/?

method: flickr.interestingness.getList

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
*/
const base = 'https://www.flickr.com/services/rest/?';
const method = 'flickr.interestingness.getList';
const api_key = '6695bb82cf9a3db1962df3f386dd83e8';
const per_page = 10;
const format = 'json';

let url1 = `${base}method=${method}&api_key=${api_key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;


fetch(url1)
.then(data=>{
    return data.json();
})
.then(json=>{
    let items = json.photos.photo;
    console.log(items);

    let htmls = '';
    items.map(item=>{
        
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
                        <div class="pic">
                            <img src="img/city.jpg" alt="">
                        </div>
                        <a href="#">view more</a>
                    </article>
                        `
    })
})
