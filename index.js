//Storage of Price in Local Sotrage
let priceList = {
    "public":{"jade":"0","citrine":"0","aquamarine":"0","sapphire":"0","ruby":"0","diamond":"0","tanzanite":"0"},
    "collector":{"jade":"0","citrine":"0","aquamarine":"0","sapphire":"0","ruby":"0","diamond":"0","tanzanite":"0"}
};

//If first time opening then set defaultList variable to 0 and we will be creating
//our priceList in localStorage Database
if(localStorage.getItem('defaultList') == null || localStorage.getItem('defaultList') == undefined){
    alert("Please Update Price before proceeding further.");
    localStorage.setItem('defaultList', "1");
    localStorage.setItem('priceList', JSON.stringify(priceList));
}

//Load our prices from priceList storage to priceList object
priceList = JSON.parse(localStorage.getItem('priceList'));
console.log(priceList)
showPriceList();

//Functionality of Update Button
function enableInputFields() {
    var ele = document.getElementsByName("price");
    for(var i=0; i<ele.length;i++){
        var defaultValue = ele[i].defaultValue;
        ele[i].disabled = false;
        ele[i].value = defaultValue;
        ele[i].classList.add("text-black");
        ele[i].classList.add("border-black", "focus:outline-none", "focus:border-red-500");
    }
}

let editMode = false;
const updateButton = document.getElementById("btnPrice");
updateButton.addEventListener('click', function(){ 
    var ele1 = Array.prototype.slice.call(document.getElementsByName("pPrice"));
    var ele2 = Array.prototype.slice.call(document.getElementsByName("cPrice"));
    var ele = ele1.concat(ele2);

    if(editMode == false){
        editMode = true;
        updateButton.innerText = "SAVE";
        for(var i=0; i<ele.length;i++){
            ele[i].disabled = false;
            ele[i].classList.add("text-black");
            ele[i].classList.add("border-black", "focus:outline-none", "focus:border-red-500")
        }
    } else {
        editMode = false;
        updateButton.innerText = "UPDATE";
        for(var i=0; i<ele.length;i++){
            ele[i].disabled = true;
            ele[i].classList.remove("text-black");
            ele[i].classList.add("border-black", "focus:outline-none", "focus:border-red-500")
        }
        savePriceList();
    }
    showPriceList();
});

function savePriceList() {
    var ele1 = Array.prototype.slice.call(document.getElementsByName("pPrice"));
    var ele2 = Array.prototype.slice.call(document.getElementsByName("cPrice"));
    for(i=0;i<ele1.length;i++){
        priceList["public"][ele1[i].id] = ele1[i].value ? ele1[i].value : "0";
    }
    for(i=0;i<ele2.length;i++){
        priceList["collector"][ele2[i].id] = ele2[i].value ? ele2[i].value : "0";
    }
    localStorage.setItem('priceList', JSON.stringify(priceList));
}

function showPriceList() {
    var ele1 = Array.prototype.slice.call(document.getElementsByName("pPrice"));
    var ele2 = Array.prototype.slice.call(document.getElementsByName("cPrice"));
    for(i=0;i<ele1.length;i++){
        ele1[i].value = priceList["public"][ele1[i].id] ? priceList["public"][ele1[i].id] : "0";
    }
    for(i=0;i<ele2.length;i++){
        ele2[i].value = priceList["collector"][ele2[i].id] ? priceList["collector"][ele2[i].id] : "0";
    }
}

// Calculator Thing

let qtyArray = {"jade":"0","citrine":"0","aquamarine":"0","sapphire":"0","ruby":"0","diamond":"0","tanzanite":"0"};
let priceArray = {
    "public" : {"jade":"0","citrine":"0","aquamarine":"0","sapphire":"0","ruby":"0","diamond":"0","tanzanite":"0"},
    "collector" : {"jade":"0","citrine":"0","aquamarine":"0","sapphire":"0","ruby":"0","diamond":"0","tanzanite":"0"}
}
let qtyTotal, publicTotal, collectorTotal;
    qtyTotal = publicTotal = collectorTotal = 0

const calcButton = document.getElementById("btnCalc");
calcButton.addEventListener('click', function(){
    var qty = document.getElementsByName("qty");
    var staementEle = document.getElementById("statementBox");
    var statement = "";
    for(i=0;i<qty.length;i++){
        qtyArray[qty[i].id] = qty[i].value ? qty[i].value : 0;
        qtyTotal = qtyTotal + Number(qtyArray[qty[i].id]);
    }
    for(key in qtyArray) {
        priceArray["public"][key] = qtyArray[key] * priceList["public"][key];
        priceArray["collector"][key] = qtyArray[key] * priceList["collector"][key];
        console.log(typeof qtyArray[key]);
        statement = statement + " " + (isZeroOrEmpty(qtyArray[key]) ?  (qtyArray[key]+ " " + toTitleCase(key)) : "");
    }
    console.log(statement);
    staementEle.innerText = statement;
    var publicTotalEle = document.getElementsByName("tpPrice");
    var collectorTotalEle = document.getElementsByName("tcPrice");

    for(i=0;i<publicTotalEle.length;i++){
        publicTotalEle[i].value = priceArray["public"][publicTotalEle[i].id]
        publicTotal = publicTotal + Number(publicTotalEle[i].value)
        
    }
    for(i=0;i<collectorTotalEle.length;i++){
        collectorTotalEle[i].value = priceArray["collector"][collectorTotalEle[i].id]
        collectorTotal = collectorTotal + Number(collectorTotalEle[i].value)
    }
    document.getElementById('qtyTotal').value = qtyTotal;
    document.getElementById('publicTotal').value = publicTotal;
    document.getElementById('collectorTotal').value = collectorTotal;
});

function isZeroOrEmpty(value) {
    if(value == 0 || value == null || value == undefined || value == "") {
        return false
    }else {
        return true
    }
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

//Reset Calculator Values
const resetButton = document.getElementById("btnReset");
resetButton.addEventListener('click', function(){
   var qty = document.getElementsByName("qty");
   
    for(i=0;i<qty.length;i++){
        qtyArray[qty[i].id] = 0;
        qtyTotal = 0;
        qty[i].value = 0
    }
    for(key in qtyArray) {
        priceArray["public"][key] = 0;
        priceArray["collector"][key] = 0;
    }
    var publicTotalEle = document.getElementsByName("tpPrice");
    var collectorTotalEle = document.getElementsByName("tcPrice");
    for(i=0;i<publicTotalEle.length;i++){
        publicTotalEle[i].value = 0
        publicTotal = 0
    }
    for(i=0;i<collectorTotalEle.length;i++){
        collectorTotalEle[i].value = 0
        collectorTotal = 0
    }
    document.getElementById('qtyTotal').value = 0;
    document.getElementById('publicTotal').value = 0;
    document.getElementById('collectorTotal').value = 0;
    document.getElementById("statementBox").innerText = "";
});
