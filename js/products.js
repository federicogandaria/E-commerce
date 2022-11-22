
const catID = localStorage.getItem("catID");
const listado = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
let lista = [];


let usuario =JSON.parse(localStorage.getItem('persona'));

document.getElementById('identificador').innerHTML=usuario.mail //Si existe usuario, se impre usuario.mail en id"identificador"

;

//Filtro precios

function filtrar() {
    let min = parseInt(document.getElementById("minimo").value);//Accedemos al imput del minimo
    let max = parseInt(document.getElementById("maximo").value);
    let articulosF = lista.filter(listita => listita.cost >= min && listita.cost <= max );//Crea un nuevo array con lo que se filtra
    
    articulosF.sort((ant,sig)=>ant.cost-sig.cost);// ordenamos el array nuevo, segun el costo
    mostrar_categorias(articulosF);
}
// toma dos valores y los ordena de mayor a menor por precio. cost
function descendente() {
    let list = lista
    list.sort((a, b)=>b.cost-a.cost);
    console.log(list);
    mostrar_categorias(list);

}
//PARTE UNO DEL ENTREGABLE 3 MOSTRAR PRODUCT INFO
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}
// toma dos valores y los ordena por relevancia  = segun articulos vendidos (soldCount)
function descendenteRel() {
    let list = lista
    list.sort((a, b)=>b.soldCount-a.soldCount);
    console.log(list);
    mostrar_categorias(list);

}
// toma dos valores y los ordena de menor a mayor segun el precio .cost
function ascendente() {
    let list = lista
    list.sort((a, b)=>a.cost-b.cost);
    console.log(list);
    mostrar_categorias(list);

}




function mostrar_categorias(categorias){
    let listaAutos = "";
    for (let auto of categorias){
        listaAutos += 
         `<div onclick="setProductID(${auto.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src=" ${auto.image} " alt="product image" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                    <h4> ${auto.name}  ${auto.currency}  ${auto.cost}  </h4> 
                    <p>   ${auto.description} </p> 
                    </div>
                    <small class="text-muted"> ${auto.soldCount} artículos vendidos</small> 
                </div>

            </div>
        </div>
    </div>`
        
    }
    //el div que tiene el id listadeautos 
    document.getElementById('cat-list-container').innerHTML = listaAutos;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(listado).then(function(resultObj){
        if (resultObj.status === "ok"){
            lista = resultObj.data.products;
            mostrar_categorias(lista);
            nombreCategoria = resultObj.data.catName;
            document.getElementById("textoP").innerHTML = `Estas viendo los productos de la categoria ${nombreCategoria}`;
        }
    });
    document.getElementById("arriba").addEventListener("click", ()=>{
        ascendente();
});

document.getElementById("abajo").addEventListener("click", ()=>{
    descendente();
});

document.getElementById("rel").addEventListener("click", ()=>{
    descendenteRel();
});

document.getElementById("filtro").addEventListener("click", ()=>{
    filtrar();
});

document.getElementById("clearRangeFilter").addEventListener("click", ()=>{
    mostrar_categorias(lista);
});
})