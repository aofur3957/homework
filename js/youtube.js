/*
api key = AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs
request = https://www.googleapis.com/youtube/v3/playlistItems

*/
const playlistId = 'PL5zLxdZ1y87VterXQCOaMjCwbf_KXj5Ve';
const key ='AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs'
const part = 'snippet';
const maxResults = 6;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${maxResults}`;

const video = document.querySelector('#video');

fetch(url)
.then(response=>{
    return response.json();
})
.then(json=>{
    let items = json.items;
    
    let htmls = '';
    items.forEach(item=>{
        let title = item.snippet.title;
        // console.log(item);
        if(title.length > 26){
            title = title.slice(0, 26) + '...';
        }
        
        htmls +=  `
        <article>
            <a class="pic" href="${item.snippet.resourceId.videoId}">
                <img src=${item.snippet.thumbnails.high.url} alt="">
            </a>
            <p>
                ${title}
            </p>
            <div class="btn">
                <a href="#">
                    <i class="fas fa-angle-right"></i>
                    Read More
                </a>
            </div>
        </article>
                        `
    }) 
    video.innerHTML = htmls;
})

video.addEventListener('click', e=>{
    e.preventDefault();

    let figure = document.createElement('figure');
    if(!e.target.closest('img')) return;
    let vidUrl = e.target.closest('.pic').getAttribute('href');
   

    

    figure.innerHTML = `
                                    <iframe src="https://www.youtube.com/embed/${vidUrl}" width= "1000"  height= "600" frameborder = 0 allowfullscreen></iframe>
                                    <button>close</button>
                                 `
    video.append(figure);
})

video.addEventListener('click', e=>{
    
    let figure = document.querySelector('figure');
    if(figure !== null){
        let btnClose = figure.querySelector('button');
        if(e.target === btnClose) figure.remove();
    }
})
