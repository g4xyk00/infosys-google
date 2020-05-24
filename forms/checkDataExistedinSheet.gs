var sheetIDMemReg = "xxx"; 
var formIDEvtReg ="xxx";
var currSheet = SpreadsheetApp.openById(sheetIDMemReg).getSheetByName("Form Responses 1");
var currForm = FormApp.openById(formIDEvtReg);

function generateRegexFromSheet(array){
  var regex = "^(";
  regex += array.join("|");
  regex += ")";
  return regex;
}

function main() {
  //To retrieve records started at row 2, column 2 (column B, Mobile Phone)
  var registeredNum = currSheet.getRange(2,2,currSheet.getLastRow()-1,1).getValues().map(function(o){return o[0]});
  var regexNum = generateRegexFromSheet(registeredNum);
   
  var lblMobilePhone = currForm.getItemById(849034798).asTextItem();
  var txtValidation = FormApp.createTextValidation()
  .setHelpText('Mobile Phone Number is not registered!')
  .requireTextContainsPattern(regexNum)
  .build();
  lblMobilePhone.setValidation(txtValidation);
}
