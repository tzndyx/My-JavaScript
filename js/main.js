// 日志打印代码
var logNum = 0;
var createLogOut = function (nodeName, outType, logMessage) {
    var node = document.createElement(nodeName);
    var logArea = document.getElementById("logController");
    logArea.appendChild(node);
    node.innerHTML = ' info[' + logNum + ']>> ' + logMessage;
    logNum++;
    if (outType == 'error') {
        node.style.color = "red";
    } else {
        node.style.color = "blue";
    }
}
function clearLog() {
    var logArea = document.getElementById("logController");
    var tagArr = logArea.getElementsByTagName('p');
    for (var i = tagArr.length - 1; i >= 0; i--) {
        logArea.removeChild(tagArr[i]);
    }
    logNum = 0;
}
function logOut(info) {
    createLogOut('p', 'log', info);
}
function errorOut(info) {
    createLogOut('p', 'error', info);
}

// 页面函数代码

// 闭包实现累加
function f1() {
    var n = 0;
    function f2() {
        n++;
        logOut(n)
    }
    return f2
}
var f = f1()
function doResult() {
    f()
}

// 闭包实现私有化变量
function Product() {
    var name = 'default';
    this.kk = 'kk';
    this.setName = function (value) {
        name = value;
    };
    this.getName = function () {
        return name;
    };
}

function doResult2() {
    var p = new Product();

    logOut(p.getName());    //default
    p.setName('张三');
    logOut(p.name);        //undefined
    errorOut(p.getName());  //张三
    errorOut(p.kk);  //kk
}

var fn = function () {
    var
        a,
        btn = document.getElementById('btn'),
        addNumber, getNumber, setNumber,
        init;
    setNumber = function () {
        a = 1;
    };
    getNumber = function () {
        return a;
    };
    addNumber = function () {
        a++;
        console.log(a);
    };
    init = function () {
        setNumber();
        btn.onclick = function () {
            addNumber();
        };
    };
    return {
        getNum: getNumber,
        init: init
    };
};
var F = fn();
// 首先四个函数都使用了闭包，所以他们都可以访问到F的私有变量a，其中getNum和init是公有函数(模块化)，addNum和setNumber是私有函数


// 柯里化的实现方法  开始
let generalGetMyApi = function (api) {
    //把函数和需要固定住的参数都传递进来
    let settledArgs = [].splice.call(arguments, 1);
    //返回一个新的函数，这个函数包含了已经固定住部分参数，并且传入一些易变的参数
    return function () {
        //将不变的参数和易变的参数重新传进这个函数再执行
        let mutableArguments = arguments;
        api.call(null, [].concat.apply(settledArgs, mutableArguments));
    }
}
function doResult3() {
    let api1 = function () {
        errorOut('测试api1');

        logOut(arguments[0]);
    }
    let myApi1 = generalGetMyApi(api1, "myApp1", 'appName');
    myApi1("xiaoming", "小明");
    myApi1("xiaohong", "小红");
    myApi1("xiaogang", "小刚");
}

// let myApi12 = generalGetMyApi(api2, "myApp1");
// myApi2("token1", "xiaoming");
// myApi2("token2", "xiaohong");
// myApi2("token3", "xiaogang");
// 柯里化的实现方法  结束


// 普通实现方法
var api1 = function (appId, userId, userName) {
    logOut(appId);
    logOut(userId);
    logOut(userName);
}
var klh1 = function (appId) {
    let appIdtemp = appId;
    return function (userId, userName) {
        api1(appIdtemp, userId, userName)
    }
}
var klh2 = function (appId, appName) {
    let appIdtemp = appId;
    let appNametemp = appName;
    return function (userId, userName) {
        api1(appIdtemp, appNametemp, userId, userName)
    }
}
// 普通实现方法 1  api  appId  args 开始
function doResult4() {
    // api1('111','zs','张三');
    // api1('111','ls','李四');
    let test1 = klh1('222');
    test1('zs', '张三');
    test1('ls', '李四');
}
// 普通实现方法 1  api  appId  args 结束

