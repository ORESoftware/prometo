const async = require('async');


function allSeries() {


}

function makeAsync(makeGenerator, ctx) {

    return function () {

        const generator = makeGenerator.apply(ctx, arguments);

        function handle(result) {
            // result => { done: [Boolean], value: [Object] }

            if (result.done) {
                return Promise.resolve(result.value);
            }
            else {
                return Promise.resolve(result.value).then(function (res) {
                    return handle(generator.next(res));
                }, function (err) {
                    return handle(generator.throw(err));
                });
            }
        }

        try {
            return handle(generator.next());
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

function coroutine(fn) {

    return function(){
        const gen = makeAsync(fn, this);
        return gen.apply(this, arguments);
    };

}



function A(){
this.whoa = 'five';

}


A.prototype.work = coroutine(function*(){

    console.log(this);

    const x = yield new Promise(function(resolve){
           setTimeout(function(){
               resolve(5);
           },1000);
    });

    return yield new Promise(function(resolve){
          setTimeout(function(){
              resolve(x*5);
          },1000);
    });

});


function *z(){
    yield 5;

}

console.log('zeee',z());


var ax = new A();

ax.work().then(function(val){
     console.log('val:',val);
});




function a(a, b, cb) {
    console.log('a:', a, 'b:', b);
    setTimeout(function () {
        cb(null, a);
    }, 100);
}


function allSeriesFromCBs(tasks) {

    return new Promise(function (resolve, reject) {

        async.series(tasks, function (err, results) {
            if (err) {
                reject(err);
            }
            else {
                resolve(results);
            }
        })

    });

}


function allSeriesFromPromiseProviders(providers) {

    return new Promise(function (resolve, reject) {

        providers = providers.map(function (p) {

            return function (cb) {
                p().then(cb.bind(null, null), cb);
            }

        });

        async.series(providers,
            function (err, results) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            })

    });

}


function provider() {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log('resolved...');
            resolve(3);
        }, 300);
    });
}


allSeriesFromPromiseProviders([
    provider,
    provider,
    provider
]).then(function (results) {
    console.log('results:', results);
}, function (e) {
    console.log('err:', err);
});

/*

 example:

 allSeriesFromCBs([
 a.bind(null, 1, 2),
 a.bind(null, 3, 4),
 a.bind(null, 5, 6),
 function (cb) {
 a(7, 8, cb);
 }
 ]).then(function (results) {
 console.log('results:', results);
 });

 */


module.exports = {
    allSeries: allSeries
};