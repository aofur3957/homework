const key ='AIzaSyB2c-vJPxv0T0B9qWab28kZJ3_xr_57jhs';
const part = 'snippet';
const channelId = 'UC_bAkCExw5ZgU1cTgrcZFTg';
const videos = document.querySelectorAll('.video');
const slogun = document.querySelector('.slogun');
const sloguns = slogun.querySelectorAll('strong');
console.log(sloguns);
const delay = 2000;

callPlayLists(channelId);

// YouTube data api로 나의 채널로부터 모든 playlists 로드
function callPlayLists(channelId){
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=${part}&key=${key}&channelId=${channelId}`;
    
    fetch(url)
    .then(response=>response.json())
    // youtube 메뉴에서 불러올 유튜브 목록만 필터링 후 순서 변경
    .then(json=>{
        const items = json.items;
        const filteredItems = items.filter(item=>{
            return item.snippet.title === 'The best house of the year' ? true : 
                      item.snippet.title === 'Various Projects' ? true :
                      item.snippet.title === '2 million hits on YouTube' ? true : false;
        })

        const deleted = filteredItems.splice(0, 1)[0];
        filteredItems.splice(2, 0, deleted);

        return filteredItems;
    })
    // 각 유튜브 목록을 순회하여 동영상 리소스를 로드
    .then(filteredItems=>{
        filteredItems.forEach((filteredItem, idx)=>{
            callData(filteredItem.id, videos[idx]);
        })
        
    })
}

// YouYube data api로 재생목록의 각 동영상 로드
function callData(playlistId, container){
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=${part}&key=${key}&playlistId=${playlistId}`;
    
    fetch(url)
    .then(response=>response.json())
    .then(json=>{
        const items = json.items;
        console.log(items);
        items.forEach((item, idx)=>{
            const articles = container.querySelectorAll('article');
            let htmls;

            if(container === videos[1]){
                const tit = item.snippet.title
                const des = item.snippet.description

                htmls =  `
                    <a class="pic" href="${item.snippet.resourceId.videoId}">
                        <img src=${item.snippet.thumbnails.high.url} alt="">
                    </a>
                    <h4>${textSlice(tit, 30)}</h4>
                    <p>${textSlice(des, 50)}</p>
                `
            }else{
                htmls = `
                    <a class="pic" href="${item.snippet.resourceId.videoId}">
                        <img src=${item.snippet.thumbnails.high.url} alt="">
                    </a>
                `;
            }
            if(articles[idx]) articles[idx].insertAdjacentHTML('afterbegin', htmls);
         });
    });
}

// text가 길어질 경우 text를 length만큼 자르고 말줄임표(...)를 추가
function textSlice(txt, length){
    const sliced = txt.substring(0, length);
    const ellipsis = [...sliced].concat('...').join('');
    return ellipsis;
}

for(let video of videos){
    video.addEventListener('click', e=>{
    // e.preventDefault 안하면 새로고침 됨 
    e.preventDefault();

    if(!e.target.closest('.pic')) return;

    let vidUrl = e.target.closest('.pic').getAttribute('href');
    const figure = document.createElement('figure');    
    figure.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${vidUrl}" width= "1000"  height= "600" frameborder="0" allowfullscreen></iframe>
        <button>close</button>
    `
    video.append(figure);
    });

    video.addEventListener('click', e=>{
        let figure = document.querySelector('figure');
        if(figure !== null){
            let btnClose = figure.querySelector('button');
            if(e.target === btnClose) figure.remove();
        }
    })
}

// 비동기로 동작하는 setInterval
setInterval(()=>{
    for(let slogun of sloguns){
        slogun.classList.contains('on') ? slogun.classList.remove('on') : slogun.classList.add('on');
    }
}, 2000)


// setInterval(()=>{
//     let sloguns = slogun.querySelectorAll('strong');
//     let arr_sloguns = Array.from(sloguns);
//     arr_sloguns.some((slogun, index)=>{
//         if(sloguns[0].classList.contains('on')){
//             for(let el of sloguns){
//                 el.classList.remove('on');
//             }
//             sloguns[1].classList.add('on');
//             return true;
//         }else if(sloguns[1].classList.contains('on')){
//             for(let el of sloguns){
//                 el.classList.remove('on');
//             }
//             sloguns[0].classList.add('on');
//             return true;
//         }
//     })
// }, delay)





