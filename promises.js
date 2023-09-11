let result="";

function waitResolve(message){
    console.log(message);
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(message);
        },2000)

    });
}
 waitResolve('puras promesas').then((message)=>{
    console.log(message)
 }).catch((message)=>{
    console.log(message);
 });


 function sumarLento(num1,num2)
 {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(num1+num2),2000)

    });
 }
 function sumarRapido(num1,num2)
 {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(num1+num2),1000)

    });
 }
 //ejecuta todas las promesas que enviemos
 const promises =Promise.all([
    sumarLento(1,1)
    ,sumarRapido(2,2),
    "puras promesas",4,true

]);
 //console.log(promises)
 //
 const race = Promise.race([sumarLento(1,1),sumarRapido(2,2)]);
 race.then(console.log).catch(console.log)
 console.log(race)


