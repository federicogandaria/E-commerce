document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});


document.addEventListener("DOMContentLoaded",()=>{
    //getitem obtiene el valor del item ("persona")
    //json.parse convierte strings a un json
    let usuario =JSON.parse(localStorage.getItem('persona'));
    if (usuario==null){
        location.href="login.html"; //Si no existe usuario me envia a login.html
    }else{
        document.getElementById('identificador').innerHTML=usuario.mail //Si existe usuario, se impre usuario.mail en id"identificador"
    }
    });



