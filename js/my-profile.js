let usuario =JSON.parse(localStorage.getItem('persona'));

document.getElementById('identificador').innerHTML=usuario.mail

;



document.getElementById('user_email').value = JSON.parse(localStorage.getItem('persona')).mail;
let primernombre = [];
let segundonombre = [];
let primerapellido = [];
let segundoapellido = [];
let telefono = [];

function guardarinfo(){
  
  primernombre = document.getElementById('primer_nombre').value;
  segundonombre = document.getElementById('segundo_nombre').value;
  primerapellido = document.getElementById('primer_apellido').value;
  segundoapellido = document.getElementById('segundo_apellido').value;
  telefono = document.getElementById('user_phone').value;
  

  localStorage.setItem('Primer-Nombre', primernombre);
  localStorage.setItem('Segundo-Nombre', segundonombre);
  localStorage.setItem('Primer-Apellido', primerapellido);
  localStorage.setItem('Segundo-Apellido', segundoapellido);
  localStorage.setItem('Telefono', telefono); 

}

let perfilform = document.getElementById('perfil_form');
  perfilform.addEventListener('submit', function (event) {
    if (!perfilform.checkValidity()) {
      event.  preventDefault()
      event.stopPropagation()
      

    } else {
      alert('envio exitoso')
      


    }

    perfilform.classList.add('was-validated')
  })

let bntcambios = document.getElementById('btn_cambios');
bntcambios.addEventListener('click', function(){
guardarinfo();


})


function mostrarinfo(){

  document.getElementById('primer_nombre').value = localStorage.getItem('Primer-Nombre');
  document.getElementById('segundo_nombre').value = localStorage.getItem('Segundo-Nombre');
  document.getElementById('primer_apellido').value = localStorage.getItem('Primer-Apellido');
  document.getElementById('segundo_apellido').value = localStorage.getItem('Segundo-Apellido'); 
  document.getElementById('user_phone').value = localStorage.getItem('Telefono');

}

document.addEventListener("DOMContentLoaded", function(){
  mostrarinfo();
});

