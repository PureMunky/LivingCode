// Working-ish JS example
// This is just a proof of concept, the real implementation would need to be public api driven and scalable to mulitple classes.

var lc = (function () {
    var pub = {};
    var records = {};
    var priv = [];

    function record(name, p, params, result) {
        console.log('record', name, p, params, result);
        if(!records[name]) {
            records[name] = [];
        }

        records[name].push({
            priv: p,
            params: params,
            result: result
        });
    }

    function write(name, body)
    {
        console.log('defined', name, body)
        priv.push(body);
        var i = priv.length - 1;

        if(!pub[name]) {
            pub[name] = {
                current: 0,
                latest: 0,
                funcs: [0]
            };
        } else {
            pub[name].funcs.push(i);
            pub[name].latest = i;
        }

        if(records[name]) {
            var pass = 0;
            var fail = 0;
            var error = false;
            records[name].forEach(el => {
                if(el.priv == pub[name].current) {
                    try {
                        if(callInner(el.params, i) == el.result) {
                            pass++;
                        } else {
                            fail++;
                        }
                    } catch(e) {
                        error = true;
                    }
                }
            });

            if(fail == 0 && pass >= 0 && error == false) {
                // the new function has all the same resonses as the old so it passes and replaces the exising
                // or the old function has no runs against it to validate.
                console.log('updated', name, i);
                pub[name].current = i;
            } else {
                // mark as a possible success on future updates to calling code
                // records upgrade failure from current to latest
                console.log('no update', name, i);
                // Not sure if we need to do anything in these specific scenarios.
                if(fail > 0 && pass > 0) {
                    // new function returns some of the same responses but not all
                }
    
                if(fail > 0 && pass == 0) {
                    // new function returns none of the same responses
                }
    
                if(error) {
                    // new function completely errors
                }
            }


        }
    }

    function get(name) {
        return pub[name];
    }

    function callInner(params, p) {
        var func = priv[p];
        return func.apply(null, params);
    }

    function call(name, params, rec) {
        console.log('called', name, params);
        rec = (rec == undefined ? true : rec);

        var result = callInner(params, pub[name].current);

        if(rec) {
            record(name, pub[name].current, params, result);
        }

        return result;
    }
    
    return {
        write: write,
        get: get,
        call: call
    }
}());

function test() {
    lc.write('test', function test(a) { return a + ' something'; });

    lc.call('test', ['hello']); // expect 'hello something'
    
    lc.call('test', ['hello again']); // expect 'hello again something'

    lc.write('test', function test(a) { return a + ' something new'; });
    
    lc.call('test', ['hello']); // expect 'hello something' NOT 'hello something new'
    
    lc.write('test', function test(a) { var r = a + ' something'; console.log(r); return r; });

    lc.call('test', ['hello']); // expect 'hello something' with a log

}