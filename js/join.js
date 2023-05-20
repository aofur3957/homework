const form = document.querySelector('#insertInfo');
const btnCancel = form.querySelector('.cancel');
const btnSubmit = form.querySelector('.submit');

// submit의 디폴트 기능은 새로운 페이지를 불러오는 것이며, 만약 submit 버튼을 눌렀을 때
// 유효성 검사 함수들 중 하나라도 false를 리턴하면 새로운 페이지로 넘어가는 것을 방지함
btnSubmit.addEventListener('click', e=>{
    if(!isAgree("agreement")) e.preventDefault();
    if(!isTxt("name", 2)) e.preventDefault();
    if(!isTxt("id", 5)) e.preventDefault();
    if(!isTxt("phone", 11)) e.preventDefault();
    if(!isPwd("pwd1", "pwd2", 8)) e.preventDefault();
    if(!isEmail("email")) e.preventDefault();
    if(!isCheck("reception")) e.preventDefault(); 
})

function isTxt(name, len){
    if(len === undefined) len = 5; 
    let input = form.querySelector(`[name=${name}]`); 
    let txt = input.value;

    if(txt.length >= len){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`해당항목을 ${len}글자 이상 입력하세요`); 
        input.closest("td").append(errMsg); 

        return false; 
    }
}

function isEmail(name){
    let input = form.querySelector(`[name=${name}]`); 
    let txt = input.value; 

    if(/@/.test(txt)){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`@를 포함한 전체 이메일주소를 입력하세요`); 
        input.closest("td").append(errMsg); 
        return false; 
    }
}

function isCheck(name){

    let inputs = form.querySelectorAll(`[name=${name}]`); 
    let isChecked =false; 
    
    for(let el of inputs){
        if(el.checked) isChecked = true; 
    }

    if(isChecked){
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) inputs[0].closest("td").querySelector("p").remove(); 
        return true; 
    }else{
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) inputs[0].closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`필수입력 항목을 체크해 주세요`); 
        inputs[0].closest("td").append(errMsg); 

        return false; 
    }
}

function isAgree(name){

    let inputs = document.querySelectorAll(`[name=${name}]`); 
    let isChecked =false; 
   
    for(let input of inputs){
        if(input.checked) isChecked = true;
    }
     
    if(isChecked){
        const errMsgs = inputs[0].closest(".agreement").querySelectorAll("strong"); 
        if(errMsgs.length>0) inputs[0].closest(".agreement").querySelector("strong").remove(); 
        return true; 
    }else{
        const errMsgs = inputs[0].closest(".agreement").querySelectorAll("strong"); 
        if(errMsgs.length>0) inputs[0].closest(".agreement").querySelector("strong").remove(); 

        const errMsg = document.createElement("strong"); 
        errMsg.append(`약관에 동의해 주세요`); 
        inputs[0].closest(".agreement").append(errMsg); 

        return false; 
    }
}

function isPwd(name1, name2, len){
    let pwd1 = form.querySelector(`[name=${name1}]`); 
    let pwd2 = form.querySelector(`[name=${name2}]`);

    let pwd1_val = pwd1.value; 
    let pwd2_val = pwd2.value; 

    const num = /[0-9]/; 
    const eng = /[a-zA-Z]/;
    const spc = /[~!@#$%^&*()_+]/;

    if(pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){

        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) pwd1.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) pwd1.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문, 숫자, 특수문자를 포함해서 동일하게 입력하세요`); 
        pwd1.closest("td").append(errMsg); 

        return false; 
    }
}