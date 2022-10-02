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

function chooseOptionForEntry(entry) {
  entry.chosenOption = entry.optionsList[Math.floor(Math.random() * entry.optionsList.length)];
}

function addDecisionEntryToPage(entry) {
  var entryDiv = document.createElement("div");
  entryDiv.className = "decisionEntry";
  var newNode = document.createElement("p");
  newNode.innerText = entry.title;
  entryDiv.appendChild(newNode);

  newNode = document.createElement("p")
  newNode.className = "chosenItemText";
  newNode.innerText = entry.chosenOption;
  entryDiv.appendChild(newNode);

  newNode = document.createElement("p");
  newNode.className = "endDateText";
  newNode.innerText = "Until " + entry.endDate.toString();
  entryDiv.appendChild(newNode);

  newNode = document.createElement("button");
  newNode.innerText = "Delete";
  // todo connect this to the entry somehow
  newNode.onclick = function () {
    document.getElementById("existingEntries").removeChild(entryDiv);
  }
  entryDiv.appendChild(newNode);

  document.getElementById("existingEntries").appendChild(entryDiv);
}

function onClickChooseForMe() {
  console.log("hi");
  console.log(document.getElementById("titleInput").value);
  console.log(document.getElementById("optionsInput").value);
  var radioSelected = document.querySelector('input[name="howLongInput"]:checked');
  if (radioSelected) {
    console.log(radioSelected.value);
  }
  console.log(document.getElementById("untilInput").value);

  var tempEndDate = new Date();
  tempEndDate.setDate(tempEndDate.getDate() + 7);
  let entry = createDecisionEntry("Pick a movie", ["titanic", "smile", "jumanji"], new Date(), tempEndDate);
  console.log(entry);
  chooseOptionForEntry(entry);
  addDecisionEntryToPage(entry);
}
