var globalAnswer = "0" //declaring global variable here... this is bad practice
function removeLeadingZero(string) {
  var newString = string
  if (newString[0] === '0') {
    console.log('removeLeadingZero-1: remove leading 0 from newString')
    newString = newString.slice(1)
  }
  return newString
}
function removeLeadingSymbol(string) {
  var newString = string
  var symbols = ["*", "/", "+", "-"]
  if (symbols.includes(newString[0])) {
    console.log('removeLeadingSymbol-1: remove leading symbol from newString')
    newString = newString.slice(1)
  }
  return newString
}
function storeAnswer(value) {
  console.log('storeAnswer-1: storeAnswer is:::', value)
  var value = removeLeadingZero(value)
  globalAnswer = value //bad practice -- setting globalAnswer here
  console.log('storeAnswer-2: globalAnswer is:::', globalAnswer)
  $("#globalAnswer").html(globalAnswer) //set globalAnswer on calculator
  console.log('storeAnswer-3: set globalAnswer on calculator')
  return value //should be a STRING
}
function getCurrentValue() {
  var currentValue = document.getElementById("currentValue").innerHTML
  console.log('getCurrentValue-- currentValue is a string: ', currentValue)
  return currentValue //currentValue will be a STRING
}
function clearCurrentValue() {
  console.log('CLEAR-1: calling clearCurrentValue... currentValue === 0')
  $("#currentValue").html("0") //set currentValue to "0"
  console.log('CLEAR-2: call storeAnswer with "0", to reset globalAnswer')
  return storeAnswer("0") //set globalAnswer to "0", a STRING
}
function equals() {
  var answer = globalAnswer //bad practice!!! fix this.
  console.log('EQUALS-1: answer is:::', answer) //a STRING
  var removeEqualSign = answer.split("=") //remove "=" from end...
  var newAnswer = removeEqualSign[0] // //removing "=" from end...
  newAnswer = replaceTimesAndDivides(newAnswer)
  console.log('EQUALS-2: newAnswer is:::', newAnswer) //a STRING
  var finalAnswer = eval(newAnswer) //pass answer to eval, turning it into a number
  finalAnswer = finalAnswer.toString() //make a string again
  storeAndReset(finalAnswer, finalAnswer)
  console.log('EQUALS-3: finalAnswer is:::', finalAnswer)
  return finalAnswer //returning finalAnswer, a STRING
}
function clickButton(event) {
  $(".btn").click(function(event) {
    var thingClicked = this.innerHTML
    console.log("0. you clicked: ", thingClicked)
    
    if ($(this).hasClass("orange")) {
      console.log(`clickButton-1. ${thingClicked} is in the orange class!`)
      return addSymbolToAnswer(thingClicked)
    }
if ($(this).hasClass("num")) {
      console.log(`clickButton-2. ${thingClicked} is in the num class!`)
      return createNewNumber(thingClicked)
    }
if ($(this).hasClass("clear")) {
      console.log('clickButton-3. clearCurrentValue called!')
      return clearCurrentValue()
    }
if ($(this).hasClass("equals")) {
      console.log('clickButton-4. equals pressed!')
      addSymbolToAnswer(thingClicked) //thingClicked is "="
      return equals()
    }
  })
}
clickButton(event)
function replaceTimesAndDivides(string) {
  string = string.replace("x", "*")
  string = string.replace("÷", "/")
  return string
}
function addSymbolToAnswer(string) {
  var symbolString = string
  symbolString = replaceTimesAndDivides(symbolString)
  console.log('ORANGE-1. symbolString is: ', symbolString)
  var currentValue = getCurrentValue()
  var symbols = ["*", "/", "+", "-"]
  console.log('ORANGE-2. globalAnswer is now: ', globalAnswer)
if (globalAnswer === currentValue) { //after "=" was pressed...
    console.log('ORANGE-3a. after "=" pressed, just need one symbol added to currentValue')
    var newGlobalAnswer = currentValue + symbolString //add symbol to end of newGlobal
    return storeAndReset(newGlobalAnswer, symbolString)
  }
  if (symbols.includes(currentValue)) { //if a symbol was already pressed...
    console.log('Orange-3b: currentValue and symbolString are both symbols!')
    currentValue = currentValue.replace(currentValue, symbolString)
    console.log('Orange-3b: replaced currentValue with ', symbolString)
    var newGlobalAnswer = globalAnswer.slice(0, -1) + currentValue
    console.log('Orange-4b: replaced lastChar in newGlobalAnswer with', currentValue)
    return storeAndReset(newGlobalAnswer, symbolString)
  } else { //otherwise, adding new symbol to currentValue...
    console.log('ORANGE-3c: adding new symbol to currentValue')
    currentValue = currentValue + symbolString //add symbol to end of currentValue...
    console.log('ORANGE-3c. new currentValue is: ', currentValue)
    var newGlobalAnswer = globalAnswer + currentValue
    return storeAndReset(newGlobalAnswer, symbolString)
  }
}
function storeAndReset(newGlobalAnswer, newCurrentValue) {
  storeAnswer(newGlobalAnswer)
  $("#currentValue").html(newCurrentValue)
  console.log('storeAndReset: replaced currentValue with symbol: ', newCurrentValue)
  return newCurrentValue
}
function createNewNumber(string) {
  var thingClicked = string
  var currentValue = getCurrentValue()
  var newString = currentValue + thingClicked //add into newString
  newString = removeLeadingZero(newString)
  newString = removeLeadingSymbol(newString)
  console.log('createNewNumber-1: newString is: ', newString)
  $("#currentValue").html(newString)
  return newString
}
function makeCurrentValueNegative() {
    var currentValue = document.getElementById("currentValue").innerHTML
     console.log('currentValue in makeInputNegative is: ', currentValue)
     if(currentValue[0] === "-") {
      currentValue = currentValue.slice(1)
      $("#currentValue").html(currentValue)
     } else {
      $("#currentValue").prepend("-")
     }
     return currentValue
   }