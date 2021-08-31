/*
Lilly Bargioni

GIT 417 - Chapter 4 Case Project

I utilized exception handling to validate user input from individual entry boxes.
I set the global error variables to true so the calling function would check
for errors by default, and continue to do so until input validates.
I chose to write one function at a time and inspected it using Google Chrome.
I set breakpoints at each line of the function, added watch expressions to
observe the variable changes, and incrimentally stepped through each line.
While inspecting, I ensured there were no syntax or run-time errors.
*/

/************************ GLOBAL VARIABLES ***********************************/
// Contact Form Global Variables
var nameError = true;
var contactError = true;
var emailError = true;
var phoneError = true;
var subjectError = true;
var noteError = true;

// Custom Estimate Form Global Variables
var costEst;
var estimate;
var itemError = true;
var colorError = true;


/************************** CONTACT FORM *************************************/
// Function is called when user clicks radio button, and assigns the selected value
// to the variable radio by iterating through a for loop. After radio value is set,
// if statements are used to display the correlating fieldset.
function showContactField(event) {
  var radio = document.getElementsByName("contactType");

  for(var i = 0; i < radio.length; i++){
    if(radio[i].checked){
      var selected = radio[i];
    }
  }

  if(selected.value === "email") {
    document.getElementById("showEmail").style.display = "block";
    document.getElementById("showPhone").style.display = "none";
  }

  if(selected.value === "phone") {
    document.getElementById("showPhone").style.display = "block";
    document.getElementById("showEmail").style.display = "none";
  }
}

// Function is called when user clicks the form submit button. If statement
// uses global variables to check if there are errors in any of the 3 entries.
// If any field has an error, the form will not submit and it will call functions
// to check validity of each entry, and then call the addEventListener function
// until user clicks submit again.
function validateForm(event) {

  if(nameError || contactError || subjectError || noteError){
    event.preventDefault();
      validateName();
      validateContact();
      validateSubject();
      validateMessage();
  } else if(!nameError && !contactError && subjectError && !noteError){
      alert("Thank you! We will be in touch as soon as possible!");
  }
}

// Function uses exception handling to checks for user input text in the name
// entry. If user didn't input their name, an error message will display
// prompting the user to fix their entry.
function validateName() {
  nameError = false;

  try {
    var name = document.getElementById("nameEntry");
    if(name.value === "") {
      throw "* Please enter your name!";
    }
  }

  catch(errorMessage) {
    nameError = true;
    document.getElementById("nameError").innerHTML = errorMessage;
    document.getElementById("nameError").style.display = "block";
    return false;
  }

  finally {
    if(nameError) {
      console.log("Error: Name Entry Is Required");
      return true;
    }   else if (!nameError) {
          document.getElementById("nameError").style.display = "none";
        }
  }
}

// Function uses a for loop to check that one radio button was clicked; if true,
// variable contactError is set to false and the variable selected is set to the
// value of the checked radio button. Try and catch checks for errors, and displays
// error message if fields are blank. Finally, function uses variable 'selected'
// value to determine which function should be called to show the correlating fieldset.
function validateContact() {
  var radio = document.getElementsByName("contactType");

  for(var i = 0; i < radio.length; i++){
    if(radio[i].checked){
      contactError = false;
      var selected = radio[i].value;
    }
  }

  try {
    if(contactError) {
      throw "Please select your preffered contact method!";
    }
  }

  catch(errorMessage){
    document.getElementById("contactError").innerHTML = errorMessage;
    document.getElementById("contactError").style.display = "block";
    return false;
  }

  finally {
    if(contactError){
      console.log("Error: Preffered Contact Method Required")
    } else if(!contactError){
        document.getElementById("contactError").style.display = "none";
          if(selected === "email"){
            validateEmail();
          } else if(selected === "phone") {
              validatePhone();
          }
      }
  }
}

// Function is only called if user selects radio button 'email' for preffered contact
// method. Exception handling checks the email entry box for user input.
// If user didn't input their email, an error message will display
// prompting the user to fix their entry.
function validateEmail() {
  emailError = false;

  try {
    var email = document.getElementById("emailEntry");
    if(email.value === "") {
      throw "* Please enter your e-mail!";
    }
  }

  catch(errorMessage) {
    emailError = true;
    document.getElementById("emailError").innerHTML = errorMessage;
    document.getElementById("emailError").style.display = "block";
    return false;
  }

  finally {
    if(emailError) {
      console.log("Error: Email Entry Is Required");
    }   else if (!emailError) {
          document.getElementById("emailError").style.display = "none";
        }
  }
}

