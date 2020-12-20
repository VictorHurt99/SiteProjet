"use strict"
let taches = {}
let tachesKey = Object.keys(taches);


function createTache() {
    let name = getId("tacheName").value;
    let dueDate = getId("tacheDueDate").value;
    let priority = getId("tacheImportance").value;
    let timelLength = getId("tacheDuree").value;
    let description = getId("tacheDescription").value;

    let tacheKey = "T";
    refreshTachesKey();
    let numberTache = (tachesKey.length + 1);
    if (numberTache < 10){
        numberTache = ("0"+String(numberTache));
    }
    else {
        numberTache = String(numberTache);
    }
    tacheKey += numberTache;

    taches[tacheKey] = {};
    taches[tacheKey].name = name;
    taches[tacheKey].dueDate = dueDate;
    taches[tacheKey].priority = priority;
    taches[tacheKey].timelLength = Number(timelLength);
    taches[tacheKey].description = description;
    taches[tacheKey].done = false;

    getId("userTacheInput").reset();
    tableTachesBuild()
    return false;
}

function clearTachesList() {
    taches = {};
    refreshTachesKey();
    tableTachesBuild();
    return false;
}

function refreshTachesKey(){
    tachesKey = Object.keys(taches);
}

function getId(id) {
    return document.getElementById(id);
}

function sortTaches(x,y){
    if (x.name != y.name){
        return x.name.localeCompare(y.name);
    }
    if (x.dueDate != y.dueDate){
        return x.dueDate - y.dueDate;
    }
    if (x.priority === "top"){
        return 1;
    }
    else if (x.priority === "cool" && y.priority === "top"){
        return -1;
    }
    else if (x.priority ==="cool" && y.priority === "cool"){
        return 0;
    }
    else {
        return 1;
    }
}

function tableTachesBuild() {
    let showAll = true;
    if (!showAllChoose()){
        showAll = false;
    }
    let tableTacheShow = getId("tableTacheShow");
    let numberOfRow = getId("tableTacheShow").rows.length;
    let totalHouresOfTache = 0;
    for (let i = numberOfRow-1; i > 0; i--){
        getId("tableTacheShow").deleteRow(i);
    }
    refreshTachesKey();
    tachesKey.sort(sortTaches);
    for (let tache of tachesKey) {
        if (showAll || !taches[tache].done) {
            totalHouresOfTache += taches[tache].timelLength;
            let row = tableTacheShow.insertRow(1);
            row.addEventListener("mouseover",function(){displayDescription(tache)});
            row.insertCell(0).innerHTML = taches[tache].name;
            row.insertCell(1).innerHTML = taches[tache].dueDate;
            row.insertCell(2).innerHTML = taches[tache].priority;
            row.insertCell(3).innerHTML = taches[tache].timelLength;
            row.insertCell(4).innerHTML = String(!taches[tache].done);

            let tacheIDButton = String(tache + "StateButton");
            if (taches[tache].done) {
                row.insertCell(5).innerHTML = "<input type='button'  id='" + tacheIDButton + "" + "' value='ouvrir'>";
            }
            else {
                row.insertCell(5).innerHTML = "<input type='button' id='" + tacheIDButton + "' value='cloturer'>";
            }
            getId(tacheIDButton).addEventListener("click", switchState);
        }
    }
}

function switchState() {
    let tacheID = String(this.id.slice(0,-11));
    if (taches[tacheID].done){
        taches[tacheID].done = false;
    }
    else {
        taches[tacheID].done = true;
    }
    tableTachesBuild();
}


function showAllChoose() {
    let choose =document.querySelector("input[name='OpenOrAll']:checked").value;
    if (choose === "all"){
        return true;
    }
    return false;
}


function displayDescription(key) {
    document.getElementById("descriptionShow").innerText = taches[key].description;
}