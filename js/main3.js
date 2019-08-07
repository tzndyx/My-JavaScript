//通用的 Memoization 实现
function generalMemoization(calcFunc) {
    var cache = {};
    var shell = function (n) {
        if (!(n in cache)) {
            cache[n] = calcFunc(shell, n)
        }
        return cache[n]
    }
    return shell
}
//计算斐波那契数列
var calculate = generalMemoization(function (shell, i) {
    if (i < 2) {
        return i
    }
    return shell(i - 1) + shell(i - 2)
})
//计算阶乘
var jc = generalMemoization(function (shell, i) {
    if (i < 2) {
        return 1
    }
    return shell(i - 1) * i
})

function run() {
    // logOut(calculate(400))
    logOut(jc(120))
}

//js高阶函数
function run1() {
    var mips = Array.prototype.map;
    logOut(mips)
}

// reduce统计数组中有多少个不重复的单词
function run2() {
    var arr = ["apple", "orange", "apple", "orange", "pear", "orange"];

    function getWordCnt() {
        var obj = {};
        for (var i = 0, l = arr.length; i < l; i++) {
            var item = arr[i];
            obj[item] = (obj[item] + 1) || 1;
        }
        return obj;
    }
    var s = getWordCnt()
    logOut(s)

    var abj = {}
    arr.reduce(function (initVal, curVal) {
        abj[curVal] = (abj[curVal] + 1) || 1
    }, 0)

    abj;
    errorOut(abj)
}


function aa() {
    var date = new Date();
    var zhongQ = ['20190813', '20190814', '20190815'];
    var guoQ = ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'];
    var week = date.getDay();
    var hours = date.getHours();
    var isWorkingTime = true;
    var incomeDate = '';

    if (week > 0 && week < 5 ) { //周一到周四
        if (hours > 14 && hours <= 23) { //非工作时间段 第二天  0到8 生效时间都是当日
            date.setDate(date.getDate() + 1);
            isWorkingTime = false;
        }
    } else { //周五 六 日 
        isWorkingTime = false;
        if (week == 5) {
            if (ours > 14 && hours <= 23) {
                date.setDate(date.getDate() + 3) //周五非工作时间段 下周一
            } else isWorkingTime = true; //工作时间段 当天
        } else if (week == 6) {
            date.setDate(date.getDate() + 2) //周六非工作时间段 下周一
        } else {
            date.setDate(date.getDate() + 1); //周六非工作时间段 下周一
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
    //判断法定节假日
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

function run3(){
    var workingTime = aa();
    logOut(workingTime.incomeDate);
    errorOut(workingTime.isWorkingTime);
}

function run4(){
    function getIncomeDate (flag) {
        var date = new Date();
        var zhongQ = ['20190813', '20190814', '20190815'];
        var guoQ = ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'];
        var week = date.getDay();
        var hours = date.getHours();
        var isWorkingTime = true;
        var incomeDate = '';

        if(flag == 1){
            if (week > 0 && week < 5 ) { //周一到周四
                if (hours < 9 || hours > 14) { //非工作时间段 第二天
                    date.setDate(date.getDate() + 1);
                    isWorkingTime = false;
                }
            } else { //周五 六 日 
                isWorkingTime = false;
                if (week == 5) {
                    if (hours < 9 || hours > 14) {
                        date.setDate(date.getDate() + 3) //周五非工作时间段 下周一
                    } else isWorkingTime = true; //工作时间段 当天
                } else if (week == 6) {
                    date.setDate(date.getDate() + 2) //周六非工作时间段 下周一
                } else {
                    date.setDate(date.getDate() + 1); //周六非工作时间段 下周一
                }
            }
        }else{
            if (week > 0 && week < 5 ) { //周一到周四
                if (hours > 14 && hours <= 23) { //非工作时间段 第二天  0到8 起息日都是当日
                    date.setDate(date.getDate() + 1);
                    isWorkingTime = false;
                }
            } else { //周五 六 日 
                isWorkingTime = false;
                if (week == 5) {
                    if (hours > 14 && hours <= 23) {
                        date.setDate(date.getDate() + 3) //周五非工作时间段 下周一
                    } else isWorkingTime = true; //工作时间段 当天
                } else if (week == 6) {
                    date.setDate(date.getDate() + 2) //周六非工作时间段 下周一
                } else {
                    date.setDate(date.getDate() + 1); //周六非工作时间段 下周一
                }
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
        //判断法定节假日
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
    var s = getIncomeDate();
    var k = getIncomeDate(1);
    console.log(s.IncomeDate)
    console.log(k.IsWorkingTime)
}