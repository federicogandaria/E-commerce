usuario.innerHTML = localStorage.getItem("usuario");
const fragment = document.createDocumentFragment()
let nCantidad
let idUser = localStorage.getItem('user');
let userArr ={};
let nPrecio
let total 
const submitBtn = document.getElementById('submit')
const street = document.getElementById('street')
const number = document.getElementById('number')
const corner = document.getElementById('corner')
const form = document.getElementById('form')
const btnTerminos = document.getElementById('btnTerminos')
const credit = document.getElementById('credit')
const transfer = document.getElementById('transfer')

// variables modal

const tarjetNumber = document.getElementById('tarjetNumber')
const securityCode = document.getElementById('securityCode')
const expirationDate = document.getElementById('expirationDate')

const account = document.getElementById('account')



// FETCH
let cartUser = `${CART_INFO_URL}${idUser}${EXT_TYPE}`;
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(cartUser).then(function(resultObj){
        if (resultObj.status === "ok"){
            userArr = resultObj.data.articles;
            showItem(userArr);
        }
    });

    submitBtn.addEventListener("click", (e) => {
          e.preventDefault()
          validar(street);
          validar(number);
          validar(corner);
          validarModal(btnTerminos);
          validarCantidad(document.getElementById('form1'));
          validarRadioBtn(document.querySelector('input[name="publicationType"]:checked'))
          form.classList.add("validado");

          if(validar(street)&&validar(number)&&validar(corner)&&validarModal(btnTerminos)&&validarCantidad(document.getElementById('form1'))
          &&validarRadioBtn(document.querySelector('input[name="publicationType"]:checked'))){debugger
            form.classList.add('was-validated')
          document.getElementById('itsOK').classList.remove('d-none')
          document.getElementById('itsOK').classList.add('d-block')
          }
      
    
    
          document.getElementById('form1').addEventListener("input", () => {
            if (form.classList.contains("validado")) {debugger
                validarCantidad(document.getElementById('form1'));
            }
    })

  })
    street.addEventListener("input", () => {
      if (form.classList.contains("validado")) {
          validar(street);
      }
  });
  number.addEventListener("input", () => {
    if (form.classList.contains("validado")) {
        validar(number);
    }
});
corner.addEventListener("input", () => {
  if (form.classList.contains("validado")) {
      validar(corner);
  }
});

tarjetNumber.addEventListener("input", () => {
  if (form.classList.contains("validado")) {
      validar(tarjetNumber);
  }
});
securityCode.addEventListener("input", () => {
  if (form.classList.contains("validado")) {
      validar(securityCode);
  }
});
expirationDate.addEventListener("input", () => {
  if (form.classList.contains("validado")) {
      validar(expirationDate);
  }
});
account.addEventListener("input", () => {
  if (form.classList.contains("validado")) {
      validar(account);
  }
});
    
})

// CLONAR CONTENIDO 
function cloneHtml(){

  document.getElementById('form1').value= nCantidad
  document.getElementById('price').textContent = `${userArr[0].currency} ${nPrecio}`
  
  const clone = document.getElementById('siteItems').cloneNode(true)
    fragment.appendChild(clone)
}

// SUMA DE LA CANTIDAD DEL PRODUCTO

function quantityPlus(){
  userArr[0].count =  userArr[0].count +1
   nCantidad = Object.values(userArr).reduce((acc, { count }) => acc + count, 0)
   nPrecio = Object.values(userArr).reduce((acc, {count, unitCost}) => acc + count * unitCost ,0)
   document.getElementById('subTotal').innerHTML = `USD${nPrecio}`
  
  cloneHtml()
    
  if(form.classList.contains('validado')){
    validarCantidad(document.getElementById('form1'))
  }
    
}

// SUMA DE LA CANTIDAD DEL PRODUCTO

function quantityMinus(){
  if(nCantidad != 0){
  userArr[0].count =  userArr[0].count - 1
   nCantidad = Object.values(userArr).reduce((acc, { count }) => acc + count, 0)
   nPrecio = Object.values(userArr).reduce((acc, {count, unitCost}) => acc + count * unitCost ,0)
   document.getElementById('subTotal').innerHTML = `USD${nPrecio}`
  
  cloneHtml()
    if(form.classList.contains('validado')){
      validarCantidad(document.getElementById('form1'))
    }
  }
    
}




