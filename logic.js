var laticinios = [];
var hortifruti = [];    
var congelados = [];
var mercearia = [];
var doces = [];
var carnes = [];
var poicalias = [];
var bebidas = [];
var bazar  = [];
var higiene = [];
var casa = [];

var listas = [laticinios, hortifruti, congelados, mercearia, doces, carnes, poicalias, bebidas, bazar, higiene, casa];
var categorias = ["Laticínios", "Horti-Fruti", "Congelados", "Mercearia", "Doces", "Carnes", "Poicalias", "Bebidas", "Bazar", "Higiene", "Para a casa"];

var divItens = document.getElementById("itens");
var divAdicionar = document.getElementById("itemAdicionar");

var itens = 0;

function adicionar(){
    document.getElementById("adicionar").hidden = true;
    document.getElementById("remover").hidden = true;
    document.getElementById("confirmaRemover").hidden = true;

    var elementos = "";

    elementos += "<input id='produto' autocomplete='off' placeholder='Digite o nome do produto' autofocus><button id='confirmar' onclick='confirmar()'>✓</button><br>";
    elementos += "<p>Categoria:</p>";
    elementos += "<select id='categorias'><option selected disabled>Selecione</option>";
    for(var i = 0; categorias.length > i; i++){
        elementos += `<option value="${categorias[i]}">${categorias[i]}</option>`;
    }
    elementos += "</select>";

    divAdicionar.innerHTML = elementos;
}

function cancelar(){
    document.getElementById("adicionar").hidden = false;
    mostraListas();
    divAdicionar.innerHTML = "";
}

function confirmar(){
    var produto = document.getElementById("produto").value;

    if(produto == ""){
        cancelar();
    }else{
        adicionarProduto(produto);
        mostraListas();
        cancelar();
    }
}

function adicionarProduto(produto){
    var escolha = document.getElementById("categorias").value;
    var index = categorias.indexOf(escolha);

    if(index >= 0){
        listas[index].push(produto);
    }else{
        cancelar();
    }
}

function mostraListas(){
    var elementos = "";
    itens = 0;

    for(var i = 0; listas.length > i; i++){
        if(listas[i].length > 0){
            elementos += `<div class="elemento-titulo"><h3>${categorias[i]}</h3></div>`;
            for(var index in listas[i]){
                elementos += `<div class='elemento'><label value='${listas[i][index]}'>${listas[i][index]}</label></div>`;
                itens++;
            }
            elementos += '<br>';
        }
    }
    divItens.innerHTML = elementos;   
        
    if(itens > 0){
        document.getElementById('remover').hidden = false;
    }else{
        document.getElementById('remover').hidden = true;
    }
}

function remover(){
    mostraItensRemover();
    document.getElementById("adicionar").hidden = true;
    document.getElementById("remover").hidden = true;
    document.getElementById("confirmaRemover").hidden = false;
    document.getElementById("cancelaRemover").hidden = false;
}

function cancelaRemover(){
    document.getElementById("adicionar").hidden = false;
    document.getElementById("remover").hidden = false;
    document.getElementById("confirmaRemover").hidden = true;
    document.getElementById("cancelaRemover").hidden = true;
    mostraListas();
}

function mostraItensRemover(){
    var elementos = "";

    for(var i = 0; listas.length > i; i++){
        if(listas[i].length > 0){
            elementos += `<div class="elemento-titulo"><h3>${categorias[i]}</h3></div>`;
            for(var index in listas[i]){
                elementos += `<div class='elemento'>`;
                elementos += `<input name='${categorias[i]}' value='${listas[i][index]}' id='${listas[i][index]}=${categorias[i]}' type='checkbox'>`;
                elementos += `<label>${listas[i][index]}</label></div>`;
            }
            elementos += '<br>';
        }
    }
    divItens.innerHTML = elementos; 
}
        
function confirmaRemover(){
    for(var categoria = 0; listas.length > categoria; categoria++){
        if(listas[categoria].length > 0){
            
            for(var item = listas[categoria].length - 1; item > -1; item--){
                var elementoCategoria = document.getElementById(listas[categoria][item] + '=' + categorias[categoria]);
                    
                if(elementoCategoria.checked == true){

                    var index = listas[categoria].indexOf(elementoCategoria.value);
                    listas[categoria].splice(index, 1);
                }
            }
        }
    }
    document.getElementById("remover").hidden = false;
    document.getElementById("confirmaRemover").hidden = true;
    document.getElementById("adicionar").hidden = false;
    document.getElementById("cancelaRemover").hidden = true;
    mostraListas();
}