# Golin Dev Challenge

To create the form, I implemented the following - 

## BEM methodology 
This kept my code easy to understand and easily scalable.

## Sass
I created a separate form sass file so that the component can be easily re-used in different parts of the site or in other apps. I also created seperate sass files to store variables, animations, typography and utililty classes to keep the styling consistent. This also makes the code easier to tweak, for example, if a client wants a colour changed, I can change the variable once and it will affect the entire app. I did not use Flexbox or Grid as I wanted to ensure that the app works on older browsers.

## Accessibilty
When styling the input boxes, I removed the default browser outline, but to ensure that a user can still navigate through the form with the keyboard tab key, I added a box shadow effect. This enables the user to see what input box is currently selected. When compiling the final code, I used babel-pollyfil to ensure that my app supports older browsers such as IE11. I also used a prefixer to ensure that my CSS works correctly on older browsers.

## Form Validation
As I had not previously used a JS library for form validation, I decided to use JQuery validation as I am familiar with JQuery code. This enabled validation on inputs such as full name, email, card number and phone. JQuery validation did not support validation for CVV and expiry date with month/year in same input, so I created a function to handle CVV validation - 

```
let securityVal = securityNum.value;
    if (securityVal.length !== 3) {
        securityNumErr.textContent = "Must contain 3 digits"; // If input does not contain 3 digits, throw error message
        return;
    } else {
        securityNumErr.textContent = "";
    }
```

I attached an error message to the form label if the user input was any less or more than 3 digits.

For expiry date validation, I implemented a function to check that the format is correct via a regular expression. I grabbed the expiry date from the form and checked against the current date. I also used a function created in http://jsfiddle.net/ArtyomShegeda/rFLX3/ to format the year from 2 digit format to 4 digit format.

## Other JS Functions
JQuery validation provides the user with error messages via the form label. To ensure the value donated and the number of donors is not updated if any form inputs are incorrect, I wrote a JS function to loop over all the label inputs. The amount updated and the number of donors is only updated if the text content is empty in the form labels. Here's the code - 

```
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
    persistData(); // Update local storage
}
```

I also enabled the amounts to be saved via LocalStorage. The app can be re-loaded in the browser and the previous amounts will be restored in the UI - 

```
const readStorage = () => {
    // Get local storage and convert into object
    const moneyStorage = JSON.parse(localStorage.getItem('money'));
    const donarStorage = JSON.parse(localStorage.getItem('donar')); 

    // Restore data from the local storage and add back to UI
    if (moneyStorage) amountRemaining.textContent = moneyStorage;
    if (donarStorage) donor.textContent = donarStorage;
};
```

```
const persistData = () => {
    // Add amount remaining and donor amount to local storage
    localStorage.setItem('money', JSON.stringify(amountRemaining.textContent));
    localStorage.setItem('donar', JSON.stringify(donor.textContent))
};
```

## Future Improvements

I would like to learn more about JQuery validation and prevent the form from submitting properly if an error message occurs. This would be preferable to writing a function and checking if the form labels' text input are empty. I would also like to implement a task runner such as Gulp to compress the final code. I used Webpack in this instance as it is tried and tested for me and still enabled me to compress the final JS file.