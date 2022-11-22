

function login (){
//Crear objeto usuario con mail y contraseña , luego creamos la condicion de si mail y contraseña estan !"", redirecciona 
//a index
    let usuario = {}
     usuario.mail = document.getElementById("email").value;
     usuario.contraseña = document.getElementById("contraseña").value;

    
    
    
    
    
     if (usuario.mail != "" && usuario.contraseña != ""){
        // setItem guarda el valor de un item ("persona")
        //json.stringify convierte el json a un string
        localStorage.setItem('persona', JSON.stringify(usuario));
        location.href = "index.html";
    } 
}
//le agregue usuario para los comentarios
function login2(){
    let perfil = document.getElementById("nombreu").value;
    localStorage.setItem("perfil", perfil)
}

 

//Le agregue la propiedad submit al boton porque al estar dentro de un for, asi se puede enviar y no queda en bucle
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('formulario').addEventListener('submit', (event)=>{
        event.preventDefault() //evita que se refresque la pagina, para que no quede en bucle
        login();
        login2();
    })
})
