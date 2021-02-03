const {performance} = require('perf_hooks');

let fac = function f(n) {
	return (n !== 1) ? f(n-1) * n : n;
};

let fib = function fibonachi(n) {
	return (n > 2) ? fibonachi(n - 1) * fibonachi(n - 2) : 1;
}

function logResultDecorator(func, funcName) {
	return function() {
		let result = func.apply(this, arguments);
		console.log(`Result func - ${funcName}: ${result}`);
		return result;
	}
};


function callCountDecorator(func, funcName) {
	let count = 0;
	return function() {
		count++;
		console.log(`Function ${funcName} was called ${count}`);
		return func.apply(this, arguments);
	}
}


function timeDecorator(func, funcName) {
	return function() {
		let startTime = performance.now();
		let result = func.apply(this, arguments);
		let time = performance.now() - startTime;
		console.log(`Function ${funcName} run ${time} ms \n --- --- ---`);
		return result;
	}
}


function cacheDecorator(func) {
	let cache = {};
	
	return function(n) {
		if (typeof cache[n] === 'undefined') {
			cache[n] = func.apply(this, arguments);
		}
		console.log(cache)
		return cache[n];
	}
}


function argumentsCountDecorator(func, requiredNumber) {
	return function() {
		let argsCount = arguments.length;
		if (requiredNumber !== argsCount) {
			console.warn("error")
			return;
		}
		
		return func.apply(this, arguments);
	}
}


fac = logResultDecorator(fac, 'factorial');
fac = cacheDecorator(fac);
fac = callCountDecorator(fac, 'factorial');
fac = timeDecorator(fac, 'factorial');
fac = argumentsCountDecorator(fac, 1);

fib = logResultDecorator(fib, 'fibonachi');
fib = cacheDecorator(fib);
fib = callCountDecorator(fib, 'fibonachi');
fib = timeDecorator(fib, 'fibonachi');
fib = argumentsCountDecorator(fib, 1);

fac(5);
fac(6);
fac(7, 8);

fib(5)
fib(6)
fib(7)
