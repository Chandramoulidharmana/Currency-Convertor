const BASE_URL=" https://v6.exchangerate-api.com/v6/ba14afcd9af271033ff8e988/latest";
const dropdowns=document.querySelectorAll(".dropdown select");

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval === "" || amtval<1){
        amtval=1;
        amount.val="1";
    }

    //console.log(fromCurr.value,toCurr.value);   
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response=await fetch(URL);
    // console.log(response);
    let data=await response.json();
    // console.log(data);  
    let rate=data.conversion_rates[toCurr.value];
    // console.log(rate);

    let finalAmount=amtval*rate;
    // console.log(finalAmount);
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};


btn.addEventListener("click", async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});


                                                     