let cours = {};
let coursKey = Object.keys(cours);

function ajouterCours(){
    let name = getId("NomCours").value;
    let priority = getId("CoursImportance").value;
    let date = getId("DateCours").value;
    let indication = getId("IndicationCours").value;

    let coursKey = "C";
    refreshCoursKey();
    let numberCours = (tachesKey.length+1);

    cours[coursKey].name = name;
    cours[coursKey].priority = priority;
    cours[coursKey].date = date;
    cours[coursKey].indication = indication;
    cours[coursKey].done = false;

}
function clearCours(){
    cours = {};
    refreshTachesKey();
}
function refreshCoursKey() {
    tachesKey = Object.keys(cours);
}
function getId(id) {
    return document.getElementById(id);
}
