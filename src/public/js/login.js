const form = document.getElementById("loginForm");

form.addeventListener("submite", e =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value,key)=>obj[key] = value);    

    fetch("/api/sessions/login",{
        method: "POST",
        body:json.stringify(obj),
        headers:{
            "Content-Type": "application/json"
        }
    }).then(result=>{
        if(result.status === 200){
            window.location.replace("/dbproducts")
        }else{
            console.log(result);
        }
    })   
    

})