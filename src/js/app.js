const form = document.querySelector('.form');
const expiryLabel = document.querySelector('#expiry-error');
const securityNum = document.querySelector('#security-num');
const securityNumErr = document.querySelector('#security-num-error');
const amountRemaining = document.querySelector('.amount-remaining');
const valueDonated = document.querySelector('#value-donated');
const labels = document.getElementsByTagName('label');
const donor = document.querySelector('.donor-num');


$(function() {

    $('.form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            fullName: {
                required: true,
                letterswithbasicpunc: true
            },
            cardNumber: {
                required: true,
                creditcard: true
            },
            phone: {
                required: true,
                phonesUK: true
            }   
        }   
    });
});


form.addEventListener("submit", e => {
    
    e.preventDefault(); // Don't submit form

    const match = $('#expiry').val().match(/^\s*(0?[1-9]|1[0-2])\/(\d\d|\d{4})\s*$/); // Check if date format is correct
    // if (!match) {
    //     e.preventDefault();
    //     expiryLabel.textContent = 'Invalid Expiry Date!';
    //     return;
    // }

    const exp = new Date(normalizeYear(1*match[2]),1*match[1]-1,1).valueOf(); // Format year and get timestamp
    const now = new Date(); // Get current date
    const currMonth = new Date(now.getFullYear(),now.getMonth(),1).valueOf(); // Get timestamp of current month
    if (exp <= currMonth) { // If expiry date is less than current month, throw error
        expiryLabel.textContent = 'Invalid Expiry Date';
        return;
    } else {
        expiryLabel.textContent = ''; 
    };

    // Check if CVV is 3 digits
    let securityVal = securityNum.value;
    if (securityVal.length !== 3) {
        securityNumErr.textContent = "Must contain 3 digits"; // If input does not contain 3 digits, throw error message
        return;
    } else {
        securityNumErr.textContent = "";
    }
    checkLabelInput(e);
});


function normalizeYear(year) {
    // Format year correctly
    const yearsAhead = 20;
    if (year < 100) {
        const nowYear = new Date().getFullYear();
        year += Math.floor(nowYear/100)*100;
        if (year > nowYear + yearsAhead) {
            year -= 100;
        } else if (year <= nowYear - 100 + yearsAhead) {
            year += 100;
        }
    }
    return year;
}


const checkLabelInput = e => {

    const labelInputArr = Array.from(labels); // Create array from label attributes

    for (let el of labelInputArr) {
        if(el.innerText !== "") { // If any validation error messages occur, do not send money
            console.log('Not equal to zero!');
            return;
        }
    }

    let donorAmount = parseFloat(donor.textContent); // Grab donor amount from UI and convert to number
    let remainAmount = parseFloat(amountRemaining.textContent); // Grab remain amount and convert
    let donateVal = valueDonated.value; // Value donated
    donorAmount++; // Increase donor amount
    donor.textContent = donorAmount; // Update UI
    remainAmount = remainAmount - donateVal; // Update remaining amount
    amountRemaining.textContent = remainAmount; // Update UI 

}

