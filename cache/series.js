


// function all(promises) {
//   return new Promise(function(success, fail) {
//     var successArr = new Array(promises.length);
//     if (promises.length === 0){
//        return success(successArr);
//     }
//     var pending = promises.length;
//     promises.forEach(function(promise, i) {
//       promise.then(function(result) {
//         successArr[i] = result;
//         if (--pending == 0){
//           success(successArr);
//         }
//       }, function(error) {
//         fail(error);
//       });
//     });
//   });
// }

function allObj(promises) {
  return new Promise(function(success, fail) {
    const ret = {};
    const keys = Object.keys(promises);
    if (keys.length === 0){
       return success(promises);
    }
    var pending = keys.length;
    keys.forEach(function(key, i) {
      promises[key].then(function(result) {
        ret[key] = result;
        if (--pending == 0){
          success(ret);
        }
      }, function(error) {
        fail(error);
      });
    });
  });
}



allObj({
 uno: new Promise(function(resolve){
 	resolve('one');
 }),
 dos: new Promise(function(resolve){
 	resolve('two');
 })

}).then(function(results){
	console.log('results of all:',results);
}).catch(function(e){
	console.error('Rejection reason:', e.stack || e);
});


// all([
//  new Promise(function(resolve){
//  	resolve('one');
//  }),
//  new Promise(function(resolve){
//  	resolve('two');
//  })

// ]).then(function(results){
// 	console.log('results of all:',results);
// }).catch(function(e){
// 	console.error('Rejection reason:', e.stack || e);
// });



/*
Promise.series = function series(providers){
	
	return new Promise(function(resolve,reject){

    const ret = Promise.resolve();
    const results = [];

    providers.forEach(function(p,i){
         ret.then(function(){
         	return p().then(function(val){
               results[i] = val;
         	},
         	function(r){
         		console.log('rejected');
                reject(r);
         	});
         });
    });
    
    

     providers.reduce(function(r, p, i) {
         return r.then(function() {
            return p().then(function(val) {
               results[i] = val;
            });
         });
    }, ret);

 

    ret.then(function(){
         resolve(results);
    },
     function(e){
        reject(e);
     });

	});

}
*/

// Promise.series = function series(promises) {
   
//     const results = [];

//     return promises.reduce(function(result, p, i) {
//          return result.then(function(val) {
//          	results[i] = val;
//             return p.then(function(val) {
//             results[i] = val;
//             });
//          });
//     }).then(function(val) {
//     	console.log('val:',val);
//         return results;
//     });
// }



// Promise.series = function series(promises) {
   
//     const results = [];

//     var ret;

//     promises.forEach(function(p, i){
//         if(ret){
//            ret = ret.then(function(){
//            	return (typeof p === 'function' ? p() : p).then(function(val){
//                   results[i] = val;
//            	});
//            });
//         }
//         else{
//           ret  = (typeof p === 'function' ? p() : p).then(function(val){
//               results[i] = val;
//           });
//         }
//     });

//     return ret.then(function(){
//     	 return results;
//     });

// }

Promise.series = function series(promises) {
   
    const results = [];

    var ret;

    promises.forEach(function(p, i){

        if(ret){
           ret = ret.then(function(){
           	return p.then(function(val){
                  results[i] = val;
           	});
           });
        }
        else{
          ret  = p.then(function(val){
              results[i] = val;
          });
        }

    });

    return ret.then(function(){
    	 return results;
    });

};


// Promise.series([
// 	function(){
// 		return new Promise(function(resolve, reject){
// 			resolve('a');
// 	})}
// 	,
// 	function(){
// 	   return new Promise(function(resolve){
// 			resolve('b');
// 	})	
// 	}
// 	]).then(function(val){
//         console.log(val);
//  	}).catch(function(e){
//         console.error(e.stack);
// 	});


Promise.series = function series(providers) {
    const ret = Promise.resolve(null);
    const results = [];

    return providers.reduce(function(result, provider, index) {
         return result.then(function() {
            return provider().then(function(val) {
               results[index] = val;
            });
         });
    }, ret).then(function() {
        return results;
    });
};


// Promise.series([

// 	function(){
// 	  return new Promise(function(resolve, reject){
// 		  setTimeout(function(){
// 		  	  console.log('a is about to be resolved.')
//               resolve('a');
// 		  },3000);
			
// 	})	
// 	}
	
// 	,
	
// 	function(){

// 	    return new Promise(function(resolve, reject){
// 	    	setTimeout(function(){
// 	    		  console.log('b is about to be resolved.')
//                   resolve('b');
// 	    	},1000);
// 	})
			
// 	},

// 	function(){

// 	    return new Promise(function(resolve, reject){
// 	    	// throw new Error('ralf');
// 	    	setTimeout(function(){
// 	    		  console.log('c is about to be resolved.')
//                   resolve('c');
// 	    	},1000);
// 	})
			
// 	}		
	
// 	]).then(function(results){
//         console.log('results:',results);
//  	},function(e){
//         console.error('Rejection reason:', e.stack || e);
// 	});


// Promise.series([
// 	new Promise(function(resolve, reject){
// 		  setTimeout(function(){
//               resolve('a');
// 		  },3000);
			
// 	})
// 	,
	
// 	    new Promise(function(resolve){
// 	    	setTimeout(function(){
//                   resolve('b');
// 	    	},1000);
			
// 	})	
	
// 	]).then(function(val){
//         console.log('v:',val);
//  	}).catch(function(e){
//         console.error(e.stack);
// 	});



