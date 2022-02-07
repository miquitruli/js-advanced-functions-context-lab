let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }  
}

function createEmployeeRecords(array) {
    return array.map(record => createEmployeeRecord(record)) //creates two records, correctly assigns the first names, creates more than 2 records
}

function createTimeInEvent(dateStamp) {
    const newTimeInEvent = {type: "TimeIn", hour: parseInt(dateStamp.slice(-4)), date: dateStamp.slice(0, 10)} //creates the correct type, hour, and date

    this.timeInEvents.push(newTimeInEvent)
    return this
}

function createTimeOutEvent(dateStamp) {
    const newTimeOutEvent = {type: "TimeOut", hour: parseInt(dateStamp.slice(-4)), date: dateStamp.slice(0, 10)} //creates the correct type, hour, and date

    this.timeOutEvents.push(newTimeOutEvent)
    return this
}

function hoursWorkedOnDate (dateStamp) {
    const timeIn = this.timeInEvents.find(event => event.date === dateStamp);
    const timeOut = this.timeOutEvents.find(event => event.date === dateStamp);
    return (timeOut.hour - timeIn.hour)/100;
}

function wagesEarnedOnDate (dateStamp) {
    let timeWorked =  hoursWorkedOnDate.call(this, dateStamp)
    let wage = this.payPerHour

    return timeWorked * wage
}

function allWagesFor() {
    let datesWorked = this.timeInEvents.map(event => event.date === dateStamp)
    let paycheck = datesWorked.reduce(((tally, date) => tally + wagesEarnedOnDate.call(this, date)).bind(this), 0)

    return paycheck
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
} 