// 普通实现方法 2  api  appId appName  args  开始
function doResult5() {
    // api1('111','zs','张三');
    // api1('111','ls','李四');
    klh2('222', 'appNaaa')('zs', 'wangwu');
}
// 普通实现方法 2  api  appId appName  args  结束
function doit() {

    var s = { "0": 0, "1": 1 };
    logOut(1 in s);
    errorOut(2 in s);
}

// 函数的重载
function addMethod(object, name, f) {
    var old = object[name];
    object[name] = function () {
        // f.length为函数定义时的参数个数 
        // arguments.length为函数调用时的参数个数 
        if (f.length === arguments.length) { 
            return f.apply(this, arguments);
        }
        else if (typeof old === "function") { 
            return old.apply(this, arguments);
        }
    };
}
// 不传参数时，返回所有name 
function find0() {
    return this.names;
}
// 传一个参数时，返回firstName匹配的name 
function find1(firstName) {
    var result = [];
    for (var i = 0; i < this.names.length; i++) {
        if (this.names[i].indexOf(firstName) === 0) {
            result.push(this.names[i]);
        }
    } return result;
} // 传两个参数时，返回firstName和lastName都匹配的name 
function find2(firstName, lastName) {
    var result = [];
    for (var i = 0; i < this.names.length; i++) {
        if (this.names[i] === firstName + " " + lastName) {
            result.push(this.names[i]);
        }
    }
    return result;
}

function doResult6() {
    var people = { names: ["Dean Edwards", "Alex Russell", "Dean Tom"] };
    addMethod(people, "find", find0);
    // addMethod(people, "find", find0);
    // addMethod(people, "find", find1);
    // addMethod(people, "find", find2);
    logOut(people.find()); // 输出["Dean Edwards", "Alex Russell", "Dean Tom"] 
    // logOut(people.find()); // 输出["Dean Edwards", "Alex Russell", "Dean Tom"] 
    // errorOut(people.find("Dean")); // 输出["Dean Edwards", "Dean Tom"] 
    // logOut(people.find("Dean", "Edwards")); // 输出["Dean Edwards"]
}

// 工作日计算

// 20190813 中秋节 20190816  
// 20191001 国庆节 20191008
// 20191002
// .
// .
// .
// 20191007

function getIncomeDate() {
    var date = new Date();
    var zhongQ = ['20190813', '20190814', '20190815'];
    var guoQ = ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'];
    var week = date.getDay();
    var hours = date.getHours();
    var isWorkingTime = true;
    var incomeDate = '';

    if (week < 5 && week > 0) { //周一到周四
        if (hours < 8 || hours > 14) {    //非工作时间段  第二天
            date.setDate(date.getDate() + 1);
            isWorkingTime = false;
        }
    } else {  //周五 六 日 
        isWorkingTime = false;
        if (week == 5) {
            if (hours < 8 || hours > 14) {
                date.setDate(date.getDate() + 3)    //周五非工作时间段  下周一
            } else isWorkingTime = true;  //工作时间段  当天
        } else if (week == 6) {
            date.setDate(date.getDate() + 2)    //周六非工作时间段  下周一
        } else {
            date.setDate(date.getDate() + 1);   //周六非工作时间段  下周一
        }
    }
    // 格式化时间
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    incomeDate = '' + year + month + day;
    if (zhongQ.indexOf(incomeDate) > -1) {
        incomeDate = '20190816';
        isWorkingTime = false;
    } else if (guoQ.indexOf(incomeDate) > -1) {
        incomeDate = '20191008';
        isWorkingTime = false;
    }
    return {
        IncomeDate: incomeDate,
        IsWorkingTime: isWorkingTime
    }
}

function doResult7() {
    var incomeDate = getIncomeDate();
    logOut('下个工作日是:' + incomeDate.IncomeDate);
    errorOut('当前是否为工作时间段:' + (incomeDate.IsWorkingTime ? '是' : '否'))

}
