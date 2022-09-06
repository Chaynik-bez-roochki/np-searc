

async function getCity (){
  const url = 'https://api.novaposhta.ua/v2.0/json/'
  const param = {
  method: 'post',
   body: JSON.stringify({
  apiKey: "eddf718f9049c03876b3c7cd0e2c9168",
   modelName: "Address",
  calledMethod: "getCities",
   methodProperties: {}
  }),
  headers: {
  'content-type': 'application/json'
  }
  }
  const response = await fetch(url,param);
  const data = await response.json();
  let cityList = data.data
  return cityList
};

async function citySearch (){
var cityList = await getCity ()

allCity ()
let input = document.querySelector('#citySearch');
input.oninput = function(){
    let b = new String(this.value);
    let adressCity = document.getElementById('adressCity');
  adressCity.innerHTML = "";
    if (b.length >= 3){
        let opt = document.querySelectorAll('option');
        opt.forEach(o=> o.remove());
        let select = document.querySelector(".cityAll");
        for (let item of cityList){
            let option = document.createElement("option");
            let optionText = document.createTextNode(item.Description);
            let descriptFull = item.Description.toLowerCase();
            let descript = descriptFull.substring(0,b.length);
            let inputLow = b.toLowerCase();
            if (descript.includes(`${inputLow}`)){
                option.setAttribute('value', item.Ref);
                option.appendChild(optionText);
                select.appendChild(option);
            }};
            let selectLangth = select.length;
            if (selectLangth === 0) {
                document.getElementById('noCity').style.display = "inline-flex";
                } else {document.getElementById('noCity').style.display = "none";}
    } else {
        let opt = document.querySelectorAll('option');
        opt.forEach(o=> o.remove())
        allCity ();
        document.getElementById('noCity').style.display = "none";
    }
};


function allCity (){
for (let item of cityList){
    let select = document.querySelector(".cityAll")
    let option = document.createElement("option");
    let optionText = document.createTextNode(item.Description);
    option.setAttribute('value', item.Ref)
    option.appendChild(optionText);
    select.appendChild(option);
    }};
  };

  citySearch ();


