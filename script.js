// UIs
let bookTitle = document.querySelector("#book-title");
let bookAuthor = document.querySelector("#book-author");
let bookNumPages = document.querySelector("#book-pages");
let bookStatus = document.querySelector("#book-status");
const submit = document.querySelector("#submit button");
const books = document.querySelector("#books");

// variables
let library = [];

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

function addBookToLibrary() {
  // TODO form currently submits even when required field isn't filled in - fix and get rid of the below if statement
  if (bookTitle.value === "") {
    return;
  }

  // create a new book with the form values
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    parseInt(bookNumPages.value, 10),
    bookStatus.value
  );

  // add it to the library and display it in the "bookcase"
  if (!checkDuplicates(newBook)) {
    library.push(newBook);
    displayBook(newBook);
  } else {
    return;
  }
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
  let bookIndex = library.findIndex(function (bookToCheck) {
    return (
      bookToCheck.title === book.title && bookToCheck.author === book.author
    );
  });

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
}

function createDeleteButton(book) {
  // finds the index of the book that was just deleted
  let bookIndex = library.findIndex(function (bookToCheck) {
    return (
      bookToCheck.title === book.title && bookToCheck.author === book.author
    );
  });

  // creates the delete button for the row
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // add an event listener to delete the row on click
  deleteButton.addEventListener("click", (e) => {
    // deletes the book from the library using the previously found index
    library.splice(bookIndex, 1);
    // deletes the book from the display
    books.deleteRow(e.currentTarget.parentElement.parentElement.rowIndex - 1);
  });

  // return the button
  return deleteButton;
}

// event listeners
submit.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  clearForm();
});
