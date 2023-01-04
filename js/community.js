const tab = document.querySelector('#tab');
const tabTitles = tab.querySelectorAll('dt');
const tabButtons = tab.querySelectorAll('button');
const tabContents = tab.querySelectorAll('dd');
const faqs = tab.querySelectorAll('#faq');
const faqHeader = document.querySelector('.faqHeaderSection');
const strokes = tab.querySelectorAll('.strokeStyle');

// 스크롤이 특정 위치에 도달하면 svg 애니메이션 실행
window.addEventListener('scroll', e => {
    const faqOffset = parseInt(faqHeader.getBoundingClientRect().y);
    if(faqOffset <= 400 && faqOffset >= -500 ){
        void faqHeader.offsetWidth;
        strokes.forEach(stroke => {
            stroke.classList.add('add');
        })
    }else if(faqOffset >= 1000 || faqOffset <= -500 ){
        void faqHeader.offsetWidth;
        strokes.forEach(stroke => {
            stroke.classList.remove('add');
        })
    }  
})

// 이벤트 등록이 여러번(원인파악)
// 탭 버튼에 이벤트 핸들러 등록
tabButtons.forEach((tabButton, idx)=>{
    tabButton.addEventListener('click', makeCloser(idx));
})

//  faq 아코디언 메뉴 
faqs.forEach(faq => {
    faq.addEventListener('click', e => {
        e.preventDefault();
        
        const liElem = e.target.closest('li');
        if(liElem.classList.contains('on')){
            liElem.classList.remove('on')
        }else{
            for(let li of [...e.currentTarget.children]){
                li.classList.remove('on');
            }
            liElem.classList.add('on');
        }
    })
})

// 탭 메뉴 클릭에 따른 탭 콘텐츠 보여주기
function makeCloser (idx){
    const faq = tabContents[idx].querySelector('#faq');
    
    return showTabContents = e => {
        for(let el of tabButtons){
            el.classList.toggle('on', el === e.currentTarget);
        }
        for(let el of tabContents){
            el.classList.toggle('on', el === tabContents[idx]);
        }
    }
}



