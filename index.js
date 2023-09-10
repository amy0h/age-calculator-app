const dayAlertMessage = document.getElementById('day-alert-message')
const monthAlertMessage = document.getElementById('month-alert-message')
const yearAlertMessage = document.getElementById('year-alert-message')

const currentDate = new Date();
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth() + 1
const currentDay = currentDate.getDate()

document.getElementById('calculate-btn').addEventListener('click', function(event){
    event.preventDefault()

    const userDate = document.getElementById('day').value
    const userMonth = document.getElementById('month').value
    const userYear = document.getElementById('year').value
    isValidDate(userDate, userMonth, userYear);
});

function isValidDate(day, month, year) {
    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    
    const isYearValid = isValidYear(year);
    const isMonthValid = isValidMonth(month);
    const isDayValid = isValidDay(day, month, year);

    if (isYearValid && isMonthValid && isDayValid) {
        calculateAge(day, month, year)
    } 
}

// Check if user has entered a value and it is greater than current year
function isValidYear(year) {
    if (!year) {
        yearAlertMessage.textContent = 'This field is required'
        document.getElementById('year').classList.add('invalid-input');
        toggleValidationClass('year', false);
        return false
    }
    else if (year > currentYear) {
        yearAlertMessage.textContent = 'Must be in the past'
        toggleValidationClass('year', false);
        return false
    }
    else {
        yearAlertMessage.textContent = ''
        toggleValidationClass('year', true);
        return true 
    }
}

// Check if user has entered a value and it is a valid month
function isValidMonth(month) {
    if (!month) {
        monthAlertMessage.textContent = 'This field is required'
        toggleValidationClass('month', false);
        return false
    }
    else if (month < 1 || month > 12) {
        monthAlertMessage.textContent = 'Must be a valid month'
        toggleValidationClass('month', false);
        return false
    }
    else {
        monthAlertMessage.textContent = ''
        toggleValidationClass('month', true);
        return true
    }
}

// Check if user has entered a value and it is a valid day
function isValidDay(day, month, year) {
    if (!day) {
        dayAlertMessage.textContent = 'This field is required'
        toggleValidationClass('day', false);
        return false
    } else if (
        (day < 1 || day > 31) || // Check if day is out of valid range
        (month === 2 && (
            (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0))
                ? day > 28 // February in a non-leap year
                : day > 29 // February in a leap year
        )) ||
        ([4, 6, 9, 11].includes(month) && day > 30) // Check for months with 30 days
    ) {
        dayAlertMessage.textContent = 'Must be a valid day'
        toggleValidationClass('day', false);
        return false
    } else {
        dayAlertMessage.textContent = ''
        toggleValidationClass('day', true);
        return true
    }
}

function calculateAge(day, month, year) {
    const dayPlaceholder = document.getElementById('day-placeholder')
    const monthPlaceholder = document.getElementById('month-placeholder')
    const yearPlaceholder = document.getElementById('year-placeholder')

    let ageYears = currentYear - year
    let ageMonths = currentMonth - month
    let ageDays = currentDay - day

    if (ageDays < 0) {
        ageMonths--;
        const daysInLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate()
        ageDays += daysInLastMonth
    }
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12
    }
    
    dayPlaceholder.textContent = ageDays
    monthPlaceholder.textContent = ageMonths
    yearPlaceholder.textContent = ageYears
}

// Change color of label text and input border if validation fails
function toggleValidationClass(inputId, isValid) {
    const inputField = document.getElementById(inputId);
    const label = document.querySelector(`label[for="${inputId}"]`);

    if (!isValid) {
        inputField.classList.add('invalid-input');
        label.classList.add('invalid-label');
    } else {
        inputField.classList.remove('invalid-input');
        label.classList.remove('invalid-label');
    }
}