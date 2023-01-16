const store = document.querySelector('.store');
const spots = store.querySelectorAll('article');

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

// 각 spot에 해당하는 article을 클릭했을 때 해당 spot으로 지도 중심좌표 이동
spots.forEach((spot, index)=>{
    spot.addEventListener('click', e=>{
        const moveLatLon = markerPositions[index].latlng;
        map.setCenter(moveLatLon);
    })
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





