var selectRefG;


citySearchForm.city.onchange = function(){
  window.selectRefG = this.value;
  let selectCityAdress = this.options[this.selectedIndex].text;
  let adressCity = document.getElementById('adressCity');
  adressCity.innerHTML = `${selectCityAdress}`
  let adressWarehouses = document.getElementById('adressWarehouses');
  adressWarehouses.innerHTML = "";
  warehouses ();
};

warehousesSearchForm.warehouses.onchange = function(){
  let selectWarehousesAdress = this.options[this.selectedIndex].text;
  let adressWarehouses = document.getElementById('adressWarehouses');
  adressWarehouses.innerHTML = `${selectWarehousesAdress}`;
};




async function getWarehouses (){
    let selectRef = window.selectRefG;
    const url = 'https://api.novaposhta.ua/v2.0/json/'
    const param = {
    method: 'post',
     body: JSON.stringify({
    apiKey: "eddf718f9049c03876b3c7cd0e2c9168",
     modelName: "Address",
    calledMethod: "getWarehouses",
     methodProperties: {CityRef: `${selectRef}` }
    }),
    headers: {
    'content-type': 'application/json'
    }
    }
    const response = await fetch(url,param);
    const data = await response.json();
    let warehouses = data.data;
    return warehouses
};

async function warehouses(){
var warehouses = await getWarehouses ();

allWarehouses ();
let input_w = document.querySelector('#warehousesSearch');
input_w.oninput = function(){
    let b = new String(this.value);
    if (b.length >= 3){
    let opt = document.querySelectorAll('.warehousesAll option');
    opt.forEach(o=> o.remove())
    let select = document.querySelector(".warehousesAll");
    for (let item of warehouses){
      let option = document.createElement("option");
      let optionText = document.createTextNode(item.Description);
      let descript = item.Description.toLowerCase();
      let inputLow = b.toLowerCase();
      if (descript.includes(`${inputLow}`)){
         option.appendChild(optionText);
         select.appendChild(option);
        }};
        let selectLangth = select.length;
        if (selectLangth === 0) {
        document.getElementById('noWarehouses').style.display = "inline-flex";
        } else {document.getElementById('noWarehouses').style.display = "none";};
          } else {
            let opt = document.querySelectorAll('.warehousesAll option');
            opt.forEach(o=> o.remove())
            allWarehouses ();
            document.getElementById('noWarehouses').style.display = "none";
            
        } }
        function allWarehouses (){
    
            let select = document.querySelector(".warehousesAll")
            for (let item of warehouses){
              let option = document.createElement("option");
              let optionText = document.createTextNode(item.Description);
              option.appendChild(optionText);
              select.appendChild(option);
              };
              let selectLangth = select.length;
              if (selectLangth === 0) {
                document.getElementById('noWarehouses').style.display = "inline-flex";
                } else {document.getElementById('noWarehouses').style.display = "none";};
              let input_w = document.querySelector('#warehousesSearch');
        }
};

warehouses()