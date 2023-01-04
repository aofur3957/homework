/*
api key = AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs
request = https://www.googleapis.com/youtube/v3/playlistItems

*/
const key ='AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs';
const part = 'snippet';
const playlistId = [
    'PL5zLxdZ1y87WGSvybcffoLpZvr4_XJg_z',
    'PL5zLxdZ1y87VterXQCOaMjCwbf_KXj5Ve',
    'PL5zLxdZ1y87V9XJZu_jxpF3wkRqoHDMeW'
];
const videos = document.querySelectorAll('#video');
const slogun = document.querySelector('.slogun');

callData(playlistId[0], videos[0], 1);
callData(playlistId[1], videos[1], 3);
callData(playlistId[2], videos[2], 1);





for(let video of videos){
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
}
   



const delay = 2000;
setInterval(()=>{
    let sloguns = slogun.querySelectorAll('strong');
    let arr_sloguns = Array.from(sloguns);
    arr_sloguns.some((slogun, index)=>{
        if(sloguns[0].classList.contains('on')){
            for(let el of sloguns){
                el.classList.remove('on');
            }
            sloguns[1].classList.add('on');
            return true;
        }else if(sloguns[1].classList.contains('on')){
            for(let el of sloguns){
                el.classList.remove('on');
            }
            sloguns[0].classList.add('on');
            return true;
        }
    })
}, delay)

function callData(playlistId, container, num){
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}&maxResults=${num}`;
    
    fetch(url)
    .then(response=>{
    return response.json();
    })
    .then(json=>{
        let items = json.items;
        console.log(items);

        if(num === 1){
            let htmls = ' ';
            items.forEach(item=>{
            // let title = item.snippet.title;
            // // console.log(item);
            // if(title.length > 26){
            //     title = title.slice(0, 26) + '...';
            // }
                htmls +=  `
                <article>
                    <a class="pic" href="${item.snippet.resourceId.videoId}">
                        <img src=${item.snippet.thumbnails.high.url} alt="">
                    </a>
                    <div class="txt">
                        <div class="container">
                            <span>/ ARCHITECTURE</span>
                            <h3>Lorem ipsum dolor sit amet</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </article>
                                `
                container.innerHTML = htmls;
            })
        }else if(num === 3){
            let htmls = `
            <div class="txt">
                <span>ARCHITECTURE</span>
                <h3>Lorem ipsum dolor sit amet consectetur,</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem.</p>
            </div>
                            `;
            items.map(item=>{
                htmls += `
                <article>
                    <a class="pic" href=${item.snippet.resourceId.videoId}>
                        <img src=${item.snippet.thumbnails.high.url} alt="">
                    </a>
                    <h4>Lorem, ipsum dolor.</h4>
                    <p>Lorem ipsum dolor sit amet consectetur setrual.</p>
                </article>
                                `
                container.innerHTML = htmls;
            })
        }
         
    })
} 




