const uppercaseitems= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseitems = "abcdefghijklmnopqrstuvwxyz";
const digititems = "0123456789";
const symbolitems = "!@#$%^&*()";

const securityLevels = ["Very weak", "Weak", "Strong", "Very strong"];
const securityLevelsColors = ["#F5203E", "#F1C80B", "#1D90F5", "#1D90F5"];



let display=document.querySelector('.password-display');
let type_indicator=document.querySelector('.type-indicator');

let refresh=document.getElementById('regenerate');
let copy=document.getElementById('copy');


let length=document.querySelector('.slider');
let length_indicator=document.querySelector('.length-indicator')

let uppercase=document.querySelector('.uppercase')
let lowercase=document.querySelector('.lowercase')
let symbols=document.querySelector('.symbols')
let digits=document.querySelector('.digits')

console.log(uppercase)
// --------------------------------------------------------------------------------------


function getSettingCheckboxs(filter = "all"){
   let settings = document.querySelector('settings');
   if(filter == "checked") return document.querySelectorAll('input[type="checkbox"]:checked');
   if(filter == "unchecked") return document.querySelectorAll('input[type="checkbox"]:not(:checked)');
   return document.querySelectorAll('input[type="checkbox"]');
}
let password= function(){
    let  character=length.value;

    let content='';
   if(uppercase.checked) content+=uppercaseitems;
    
   if(lowercase.checked) content+=lowercaseitems;
     
   if(symbols.checked)content+=symbolitems;
     
   if(digits.checked) content+=digititems;

    let password=''
    for(i=0;i<character;i++){
       password +=content.charAt(
         Math.floor(Math.random() * content.length)
       )
    }
    display.innerHTML=password;

   let protection=0
   if(character>8){
      if(character<12){
         protection=1
      }
      else if(character<16){
         protection=2
      }
      else{
         protection=3
      }
   }
      if(character<24){
         if(getSettingCheckboxs.length==1)protection--
      }
  
 type_indicator.innerHTML=securityLevels[protection]
 type_indicator.style.color=securityLevelsColors[protection]

}
password()
refresh.onclick=()=>{
   password()
}
copy.onclick=()=>{
   navigator.clipboard.writeText(display.textContent);
}
length.oninput = () => {
   length_indicator.innerHTML = length.value;
   password();
}
getSettingCheckboxs().forEach(e => {
   e.onclick = () => {
       password();

       // At least one checked
       let checkeds = getSettingCheckboxs("checked");
       if(checkeds.length == 1) checkeds[0].disabled = true;
       else getSettingCheckboxs().forEach(e => e.disabled = false);
   }
});
