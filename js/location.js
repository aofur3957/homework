let store = document.querySelector('#mapWrap .pc');
let spots = store.querySelectorAll('article');
let btnOpen = store.querySelector('.open_store_selection');
let btnClose = store.querySelector('.close_store_selection');

const mapContainer = document.getElementById('map');
const mapOptions = {
    center: new kakao.maps.LatLng(37.5048632, 126.7633616), // 지도 중심좌표
    level: 3, // 지도 확대 레벨
};
// 지도를 담을 박스와 지도의 옵션이 담긴 객체를 인자로 전달하여 지도 생성
const map = new kakao.maps.Map(mapContainer, mapOptions);

const imgSrc = 'img/logo.png';
const imgSize = new kakao.maps.Size(40, 40);
// 이미지 주소와 사이즈를 인자로 전달하여 마커이미지 생성
const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize);
// 여러개의 마커 정보가 담긴 배열
const markerPositions = [
    {
        title: '부천점',
        latlng: new kakao.maps.LatLng(37.5048632, 126.7633616),
    },
    {
        title: '홍대점',
        latlng: new kakao.maps.LatLng(37.5614033, 126.9196564),
    },
    {
        title: '검단점',
        latlng: new kakao.maps.LatLng(37.593968359668274, 126.71674448225654),
    },
    {
        title: '안양점',
        latlng: new kakao.maps.LatLng(37.3945622, 126.9206691),
    }
]

// 위에서 만든 마커 정보가 담긴 배열을 모두 순회하면서 마커 생성
for(let i=0;  i<markerPositions.length; i++){
    const marker = new kakao.maps.Marker({
        map: map,
        position: markerPositions[i].latlng,
        title: markerPositions[i].title,
        image: markerImg,
    })
}

const mediaQueryList = window.matchMedia(`screen and (max-width: 768px)`);
mediaQueryList.addEventListener('change', e=>{
    if(e.matches){
        store = document.querySelector('#mapWrap .m');
        spots = store.querySelectorAll('article');
        btnOpen = store.querySelector('.open_store_selection');
        btnClose = store.querySelector('.close_store_selection');
    }else{
        store = document.querySelector('#mapWrap .pc');
        spots = store.querySelectorAll('article');
        btnOpen = store.querySelector('.open_store_selection');
        btnClose = store.querySelector('.close_store_selection');
    }
    spots.forEach((spot, index)=>{
        spot.addEventListener('click', e=>{
            for(const el of spots){
                el.classList.toggle('active', e.target.closest('article') === el)
            }
            const moveLatLon = markerPositions[index].latlng;
            map.setCenter(moveLatLon);
        })
    })
    btnOpen.addEventListener('click', e=>{
        store.classList.add('on');
        btnOpen.classList.remove('on');
        btnClose.classList.add('on');
    });
    btnClose.addEventListener('click', e=>{
        store.classList.remove('on');
        btnOpen.classList.add('on');
        btnClose.classList.remove('on');
    });
});

 // 각 spot에 해당하는 article을 클릭했을 때 해당 spot으로 지도 중심좌표 이동
spots.forEach((spot, index)=>{
    spot.addEventListener('click', e=>{
        for(const el of spots){
            el.classList.toggle('active', e.target.closest('article') === el)
        }
        const moveLatLon = markerPositions[index].latlng;
        map.setCenter(moveLatLon);
    })
})
btnOpen.addEventListener('click', e=>{
    store.classList.add('on');
    btnOpen.classList.remove('on');
    btnClose.classList.add('on');
});
btnClose.addEventListener('click', e=>{
    store.classList.remove('on');
    btnOpen.classList.add('on');
    btnClose.classList.remove('on');
});

window.addEventListener('resize', e=>{
    const index = [...spots].findIndex(spot=>{
        if(spot.classList.contains('active')) return true;
    })
    const latLng = markerPositions[index].latlng;
    map.setCenter(latLng);
})

setZoomable(false);

// 지도 확대 축소(마우스 휠, 모바일 터치) 막기
function setZoomable(zoomable){
    map.setZoomable(zoomable);
}

// 지도 내 컨트롤을 이용한 확대
function zoomIn(){
    map.setLevel(map.getLevel() - 1);
}

// 지도 내 컨트롤을 이용한 축소
function zoomOut(){
    map.setLevel(map.getLevel() + 1);
}





