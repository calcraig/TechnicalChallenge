//checks that the name input is a valid string
function nameValidation(textIn)
{
  let nameCheck = false;
  //check only for letters a-z, A-Z, that there IS an input, and that the string isn't only spaces.
  if(/^[A-Za-z -]*$/.test(textIn) && textIn != "" && /[^ ]/.test(textIn))
  {
    nameCheck = true;
  }
  else
  {
    nameCheck = false;
  }
  return nameCheck;
}

//checks the name when any input is typed into the name input box and changes the b/g colour and adds a tick/cross symbol
function nameInputCheck(name)
{
  if(nameValidation(name))
  {
    document.getElementById("nameInput").style.backgroundColor="var(--green)";
    document.getElementById("nameCheckIcon").innerHTML="";
    document.getElementById("nameCheckIcon").innerHTML="✔️";
  }
  else
  {
    document.getElementById("nameInput").style.backgroundColor="var(--pink)";
    document.getElementById("nameCheckIcon").innerHTML="";
    document.getElementById("nameCheckIcon").innerHTML="❌";
  }
}

//clears the name input box background colour after leaving the form.
function resetName()
{
  document.getElementById("nameInput").style.backgroundColor="white";
  document.getElementById("nameCheckIcon").innerHTML="";
}

//checks that the email input is in valid email format
function emailValidation(textIn)
{
    let rawInput = textIn;
  let domain = "";
  let prefix = "";

  //checks for the presence of an @ character
  if(rawInput.indexOf("@")!=-1)
  {
    prefix = rawInput.slice(0,rawInput.indexOf("@"));
    domain = rawInput.slice(rawInput.indexOf("@")+1,rawInput.length);
  }
  else
  {
    return false;
  }
  
  //checks the prefix doesn't contain any doubled punctuation  
  if(/[-._]+[-._]/.test(prefix))
  {
    return false;
  }

  //checks the domain doesn't contain any invalid characters
  if(/[^A-Za-z0-9.-]/.test(domain))
  {
    return false;
  }

  //checks that there's a "." in the domain
  if(domain.indexOf(".")==-1)
  {
    return false;
  }

  let topLevelDomain = domain.slice(domain.indexOf(".")+1,domain.length);

  //checks that the top level domain is 2 characters or longer
  if(topLevelDomain.length<2)
  {
    return false;
  }
  return true;
}

//checks the email when any input is typed into the email input box and changes the b/g colour and adds a tick/cross symbol
function emailInputCheck(email)
{
  if(emailValidation(email))
  {
    document.getElementById("emailInput").style.backgroundColor="var(--green)";
    document.getElementById("emailCheckIcon").innerHTML="";
    document.getElementById("emailCheckIcon").innerHTML="✔️";
  }
  else
  {
    document.getElementById("emailInput").style.backgroundColor="var(--pink)";
    document.getElementById("emailCheckIcon").innerHTML="";
    document.getElementById("emailCheckIcon").innerHTML="❌";
  }
}

//clears the email input box background colour after leaving the form.
function resetEmail()
{
  document.getElementById("emailInput").style.backgroundColor="white";
  document.getElementById("emailCheckIcon").innerHTML="";
}

//checks that the card input is valid
function cardValidation(textIn)
{
  let cardCheck = false;
  let rawInput = textIn;

  if(isNaN(rawInput)!=true && rawInput!="")
  {
    cardCheck = luhnCheck(rawInput);
  }
  else
  {
    cardCheck = false;    
  }
  return cardCheck;
}

//checks the card number when any input is typed into the card input box and changes the b/g colour and adds a tick/cross symbol
function cardInputCheck(card)
{
  if(cardValidation(card))
  {
    document.getElementById("paymentCard").style.backgroundColor="var(--green)";
    document.getElementById("cardCheckIcon").innerHTML="";
    document.getElementById("cardCheckIcon").innerHTML="✔️";
  }
  else
  {
    document.getElementById("paymentCard").style.backgroundColor="var(--pink)";
    document.getElementById("cardCheckIcon").innerHTML="";
    document.getElementById("cardCheckIcon").innerHTML="❌";
  }
}

//clears the card input box background colour after leaving the form.
function resetCard()
{
  document.getElementById("paymentCard").style.backgroundColor="white";
  document.getElementById("cardCheckIcon").innerHTML="";
}

//checks the card number against the Luhn algorithm
function luhnCheck(textIn)
{
  let cardCheck = false;
  let rawInput = textIn;
  let checkDigit = parseInt(rawInput.slice(rawInput.length-1,rawInput.length));
  let accountID = rawInput.slice(0,rawInput.length-1);
  let luhnString = 0;
  let luhnSum = 0;
  let count = 1;

  for (var i = accountID.length; i > 0; i--)
  {
    if((count%2)!=0)
     {
       luhnString+=accountID[i-1]*2;
       count++;
     }
    else
     {
       luhnString+=accountID[i-1];
       count++;
     }
  }

  for (var i = 0; i <= luhnString.length-1; i++)
  {
   luhnSum += parseInt(luhnString[i]);
  }

  let checkSum = 10-(parseInt(luhnSum)%10);
  if(checkSum == 10)
  {
    checkSum = 0;
  }

  if(checkSum == checkDigit)
  {
    cardCheck = true;
  }
  else
  {
    cardCheck = false;
  }
  return cardCheck;
}

//collates all the input validations and calls the email function
function checkInputs(name,email,card)
{
  let nameCheck = nameValidation(name);
  let emailCheck = emailValidation(email);
  let cardCheck = cardValidation(card);

  if(nameCheck&&emailCheck&&cardCheck)
  {
    let emailBody = "Name: "+name+"<br/>"+"Email: "+email+"<br/>"+"Card: "+card;
    emailSendValues(emailBody);
  }
  else
  {
    alert("One or more of your inputs was invalid, please check and try again.");
  }
}

//calls the email API
function emailSendValues(emailBody)
{
  Email.send({
      SecureToken : "e2f84663-26a6-46d3-87c6-a32b820c83b6",
      To : "test@dn-uk.com",
      From : "cal.craig97@gmail.com",
      Subject : "Callum Craig—Technical Challenge",
      Body : emailBody
  }).then(
    message => alert("Email sent!")
  );
}