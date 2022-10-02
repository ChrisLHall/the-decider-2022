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

const LOCAL_STORAGE_KEY = "entries";
const LOCAL_STORAGE_ARCHIVE_KEY = "entriesArchive";
let existingEntries = [];
let archivedEntries = [];

function createDecisionEntry(title, optionsList, startDate, endDate) {
  return {
    title: title,
    chosenOption: "",
    optionsList: [...optionsList], // shallow copy
    previouslyChosen: [],
    startDate: startDate.getTime(),
    endDate: endDate.getTime(),
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
  if (Date.now() < entry.endDate) {
    newNode.className = "endDateText";
    newNode.innerText = "Until " + new Date(entry.endDate).toString();
  } else {
    newNode.className = "finishedText";
    newNode.innerText = "Finished!";
  }
  entryDiv.appendChild(newNode);

  newNode = document.createElement("button");
  newNode.innerText = "Archive";
  // todo connect this to the entry somehow
  newNode.onclick = function () {
    removeEntry(entry);
  }
  entryDiv.appendChild(newNode);

  document.getElementById("existingEntries").appendChild(entryDiv);
}

function syncExistingEntries() {
  document.getElementById("existingEntries").innerText = "";
  existingEntries.forEach(element => {
    addDecisionEntryToPage(element);
  });
}

function removeEntry(entry) {
  var index = existingEntries.indexOf(entry);
  if (index >= 0) {
    existingEntries.splice(index, 1);
  }
  archivedEntries.push(entry);
  saveToLocalStorage();
  syncExistingEntries();
}

function saveToLocalStorage() {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingEntries));
  window.localStorage.setItem(LOCAL_STORAGE_ARCHIVE_KEY, JSON.stringify(archivedEntries));
}

function onClickChooseForMe() {
  //let entry = createDecisionEntry("Pick a movie", ["titanic", "smile", "jumanji"], new Date(), tempEndDate);

  var titleInput = document.getElementById("titleInput").value;
  if (titleInput.length === 0) { return; }
  var optionsInput = document.getElementById("optionsInput").value;
  var optionsArray = optionsInput.split("\n");
  for (let index = 0; index < optionsArray.length; index++) {
    optionsArray[index] = optionsArray[index].trim();
    if (optionsArray[index].length == 0) {
      optionsArray.splice(index, 1);
      index--;
    }
  }
  if (optionsArray.length === 0) { return; }

  var radioSelected = document.querySelector('input[name="howLongInput"]:checked');
  if (!radioSelected) {
    // TODO error messages
    return;
  }
  var howLongInput = radioSelected.value;
  var endDate = new Date();
  if (howLongInput === "today") {
    endDate.setDate(endDate.getDate() + 1);
  } else if (howLongInput === "thisWeek") {
    endDate.setDate(endDate.getDate() + 7);
  } else {
    // until
    endDate.setDate(endDate.getDate() + parseInt(document.getElementById("daysInput").value));
  }

  let entry = createDecisionEntry(document.getElementById("titleInput").value, optionsArray, new Date(), endDate);
  console.log(entry);
  chooseOptionForEntry(entry);

  existingEntries.push(entry);
  saveToLocalStorage();
  //addDecisionEntryToPage(entry);
  syncExistingEntries();

  clearInputs();
}


function clearInputs() {
  document.getElementById("titleInput").value = "";
  document.getElementById("optionsInput").value = "";
  document.getElementById("daysInput").value = "";

  var radio = document.querySelectorAll('input[name="howLongInput"]');
  radio.forEach(element => {
    element.checked = false;
  });
  document.getElementById("todayRadio").checked = true;
  console.log(radio);
}




// todo load from local storage
// TODO the dates need to save in int form
// TODO delete button needs to actually delete the thing from the array
const loaded = window.localStorage.getItem(LOCAL_STORAGE_KEY);
const loadedArchive = window.localStorage.getItem(LOCAL_STORAGE_ARCHIVE_KEY);

console.log("loaded:");
console.log(loaded);

console.log("archive:");
console.log(loadedArchive);

if (loaded) {
  existingEntries = JSON.parse(loaded);
  syncExistingEntries();
}

if (loadedArchive) {
  archivedEntries = JSON.parse(loadedArchive);
}


