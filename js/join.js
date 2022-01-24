const form = document.querySelector('#join_form');
const btn = form.querySelector('button')

btn.addEventListener('click', e=>{
    if(!isTxt("id", 5)) e.preventDefault();
    if(!isTxt("name", 5)) e.preventDefault();
    if(!isTxt("phone", 11)) e.preventDefault();
    if(!isPwd("pwd1", "pwd2", 8)) e.preventDefault();
    if(!isEmail("email")) e.preventDefault();
    if(!isCheck("reception")) e.preventDefault(); 
})

function isTxt(name, len){
    if(len === undefined) len = 5; 
    let input = form.querySelector(`[name=${name}]`); 
    let txt = input.value;

    if(txt.length >=len){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`); 
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
    //input 요소의 갯수만큼 반복을 돌면서 
    //하나라도 체크되어 있는 게 있다면 isChecked 를 true로 변경 
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

    let input = form.querySelector(`[name=${name}]`); 
    let isChecked =false; 
    //input 요소의 갯수만큼 반복을 돌면서 
    //하나라도 체크되어 있는 게 있다면 isChecked 를 true로 변경 
     
    if(isChecked){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("td").querySelector("p").remove(); 
        return true; 
    }else{

        const errMsgs = input.closest("div").querySelectorAll("p"); 
        if(errMsgs.length>0) input.closest("div").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`약관에 동의해 주세요`); 
        input.closest("div").append(errMsg); 

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