function showItem(arr){
  let htmlContentToAppend = "";
for (let {name, image, unitCost, currency, count} of arr) {
  nPrecio = unitCost

  htmlContentToAppend = `<div class="row">
                          <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <!-- Image -->
                            <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                              <img src="${image}"class="w-100" alt="${name}">
                                <a href="#!">
                              
                                </a>
                            </div>
                          </div>
  
                          <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p><strong>${name}</strong></p>
                            <p>Color: blue</p>
                            <button type="button" class="btn btn-primary btn-sm me-1 mb-2" data-mdb-toggle="tooltip" title="Remove item">
                              <i class="fas fa-trash"></i>
                            </button>
                          </div>
                          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div class="d-flex mb-4" style="max-width: 300px">
                              <button class="btn btn-primary px-3 me-2" onclick="quantityMinus()">
                                <i class="fas fa-minus"></i>
                              </button>
                              <div class="form-outline">
                                <input id="form1" min="0" name="quantity" value="${count}" type="number" class="form-control " />
                              </div>
                              <button class="btn btn-primary px-3 ms-2" onclick="quantityPlus()">
                                <i class="fas fa-plus"></i>
                              </button>
                            </div>
                            <p class="text-start text-md-center" >
                              <strong id="price">${currency}${unitCost}</strong>
                            </p>
                            </div>
                          </div>
                        </div> `
}
  

document.getElementById('siteItems').innerHTML =htmlContentToAppend;
document.getElementById('subTotal').innerHTML = `USD${nPrecio}`
}

// FUNCION DE COSTOS
const lista = document.getElementById('radioBtns')
const costoUB = document.getElementById('costo')
const totalUB = document.getElementById('total')
lista.addEventListener('click', function costos(e){
  if (e.target && e.target.tagName ==='INPUT') {
    switch (e.target.id) {
      case 'premiumRadio': costoUB.innerHTML = `USD${(nPrecio*0.15).toFixed(0)}`
      totalUB.innerHTML = `USD${(nPrecio*1.15).toFixed(0)}`
        break;
      case 'expressRadio': costoUB.innerHTML = `USD${((nPrecio*0.07).toFixed(0))}`
      totalUB.innerHTML = `USD${(nPrecio*1.07).toFixed(0)}`
      break;
      case 'standardRadio': costoUB.innerHTML = `USD${(nPrecio*0.05).toFixed(0)}`
      totalUB.innerHTML = `USD${(nPrecio*1.05).toFixed(0)}`
      break;
      default:
        break;
    }
  }
  })
 

// Validaciones y Feedbacks

function validar(input) {
  if (input.value === ``) {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
  } else {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
      return true
  }
}

credit.addEventListener('change',()=>{
  account.value = '';
  tarjetNumber.removeAttribute('disabled')
  securityCode.removeAttribute('disabled')
  expirationDate.removeAttribute('disabled')

  account.setAttribute('disabled', '')
})
transfer.addEventListener('change',()=>{
  tarjetNumber.value = ''
  securityCode.value = ''
  expirationDate.value = ''
  account.removeAttribute('disabled')
  tarjetNumber.setAttribute('disabled', '')
  securityCode.setAttribute('disabled', '')
  expirationDate.setAttribute('disabled', '')

})

function validarCantidad(input){
 if (input.value > 0) {
  input.classList.remove('is-invalid')
  input.classList.add('is-valid')
  return true
 }
 else{
  input.classList.remove('is-valid')
  input.classList.add('is-invalid')
 }
}
function validarModal(modal) {
  if (credit.checked) {
    
    validar(tarjetNumber)
    validar(securityCode)
    validar(expirationDate)
    if ((tarjetNumber.classList.contains('is-valid')) &&(securityCode.classList.contains('is-valid'))&&(expirationDate.classList.contains('is-valid'))) {
      btnTerminos.classList.remove('is-invalid')
      btnTerminos.classList.add('is-valid')
      return true
    }
    else {
    
    btnTerminos.classList.add('is-invalid')
  
  }
  }
  else if(transfer.checked){
    validar(account)
    if (account.classList.contains('is-valid')) {
      btnTerminos.classList.remove('is-invalid')
      btnTerminos.classList.add('is-valid')
      return true
    }
    else{
      btnTerminos.classList.add('is-invalid')
    }
  }
  else{
    btnTerminos.classList.add('is-invalid')
  }
}


function validarRadioBtn(input){
  if (input === null) {
    document.getElementById('radioBtns').classList.add('border')
    document.getElementById('radioBtns').classList.add('border-danger')
    document.getElementById('radioBtns').classList.add('rounded')

  }
  else{
    document.getElementById('radioBtns').classList.remove('border')
    document.getElementById('radioBtns').classList.remove('border-danger')
    document.getElementById('radioBtns').classList.add('border')
    document.getElementById('radioBtns').classList.add('border-success')
    document.getElementById('radioBtns').classList.add('rounded')
    return true
  }
}
