const calendar = Array.from(document.querySelectorAll('.future-calendar'));

console.log(calendar);

const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const allMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

var today = new Date();
var activeMonth, avtiveYear;
  

var daysInMonth = function (myMonth, myYear) {
    return 32 - new Date(myYear, myMonth, 32).getDate();
}

var createColmn = (date, isCrrntMonth, fullDate) => {

    var colmn = document.createElement("span");
    colmn.classList = "date"
    if (isCrrntMonth) colmn.classList = "date active"

    if (isCrrntMonth && activeMonth == today.getMonth() && fullDate.getDate() == date) colmn.classList = "today date active"

    colmn.innerText = date
    return colmn
}

var createRows = function (fullDate) {

    var month = fullDate.getMonth(),

        thisMonth = activeMonth || month,
        prevMonth = thisMonth - 1,
        thisYear = fullDate.getFullYear(),
        rows = [],
        prevMonthDays = daysInMonth(prevMonth, thisYear),
        firstDayOftheMonth = new Date(thisMonth + 1 + " 1 " + thisYear).getDay(),
        thisMonthDays = daysInMonth(thisMonth, thisYear),
        //---------------------------------------------------
        /**
         * @desc: {firstDayOftheMonth} is calulating from  sunday to monday (0 to 6)
         * and we are converting it to monday to sunday (1 to 7)
         */
        firstDayOftheMonth = firstDayOftheMonth > 0 ? firstDayOftheMonth-2 : 5,
        //---------------------------------------------------
        colmDate = prevMonthDays - firstDayOftheMonth; 

    var isPrevMonth = true,
        isCrrntMonth, isNextMonth;

    for (var i = 0; i < 42; i++) {
        if (colmDate > prevMonthDays & i <= 7) {
            colmDate = 1;
            isPrevMonth = false;
            isCrrntMonth = true;
        } else if (i > 7 && colmDate > thisMonthDays) {
            colmDate = 1;
            isCrrntMonth = false;
            isNextMonth = true;
        }

        rows.push(createColmn(colmDate, isCrrntMonth, fullDate));
        colmDate++;
    }
    return rows;
}

var renderDated = function (value) {

    if (isItDate(value)){
        var fullDate = value;
        activeMonth = fullDate.getMonth();
    } else if (typeof value === 'string'){
        var fullDate = new Date(value);
            activeMonth = fullDate.getMonth();
    }else if(!isNaN(value) && value <= 11){
        var fullDate = today;
        activeMonth = value;
    }else{
        return "not a valid Date"
    }
    var month = activeMonth || fullDate.getMonth();
    var year = fullDate.getFullYear();
   // activeMonth = activeMonth ? activeMonth : fullDate.getMonth();


    var calendarTitle = (month, year) => `<div class="header"> <span class="prev" onclick="renderDated(activeMonth-1)">prev</span>    <span class="title"> ${month}(${year})  </span><span class="next" onclick="renderDated(activeMonth+1)"> next</span></div>`

    calendar[0].innerHTML = calendarTitle(allMonths[month], year)


    var newEl = document.createElement("div");
    calendar[0].appendChild(newEl).classList = 'dates';
    var dates = calendar[0].getElementsByClassName('dates');

    createRows(fullDate).forEach(function (element) {
        dates[0].appendChild(element);
    }, this);

}

function isItDate(val){
    return Object.prototype.toString.call(val) === "[object Date]" 
}

renderDated(today);


