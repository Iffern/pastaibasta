
let lastreceipt=null;
const receipts = document.getElementsByClassName("components_container");
const receipt_images= document.getElementsByClassName("image_recipe");
var navbar=document.getElementsByTagName("nav");
var sticky = navbar[0].offsetTop;
var mediaq1 = window.matchMedia("(max-width: 950px)");
var mediaq2 = window.matchMedia("(max-width: 1164px)");
var mediaq3 = window.matchMedia("(max-width: 448px)");
const form=document.querySelector('form');
var numOfNewReceipts=0;
var totalReceipts=0;
var maxSteps=0;
var maxIng=0;
var numbersforReceipt=[];

function createNewReceipt() {
    if(numOfNewReceipts===0){
        let parent=document.getElementsByTagName("body");
        let footer=document.getElementsByTagName("footer");
        let newSection=document.createElement("section");
        newSection.classList.add("grid-container");
        newSection.id="bigContainer";
        parent[0].insertBefore(newSection,footer[0]);
        let header=document.createElement("div");
        header.classList.add("section_header","newReceipt");
        newSection.appendChild(header);
        var logo=document.createElement("img");
        logo.id="newReceipts";
        logo.classList.add("logo");
        logo.src="img/dess.png";
        header.appendChild(logo);
        var menu=document.getElementById("menu");
        var newMenuItem=document.createElement("li");
        var newMenuLink=document.createElement("a");
        newMenuLink.href="#newReceipts";
        newMenuLink.title="Miejsce na twoje przepisy!";
        newMenuLink.textContent="Przepisy czytelników";
        newMenuItem.appendChild(newMenuLink);
        menu.appendChild(newMenuItem);
    }
    let bigContainer=document.getElementById("bigContainer");
    let imageContainer=document.createElement("div");
    let miniheader=document.createElement("header");
    let h2=document.createElement("h2");
    imageContainer.appendChild(miniheader);
    h2.classList.add("mini_header","newReceipt");
    h2.textContent=document.getElementById("formName").value.toUpperCase();
    miniheader.appendChild(h2);
    let container=document.createElement("div");
    container.classList.add("container");
    imageContainer.appendChild(container);
    let image=document.createElement("input");
    image.type="image";
    image.classList.add("image_recipe");
    image.src=document.getElementById("formImage").value;
    image.alt=document.getElementById("formName").value;
    numbersforReceipt[totalReceipts]=numOfNewReceipts+9;
    var whichOne=numOfNewReceipts;
    var currentReceipt=totalReceipts;
    image.onclick=function(){showRecipe(numbersforReceipt[currentReceipt]);};
    let deleteButton=document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick=function(){removeReceipt(whichOne,currentReceipt);};
    let buttonImage=document.createElement("img");
    buttonImage.src="img/delete.png";
    buttonImage.alt="Delete receipt";
    deleteButton.appendChild(buttonImage);
    container.appendChild(image);
    container.appendChild(deleteButton);
    imageContainer.classList.add("item");

    let receiptContainer=document.createElement("div");
    receiptContainer.classList.add("components_container","spaghetti","grid-container");
    let h5=document.createElement("h5");
    h5.classList.add("components_header","tl");
    let numPortions=document.getElementById("formPortion").value;
    var portions="LICZBA PORCJI: ";
    let timeSel=document.getElementById("timeSel");
    let userPick=timeSel.options[timeSel.selectedIndex].value;
    let time=document.getElementById("formTime").value;
    var times;
    if(userPick==="min") times=" MIN";
    else times=" GODZ";
    h5.textContent=portions.concat(numPortions," | ",time,times);
    receiptContainer.appendChild(h5);

    let h3=document.createElement("h3");
    h3.classList.add("components_header","tr");
    h3.textContent="Przygotowanie: ";
    receiptContainer.appendChild(h3);

    let h32=document.createElement("h3");
    h32.classList.add("components_header","bl");
    h32.textContent="Lista składników: ";
    receiptContainer.appendChild(h32);

    let stepsList=document.createElement("ol");
    stepsList.classList.add("recipe");
    let myForm=document.getElementById("sendReceipt");
    let steps=myForm.elements["steps[]"];
    if(typeof steps.length=="undefined"){
        let newStep=document.createElement("li");
        newStep.textContent=steps.value;
        stepsList.appendChild(newStep);
    }
    for(let i=0;i<steps.length;i++){
        if(steps[i].value!==""){
        let newStep=document.createElement("li");
        newStep.textContent=steps[i].value;
        stepsList.appendChild(newStep);}
    }
    receiptContainer.appendChild(stepsList);

    let ingredientsList=document.createElement("ol");
    ingredientsList.classList.add("components");
    let ingredients=myForm.elements["ingredients[]"];
    if(typeof ingredients.length=="undefined"){
        let newIngr=document.createElement("li");
        newIngr.textContent=ingredients.value;
        ingredientsList.appendChild(newIngr);
    }
    for(let j=0;j<ingredients.length;j++){
        let newIngr=document.createElement("li");
        newIngr.textContent=ingredients[j].value;
        ingredientsList.appendChild(newIngr);
    }
    receiptContainer.appendChild(ingredientsList);

    if(numOfNewReceipts===0){
        bigContainer.appendChild(imageContainer);
        bigContainer.appendChild(receiptContainer);
    }
    else{
        bigContainer.insertBefore(imageContainer,bigContainer.childNodes[numOfNewReceipts+1]);
        bigContainer.appendChild(receiptContainer);
    }
    numOfNewReceipts+=1;
    totalReceipts+=1;
}

