

const {Promyse} = require('./promyse');

debugger;

const p = new Promyse(function(resolve){
  debugger;
    resolve(5);
})
.then(function(v){
  debugger;
  console.log(v, v,v,v);
  return 6;
})
.then(function(v){
   console.log(v, v,v,v);
  debugger;
   return new Promyse(function(resolve){
      resolve(7);
   });
})
.then(function(v){
  console.log(v, v,v,v);
  debugger;
  return 8;
})

.then(function(v){
  console.log(v, v,v,v);
  throw 'foo';
  debugger;
  return 9;
})
.catch(e => {
  console.error('caught promise...',e);
})