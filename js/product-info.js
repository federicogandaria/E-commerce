
let urlFinal;
let productInfoArray = [];
let arrayComments = []; 
const FORM = document.getElementById('form')
let arrayStars = FORM.getElementsByClassName('fa fa-star');
const productID =  localStorage.getItem("productID");
let score;



  let usuario =JSON.parse(localStorage.getItem('persona'));

   document.getElementById('identificador').innerHTML=usuario.mail
  
  ;

function crearUrl(url) {
   urlFinal = `${url}${productID}${EXT_TYPE}`;
  return urlFinal;
}

function setProductID(id) {
  localStorage.setItem("productID", id);
  window.location = "product-info.html";
}

//PARTE 2 ENTREGA 3, OBTENEMOS LOS DATOS DE PRODUCT INFO 

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(crearUrl(PRODUCT_INFO_URL)).then(function(resultObj){
        if (resultObj.status === "ok"){
          
            productInfoArray = resultObj.data;
            showInfoArray(productInfoArray);
            showProdRel(productInfoArray) //MOSTRAMOS PRODUCTOS RELACIONADOS
        }
    });

  //  PARTE 3 ENTREGA 3, OBTENEMOS LOS DATOS DE PRODUCT COMENTS 
    getJSONData(crearUrl(PRODUCT_INFO_COMMENTS_URL)).then(function(resultObj){
      if (resultObj.status === "ok"){
        
          arrayComments = resultObj.data;
          showCommentsArray(arrayComments);
          
      }
  });
    
})

//MOSTRAMOS EL PRODUCTO CON SU DESCRIPCION NOMBRE,IMAGEN,ETC

function showInfoArray({name, description, cost, currency, soldCount,category, images}) {
   
    let htmlContentToAppend = "";
    htmlContentToAppend = `
      <div>
        <h1>${name}</h1>
        <hr>
      </div>
      <div>
        <h6>Precio</h6> 
        <p>${currency} ${cost}</p>
      </div>
      <div>
        <h6>Descripcion</h6> 
        <p>${description}</p>
      </div>
      <div>
        <h6>Categoria</h6>  
        <p>${category}</p>
      </div>
      <div>
        <h6>Cantidades</h6>  
        <p class=""> ${soldCount}</p>
      </div>
      <div>
        
        <h6>Imagenes</h6>   
        <div <div class="row photos">
              <img class="img-thumbnail col-sm-3" src="${images[0]}">
            </div>
          <img class="img-thumbnail col-sm-3" src="${images[1]}">
        </div>    
          <img class="img-thumbnail col-sm-3" src="${images[2]}">
        </div>
      </div>
      </div>
    </div>                
  `
document.getElementById('container').innerHTML += htmlContentToAppend;

}

function showCommentsArray(array) {
  
  let htmlContentToAppend = "";
  for (const ar of array) {
    htmlContentToAppend += `
        <div class="container-fluid  bg-light text-dark border-bottom border-dark">
          <h6 >${ar.user} ${showStars(ar.score)} ${ar.dateTime}</span> </h6> 
          <p class="">${ar.description}</p>
        </div>
      `
      
  }
  
document.getElementById('container-comment').innerHTML = htmlContentToAppend;

}


 /* ---------------------- MUESTRA PRODUCTOS RELACIONADOS ------*/
 function showProdRel({relatedProducts}){
  let htmlContentToAppend = "";
  for (const relProd of relatedProducts) {
    
    htmlContentToAppend += `
    <div onclick = "setProductID(${relProd.id})" class="card m-2" style="width: 18rem;">
     <img class="img-thumbnail col-sm-10" src="${relProd.image}" class="card-img-top" alt="...">
     <div class="card-body">
      <h5 class="card-title text-center" >${relProd.name}</h5>
      
     </div>
   </div>
   `
  }

  document.getElementById("containerRelProd").innerHTML = htmlContentToAppend;
 }


// Funcion para imprimir score



 function showStars(value){
  let htmlContentToAppend = '';
  for (let i = 0; i < 5; i++) {
    if (i < value) {
      htmlContentToAppend += `
     <span class="fa fa-star checked"></span>
  `
               }
    else{
      htmlContentToAppend +=  `
     <span class="fa fa-star"></span>
  `
    }
   
  }
  return htmlContentToAppend;
}




function addStar(stars){
  quiteStars();
  for (let i=0; i < arrayStars.length; i++) {
    if (i < stars) {
      
      arrayStars[i].classList.add('checked');
    }
    else{
      break;
    }
  }
  return arrayStars;
}

function quiteStars(){
  
  for (let i=0; i < arrayStars.length; i++) {
    
      
      arrayStars[i].classList.remove('checked');
    
    
  }
  return arrayStars;
}

//LE OTORGAMOS VALOR AL SCORE QUE SE DEFINIO SIN VALOR, USANDO EL EVENTO DE CKLIC

arrayStars[0].addEventListener('click', function(){
    addStar(1);
    score = 1
    return score 
});
arrayStars[1].addEventListener('click', function(){
  addStar(2);
  score = 2
  return score
});
arrayStars[2].addEventListener('click', function(){
  addStar(3);
  score = 3
  return score
});
arrayStars[3].addEventListener('click', function(){
  addStar(4);
  score = 4
  return score
});
arrayStars[4].addEventListener('click', function(){
  addStar(5);
  score = 5
  return score
});



document.getElementById('btnComment').addEventListener('click', function submit(){
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  let hour = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  let comment = document.getElementById('addComment').value;
  arrayComments.push({"product": localStorage.getItem("productID"),"user":localStorage.getItem("perfil") ,"score":score, "description": comment , "dateTime": `${day}-${month}-${year} ${hour}`});
  showCommentsArray(arrayComments);
  document.getElementById('addComment').value = "";
})