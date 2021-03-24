/* Your Code Here */

const createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(array) {
        return createEmployeeRecord(array);
    });
}

const createTimeInEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeInEvents.push({
        type: 'TimeIn',
        date,
        hour: parseInt(hour, 10),
    });
    return this
}

const createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: 'TimeOut',
        date,
        hour: parseInt(hour, 10),
    });
    return this
}

const hoursWorkedOnDate = function (dateWorked) {
    let timeIn = this.timeInEvents.find(function(event) {
        return event.date === dateWorked;
    });

    let timeOut = this.timeOutEvents.find(function(event) {
        return event.date === dateWorked;
    });

    return (timeOut.hour - timeIn.hour) / 100;

}

const wagesEarnedOnDate = function (workDate) {
    let pay = hoursWorkedOnDate.call(this, workDate) * this.payPerHour;
    return parseFloat(pay.toString());
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(function(record) {
        return record.firstName === firstName;
    });

}

const calculatePayroll = function (employeeRecords) {
    return employeeRecords.reduce(function(n, record) {
        return n + allWagesFor.call(record);
    }, 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}