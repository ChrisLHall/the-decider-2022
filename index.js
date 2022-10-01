// Gonna put a png of how the site should work in this folder

// Entries will have:
// Title
// Chosen option
// The collection of all of the options
// Collection of previously chosen options
// - This is in case of e.g. having a date idea jar that you can use again later, but take out each chosen option
// Start day when this was decided
// Length of time that it lasts

// idk if I will keep old entries around or not, doesn't matter yet

let existingEntries = [];
// todo load from local storage


function createDecisionEntry(title, optionsList, startDate, endDate) {
  return {
    title: title,
    chosenOption: "",
    optionsList: [...optionsList], // shallow copy
    startDate: new Date(startDate.getTime()),
    endDate: new Date(endDate.getTime()),
  }
}

function addDecisionEntryToPage(entry) {

}

function onClickChooseForMe() {
  console.log("hi");
}
