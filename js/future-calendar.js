const calendar = Array.from(document.querySelectorAll('.future-calendar'));

console.log(calendar);

const allDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] 
const allMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'] 

var today = new Date();

let calendarTitle = val => `<div class="title"> ${val} </div>`

var daysInMonth = function (myMonth, myYear) {
    return 32 - new Date(myYear, myMonth, 32).getDate();
}

var createColmn = (date, thisMonth) => {
    
    var colmn = document.createElement("span");
    if (thisMonth) colmn.classList = "active"
    colmn.innerText = date
    return colmn 
}

var createRows = function (month){
    
    thisMonth = month ? month : today.getMonth(),
    prevMonth = thisMonth - 1,
    thisYear = today.getFullYear(),
    rows = [],
    prevMonthDays = daysInMonth(prevMonth, thisYear),
    firstDayOftheMonth = new Date(thisMonth+1 + " 1 " + thisYear).getDay(),
    thisMonthDays = daysInMonth(thisMonth, thisYear)
    colmDate = prevMonthDays + 2 - firstDayOftheMonth; // fix the logic of adding 2  

    var isPrevMonth = true,
     isCrrntMonth, isNextMonth;

    for(var i=0;i < 42; i++) {
        if(colmDate > prevMonthDays & i <= 7){
            colmDate = 1;
            isPrevMonth= false;
            isCrrntMonth=true;
        }else if (i > 7 && colmDate > thisMonthDays){
            colmDate = 1;
            isCrrntMonth = false;
            isNextMonth = true;


            
        } 
        
        rows.push(createColmn(colmDate, isCrrntMonth))
        colmDate++
    }
    return rows;
}

var renderDated = function(month){
    calendar[0].innerHTML = calendarTitle(allMonths[month])
    var newEl = document.createElement("div");
    calendar[0].appendChild(newEl).classList = 'dates'
    var dates = calendar[0].getElementsByClassName('dates')
    createRows(month).forEach(function(element) {
        dates[0].appendChild(element)
    }, this);

} 
renderDated(6);
 