function removeReceipt(whichOne,arrayNum){

    let section=document.getElementById("bigContainer");
    if(whichOne===0 && numOfNewReceipts===1){
        section.parentNode.removeChild(section);
        let menu=document.getElementById("menu");
        menu.removeChild(menu.lastChild);
    }
    else{
        section.removeChild(section.childNodes[whichOne+1]);
        section.removeChild(section.childNodes[whichOne+1+numOfNewReceipts]);
        var i=1;
        while (i<numOfNewReceipts-whichOne){
            numbersforReceipt[arrayNum+i]=numbersforReceipt[arrayNum+i]-1;
            i++;
        }
    }
    numOfNewReceipts-=1;
}

function addIngridient(element){
    if(maxIng<6){
    var form = document.getElementById("dynamicIng");
    var field = document.createElement("input");
    field.name = "ingredients[]";
    field.type = "text";
    var block=document.createElement("p");
    block.classList.add("pIng");
    block.appendChild(field);
    form.insertBefore(block,element);
    maxIng++;}
}

function removeIngridient () {
    let form = document.getElementById("dynamicIng");
    let pIngs = document.getElementsByClassName("pIng");
    let lastIng=pIngs[maxIng-1];
    form.removeChild(lastIng);
    maxIng--;
}

function addStep(element){
    if(maxSteps<6){
    var form = document.getElementById("dynamicRec")
    var field = document.createElement("input");
    field.name = "steps[]";
    field.type = "text";
    var block=document.createElement("p");
    block.classList.add("pStep");
    block.appendChild(field);
    form.insertBefore(block, element);
    maxSteps++;}
}

function removeStep () {
    let form = document.getElementById("dynamicRec");
    let pStep = document.getElementsByClassName("pStep");
    let lastStep=pStep[maxSteps-1];
    form.removeChild(lastStep);
    maxSteps--;
}

function showRecipe(number){

    receipt_images[number].classList.add("blur");
    setTimeout(function() {
        receipt_images[number].classList.remove("blur");
    }, 2000);

    if(number>8){
        receipts[number].style.gridRow=Math.floor(number/3);

        if(mediaq2.matches){
            receipts[number].style.gridRow=Math.floor((number-1)/2)-1;
        }
        if(mediaq1.matches){
            receipts[number].style.gridRow=number-6;
        }

    }
    else if(number<=8){
        if (mediaq2.matches) {
            if (number % 3 ===0) receipts[number].style.gridRow = 3;
            if (number % 3 ===1) receipts[number].style.gridRow = 3;
            if (number % 3 ===2) receipts[number].style.gridRow = 4;
        }
        if (mediaq1.matches) {
            if (number % 3 ===0) receipts[number].style.gridRow = 3;
            if (number % 3 ===1) receipts[number].style.gridRow = 4;
            if (number % 3 ===2) receipts[number].style.gridRow = 5;
        }
    }

    if((receipts[number].style.display==="none" || receipts[number].style.display==='') && lastreceipt===null) {
        receipts[number].style.display = "grid";
        lastreceipt = number;
    }

    else if((receipts[number].style.display==="none" || receipts[number].style.display==='') && lastreceipt===number) {
        receipts[number].style.display = "grid";
        lastreceipt = number;
    }

    else if((receipts[number].style.display==="none"|| receipts[number].style.display==='') && lastreceipt!==number)
    {receipts[lastreceipt].style.display = "none";
     receipts[number].style.display= "grid";
    lastreceipt=number;}

    else
    {receipts[number].style.display = "none";}
}

function hoover(){
    var lastReceipt=document.getElementById("newReceipts");
    lastReceipt.scrollIntoView();
}

document.getElementById("side_box").addEventListener('click',function (event) {
    var box=document.getElementById("form_box");
    if(mediaq3.matches){
        if(box.style.transform==="none" || box.style.transform===''){
            box.style.transform="translateX(-19em)";}
        else box.style.transform="none";
    }
    else{
    if(box.style.transform==="none" || box.style.transform===''){
    box.style.transform="translateX(-40em)";}
    else box.style.transform="none";}
});

window.onscroll=function () {menu()};

function menu() {
    if (window.pageYOffset >= sticky) {
        navbar[0].classList.add("sticky")
    } else {
        navbar[0].classList.remove("sticky");
    }
}
