let users={
    admin:{id:1,username:'admin',password:'12345'},
    pepe:{id:2,uername:'pepe',passsword:'pepe'}
};

exports.autenticar = (login,password,callback)=>{
   if(users[login]){
       if(password===users[login].password){
           callback(null,users[login]);
       }else{
           callback(new Error("password erroneo"));
       }
   }else{
       callback(new Error('User incorrecto'));
   }
};