// Function is only called if user selects radio button 'phone' for preffered
// contact method. Exception handling checks the phone entry box for user input.
// If user didn't input their number, or input less than 10 digits, a message
// will display prompting the user to fix their entry.
// Variable numericError calls function isNaN to validate numeric input values.
function validatePhone() {
  phoneError = false;
  var digits = document.getElementById("phoneEntry").value;
  var numericError = isNaN(document.getElementById("phoneEntry").value)

  try {
    var phone = document.getElementById("phoneEntry");
    if(phone.value === "") {
      throw "Please enter a telephone number."
    } else if(numericError){
        throw "Oops! Only include numbers (no special characters or spaces)"
      } else if(digits.length < 10){
          throw "Oops, that's not enough digits."
      }
  }

  catch(errorMessage){
    phoneError = true;
    document.getElementById("phoneError").innerHTML = errorMessage;
    document.getElementById("phoneError").style.display = "block";
  }

  finally {
    if(phoneError) {
      console.log("Error: Please enter a valid telephone number.")
    } else if(!phoneError) {
      document.getElementById("phoneError").style.display = "none";
    }
  }
}

// Function uses exception handling to check that user selected an option for
// the message subject. If user didn't make a selection an error message will
// display prompting the user to fix their entry.
function validateSubject(){
  subjectError = false;

  try {
    var subject = document.getElementById("subjectEntry");
      if(subject.value === "") {
        throw "Please select the subject of your message!"
      }
  }

  catch(errorMessage) {
    subjectError = true;
    document.getElementById("subjectError").innerHTML = errorMessage;
    document.getElementById("subjectError").style.display = "block";
    return false;
  }

  finally {
    if(subjectError) {
      console.log("Error: Message Subject Is Required");
      return true;
    } else if(!subjectError) {
        document.getElementById("subjectError").style.display = "none";
    }
  }
}



// Function uses exception handling to check the message entry box for user input.
// If user didn't input their message, an error message will display prompting
// the user to fix their entry.
function validateMessage() {
  noteError = false;

  try {
    var message = document.getElementById("messageEntry");
    if(message.value === "") {
      throw "* Oops! You forgot to write a message!";
    }
  }

  catch(errorMessage) {
    noteError = true;
    document.getElementById("messageError").innerHTML = errorMessage;
    document.getElementById("messageError").style.display = "block";
    return false;
  }

  finally {
    if(noteError) {
      console.log("Error: Message Entry Is Required");
      return true;
    }   else if (!noteError) {
          document.getElementById("messageError").style.display = "none";
        }
  }
}


/************************ CUSTOM ESTIMATE FORM *****************************/
// Function is called when user clicks submit button. An if statement checks
// to ensure each field has been selected before calling the getEstimate
// function.
function validateEstForm(event) {

  if(itemError || colorError){
    event.preventDefault();
    validateItemType();
    validateColors();
  } else if (!itemError && !colorError){
      getEstimate();
    }
}

// Function to set the values (price) by the user selection of item type,
// and number of colors used to calcuate the estimated cost of custom piece.
// Estimate total is output to device display.
function getEstimate() {
  var item         = document.getElementById("itemType");
  var colors       = document.getElementById("numColors");

  estimate     = (parseInt(item.value) + parseInt(colors.value));
  document.getElementById("costEst").innerHTML = "$" + estimate;
}

// Function uses exception handling to ensure the user selected an item type.
// If they did, itemError returns false. If they didn't, error message displays
// above the box, prompting user to make a selection.
function validateItemType(){

  var item  = document.getElementById("itemType");
  itemError = false;

  try {
    if(item.value === "") {
      throw "*Please select an item type";
    }
  }

  catch(errorMessage) {
    itemError = true;
    document.getElementById("itemError").innerHTML = errorMessage;
    document.getElementById("itemError").style.display = "block";
    return false;
  }

  finally {
    if(itemError) {
      console.log("Error: Item Type Is Required");
      return true;
    }   else if (!itemError) {
          document.getElementById("itemError").style.display = "none";
        }
  }
}

// Function uses exception handling to ensure the user selected the number of colors.
// If they did, colorError returns false. If they didn't, error message displays
// above the box, prompting user to make a selection.
function validateColors() {

  var colors = document.getElementById("numColors");
  colorError = false;

  try {
    if(colors.value === "") {
      throw "*Please select your colors!";
    }
  }

  catch(errorMessage) {
    colorError = true;
    document.getElementById("colorError").innerHTML = errorMessage;
    document.getElementById("colorError").style.display = "block";
    return false;
  }

  finally {
    if(colorError) {
      console.log("Error: Color Selection Is Required");
      return true;
    }   else if (!colorError) {
          document.getElementById("colorError").style.display = "none";
        }
  }
}

/************************** EVENT LISTENERS ***********************************/
// Event listener: listens for radio button click on either button, and calls
// showContactField to display the coorelating fieldset of the selection.
// Another listener calls the getEstimate function when the user clicks
// the submit button on the custom estimate form, and calls the validateForm
// function when user clicks the submit button on the contact form.
function createEventListeners() {

  document.getElementById("contactSubmit").addEventListener("click", validateForm, false);
  document.getElementById("submitButton").addEventListener("click", validateEstForm, false);

  document.getElementById("email").addEventListener("click", showContactField, false);
  document.getElementById("phone").addEventListener("click", showContactField, false);

}

// When page has finished loading, calls function createEventListeners to listen
// for user events. If/else if is used to determine browser compatibility.
if(window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
}   else if(window.attatchEvent) {
      window.attatchEvent("onload", createEventListeners, false);
    }
