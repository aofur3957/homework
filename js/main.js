const hambergur = document.querySelector('.hambergur');
const menuMo = document.querySelector('.menuMo');
const close = menuMo.querySelector('.btnClose');

hambergur.addEventListener('click', e=>{
    menuMo.classList.add('on');
});

close.addEventListener('click', e=>{
    menuMo.classList.remove('on');
});

const visual = document.querySelector('#visual');
const btnPrev = visual.querySelector('.prev');
const btnNext = visual.querySelector('.next');
const slides = visual.querySelector('.slides ul');
const slidesLeng = slides.childElementCount;
const active = slides.querySelector('.active');
const paging = visual.querySelector('.paging > span');

initial();
// 초기화 (현재 보여지는 슬라이드가 가운데 요소가 되도록 초기화)
function initial(){
    slides.insertBefore(slides.lastElementChild, active);
    slides.style.transform = `translateX(-${100 / slidesLeng}%)`;
}

// 슬라이드 애니메이션을 구현하는 클로저(sliding)를 반환하는 외부함수(makeSliding)
function makeSliding(dir, duration){
    let start = null;
    const currentValue = -(100 / slidesLeng);
    const goalValue = dir === 'next' ? currentValue * 2 : 0;  
    // 슬라이드 애니메이션을 구현하는 클로저
    return function sliding (timestamp){
        if(!start) start = timestamp;
        // 0 ~ 1 사이의 진행률
        let progress = (performance.now() - start) / duration; 
        // 콜백 함수 내부에 requestAnimationFrame 메서드를 재귀호출 (fps는 모니터주사율)
        const rafId = requestAnimationFrame(sliding);
        // (goalValue - currentValue) --> 이동할 거리
        slides.style.transform = `translateX(${currentValue + (goalValue - currentValue) * progress}%)`;
        // 지정된 시간(duration 0.7초)이 경과하면 애니메이션 종료
        if( progress > 1) {
            cancelAnimationFrame(rafId);
            // 애니메이션 종료 후 현재 활성화 된 슬라이드에 'active 클래스 추가'
            for (const li of [...slides.children]){
                li.classList.remove('active');
            }
            if(dir === 'next') {
                slides.lastElementChild.classList.add('active'); 
                slides.appendChild(slides.firstElementChild);
                slides.style.transform = `translateX(-33.333%)`;
            } else {
                slides.firstElementChild.classList.add('active');
                slides.insertBefore(slides.lastElementChild, slides.firstElementChild);
                slides.style.transform = `translateX(-33.333%)`;
            }
            // 페이지네이션 변경
            const active = slides.querySelector('.active');
            paging.textContent = `${active.dataset.index}/${slidesLeng}`

            start = null;
        }
    }
}

function throttle(callback, delay){
    let throttled = false;
    // throttle이 리턴하는 함수가 requestAnimationFrame의 콜백임
    return () => {
        if (throttled) return;
        requestAnimationFrame(callback);
        throttled = setTimeout(() => {
            throttled = false;
        }, delay)
    }
}

const nextSliding = makeSliding('next', 700);
const prevSliding = makeSliding('prev', 700);

btnNext.addEventListener('click', throttle(nextSliding, 700));
btnPrev.addEventListener('click', throttle(prevSliding, 700)); 


