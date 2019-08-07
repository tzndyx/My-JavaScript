// 计算代码执行时间
var Timer = {
    data: {},
    start: function (key) {
        Timer.data.key = new Date();
    },
    end: function (key) {
        var startTime = Timer.data.key;
        if (startTime) {
            Timer.data.key = new Date() - startTime
        }
    },
    getTime: function (key) {
        return Timer.data.key
    }
};
// var Timer1 = {
//     data: {},
//     start: function (key) {
//         Timer.data[key] = new Date();
//     },
//     stop: function (key) {
//         var time = Timer.data[key];
//         if (time)
//             Timer.data[key] = new Date() - time;
//     },
//     getTime: function () {
//         return Timer.data[key];
//     }
// };

//memoizer优化实现求斐波那契数列数列的第n项
function memoizer(fundamental, cache) {
    // cachecache = cache || {};
    var shell = function (s) {
        if (!(s in cache)) {
            cache[s] = fundamental(shell, s);
        }
        return cache[s];
    };
    return shell;
};

var fibonacci = memoizer(function (recur, n) {
    return recur(n - 1) + recur(n - 2);
}, { "0": 0, "1": 1 });

function execute() {
    Timer.start('me');
    logOut(fibonacci(400));
    Timer.end('me');
    logOut(Timer.getTime('me') + 'memoizer 400');
}

//自己模仿memoizer实现求斐波那契数列数列的第n项
function execute1() {
    var aa = function (s) {
        var cache2 = { "0": 0, "1": 1 };
        var bb = function (arg) {
            return cc(arg - 1) + cc(arg - 2)
        }

        var cc = function (n) {
            if (n in cache2) {
                return cache2[n]
            }
            cache2[n] = bb(n);
            return cache2[n];
        }
        return cc(s)
    }

    Timer.start('wd');
    logOut(aa(400));
    Timer.end('wd');
    logOut(Timer.getTime('wd') + '我的方法30')
}

//普通方法实现求斐波那契数列数列的第n项
function execute2() {
    function cc(n) {
        if (n < 2) {
            return n
        }
        return cc(n - 1) + cc(n - 2)
    }

    Timer.start('pt');
    logOut(cc(400))
    Timer.end('pt');
    logOut(Timer.getTime('pt') + '普通方法30')
}

//自己模仿memoizer实现求阶乘
function factorial1(n) {
    if (n < 2) {
        return n
    }
    return (n * factorial1(n - 1))
}

function execute3() {
    Timer.start('factorial1');
    logOut(factorial1(120));
    Timer.end('factorial1');
    logOut(Timer.getTime('factorial1') + '求阶乘30')
}

//通用的 Memoize 方法
// Memoize an expensive function by storing its results.
var memoize1 = function (func, hasher) {
    var memoize = function (key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!(address in cache)) cache[address] = func.apply(this, arguments);
        return cache[address];
    };
    memoize.cache = {};
    return memoize;
};
const factorial = memoize1(function (n) {
    return n === 1 ? 1 : factorial(n - 1) * n
});

function execute4() {
    Timer.start('factorial1');
    logOut(factorial(120));
    Timer.end('factorial1');
    logOut(Timer.getTime('factorial1') + '求阶乘120')
}

// 基于原型
Array.prototype.demo = function () {

}
var test = [];
test.demo();//demo方法污染了原生数组
// 闭包形式的伪数组
function execute5() {
    function List() {
        var list = [],
            self = {
                //构造器
                constructor: List,
                //可以将length定义为属性，但是 需要自己维护
                //返回长度
                length: function () {
                    return list.length;
                },
                //增加
                add: function (item) {
                    list.push(item);
                },
                //当前
                eq: function (index) {
                    return list[index];
                }
                //.....根据需要 自己增加方法

            }
        return self;
    }

    var list = List();
    list.add(1); list.add(2); list.add(3); list.add(4); list.add(5);
    logOut(list.length(1));
    logOut(list.eq(3));
    var list1 = List();
    logOut(list1.eq(3));
}

