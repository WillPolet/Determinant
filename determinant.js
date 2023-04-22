// Encore a gerer, quand on efface le contenu de la matrice, supprimer la div avec le résultat du det, 
// Quand on supprime la matrice, supprimer la div également et pour les deux cas remettre calcDetUneFois à false
// Ok tout est bon maintenant il faut mettre en forme avec le CSS !

var createUneFois = false //Sert à ne créer qu'une seule fois le tableau d'input
var calcDetUneFois = false // Sert à ne pas créer de multiples div avec le résultat du déterminant

function Create(){
    if (createUneFois == false){
    let indice = 0
    n = document.getElementById("n").value
    let newTable = document.createElement("table")
    newTable.id = "table"
    document.getElementById("matrice").appendChild(newTable)
    for (let i = 0 ; i < n ; i ++){
        let newRow = document.createElement("tr")
        newRow.id = "row" + i
        document.getElementById("table").appendChild(newRow)
        for (let j = 0 ; j < n ; j++){
            let newTd = document.createElement("td")
            newTd.id = "case" + indice       // On va donner un ID aux cases et à leur contenu
            document.getElementById(newRow.id).appendChild(newTd)
            let newInput = document.createElement("input")
            newInput.setAttribute("type","text")
            newInput.id = "Input" + indice
            document.getElementById(newTd.id).appendChild(newInput)
            indice += 1
        }
    }
    reveal()
    createUneFois = true}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------

function Fill_Matrice(){
    let matrice = []
    n = document.getElementById("n").value
    for (let a = 0 ; a < n ; a++){
        matrice.push([])
    }
    let i = 0
    while (i < n**2){
        for (let j = 0 ; j < n ; j++){
            for (let k = 0 ; k < n ; k++){
                let input = "Input" + i
                let value = document.getElementById(input).value
                matrice[j][k] = value
                i += 1
            }
        }

    }
    reveal()
    create_div(determinant(matrice,n))
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function Empty(){
    let i = 0
    n = document.getElementById("n").value
    while (i < n**2){
        for (let j = 0 ; j < n ; j++){
            for (let k = 0 ; k < n ; k++){
                let input = "Input" + i
                document.getElementById(input).value = null
                i += 1
            }
        }

    }
    document.getElementById("divDet").remove()
    calcDetUneFois = false
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function Erase(){
    document.getElementById("matrice").innerHTML = "";
    createUneFois = false
    document.getElementById("calculer").style.display = "none"
    document.getElementById("vider").style.display = "none"
    document.getElementById("effacer").style.display = "none"
    document.getElementById("divDet").remove()
    calcDetUneFois = false
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function determinant(a,n){

    if (n == 1){
       return a[0]
    }
 
    else {
       let tabMin = []
 
       for (let m = 0 ; m < n ; m++){
          let tab = [];
 
          for (let o = 0 ; o < (n-1) ; o++){
             tab.push([])
          }
 
          let k = 0;
 
          for (let i = 0 ; i < n ; i++){
             let l = 0;
             if (i === 0){continue;}
             for (let j = 0 ; j < n ; j++){
                if (j === m) {continue ;}
                tab[l][k] = a[i][j];
                l +=1;
             }
             k +=1;
       }
       tabMin.push(tab)
    }
    let det = 0
    for (let p = 0 ; p < n ; p++){
       det += (-1)**p * a[0][p] * determinant(tabMin[p],(n-1))
    }
    return det
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function reveal (){
    document.getElementById("calculer").style.display = "inline"
    document.getElementById("vider").style.display = "inline"
    document.getElementById("effacer").style.display = "inline"
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function create_div(det){
    if (calcDetUneFois == false){
        let newDiv = document.createElement("div")
        newDiv.id = "divDet"
        newDiv.textContent = "Le déterminant de la matrice vaut : " + det
        document.getElementById("calculator").appendChild(newDiv)
        calcDetUneFois = true
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------