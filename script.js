// UIs
let bookTitle = document.querySelector("#book-title");
let bookAuthor = document.querySelector("#book-author");
let bookNumPages = document.querySelector("#book-pages");
let bookStatus = document.querySelector("#book-status");
let form = document.querySelector("#add-book-form");
const books = document.querySelector("#books");

// variables
let library = getLibraryFromLocalStorage();

// book constructor
function Book(title, author, numPages, status) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.status = status;
}

// library functionality
function checkDuplicates(book) {
  // checks every book in the library to see if one already exists with the same title, author, and number of pages
  // if one exists, return true to indicate that a duplicate exists
  for (let bookInLibrary of library) {
    if (
      book.title === bookInLibrary.title &&
      book.author === bookInLibrary.author &&
      book.numPages === bookInLibrary.numPages
    ) {
      return true;
    }
  }
  return false;
}

function findBookIndex(book) {
  // finds the index of a given book in the library
  let bookIndex = library.findIndex(function (bookToCheck) {
    return (
      bookToCheck.title === book.title &&
      bookToCheck.author === book.author &&
      bookToCheck.numPages === book.numPages
    );
  });

  return bookIndex;
}

function formatPageNumber(number) {
  // if the number of pages wasn't entered, return nothing
  if (number === "") {
    return "";
  }

  // else return the number without any leading zeros
  return parseInt(number, 10);
}

function addBookToLibrary() {
  // create a new book with the form values
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    formatPageNumber(bookNumPages.value),
    bookStatus.value
  );

  // if there are no duplicates, add it to the library and display it in the "bookcase"
  // otherwise, display an alert notifying the user of the duplicate
  if (!checkDuplicates(newBook)) {
    library.push(newBook);
    displayBook(newBook);
  } else {
    alert("This book is already in your library.");
  }

  // update the library in the local storage
  addToLocalStorage();
}

function displayBook(book) {
  // create a new row
  let row = books.insertRow(-1);

  // create cells in the row
  let title = row.insertCell(0);
  let author = row.insertCell(1);
  let numPages = row.insertCell(2);
  let status = row.insertCell(3);
  let deleteBook = row.insertCell(4);

  // change the content of the cells to correspond with the newly added book
  title.textContent = book.title;
  author.textContent = book.author;
  numPages.textContent = book.numPages;
  // for the status, create a button that can be changed when clicked
  status.appendChild(createStatusButton(book));
  // add a delete button for the row
  deleteBook.appendChild(createDeleteButton(book));
}

function clearForm() {
  // clears the form
  bookTitle.value = "";
  bookAuthor.value = "";
  bookNumPages.value = "";
}

function createStatusButton(book) {
  // creates the button for the status of the book and sets the text content to be "read", "in progress", or "not read"
  let statusButton = document.createElement("button");
  statusButton.textContent = book.status;

  // add an event listener to change the status on click
  statusButton.addEventListener("click", (e) => {
    changeBookStatus(e.currentTarget, book);
  });

  // return the button
  return statusButton;
}

function changeBookStatus(statusButton, book) {
  // finds the index of the book whose status just changed
  let bookIndex = findBookIndex(book);

  // changes the status of the book on the display and in the library array
  // not read -> in progress -> read
  if (statusButton.textContent === "Read") {
    statusButton.textContent = "Not read";
    library[bookIndex].status = "Not read";
  } else if (statusButton.textContent === "In progress") {
    statusButton.textContent = "Read";
    library[bookIndex].status = "Read";
  } else {
    statusButton.textContent = "In progress";
    library[bookIndex].status = "In progress";
  }

  // update the library in the local storage
  addToLocalStorage();
}

function createDeleteButton(book) {
  // finds the index of the book that was just deleted
  let bookIndex = findBookIndex(book);

  // creates the delete button for the row
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // add an event listener to delete the row on click
  deleteButton.addEventListener("click", (e) => {
    // deletes the book from the library using the previously found index and updates the local storage library
    library.splice(bookIndex, 1);
    addToLocalStorage();
    // deletes the book from the display
    books.deleteRow(e.currentTarget.parentElement.parentElement.rowIndex - 1);
  });

  // return the button
  return deleteButton;
}

function addToLocalStorage() {
  // add the current library to local storage
  localStorage.setItem("library", JSON.stringify(library));
}

function getLibraryFromLocalStorage() {
  // return the existing library in local storage, if it exists
  // otherwise, return an empty list to signify an empty library
  if (localStorage.getItem("library")) {
    return JSON.parse(localStorage.getItem("library"));
  } else {
    return [];
  }
}

function displayBooksFromLocalStorage() {
  // displays all the books from local storage whenever the page gets refreshed
  for (book of library) {
    displayBook(book);
  }
}

// event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
  clearForm();
});

displayBooksFromLocalStorage();
