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
function addBookToLibrary() {
  // create a new book with the form values
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookNumPages.value,
    bookStatus.value
  );

  // add it to the library and display it in the "bookcase"
  library.push(newBook);
  displayBook(newBook);
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
  status.appendChild(createStatusButton(book.status));
  // add a delete button for the row
  deleteBook.appendChild(createDeleteButton());
}

function clearForm() {
  // clears the form
  bookTitle.value = "";
  bookAuthor.value = "";
  bookNumPages.value = "";
}

function createStatusButton(status) {
  // creates the button for the status of the book and sets the text content to be "read", "in progress", or "not read"
  let statusButton = document.createElement("button");
  statusButton.textContent = status;

  // add an event listener to change the status on click
  statusButton.addEventListener("click", (e) => {
    changeBookStatus(e.currentTarget);
  });

  // return the button
  return statusButton;
}

function changeBookStatus(statusButton) {
  // changes the status of the book
  // not read -> in progress -> read
  if (statusButton.textContent === "Read") {
    statusButton.textContent = "Not read";
  } else if (statusButton.textContent === "In progress") {
    statusButton.textContent = "Read";
  } else {
    statusButton.textContent = "In progress";
  }
}

function createDeleteButton() {
  // creates the delete button for the row
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // add an event listener to delete the row on click
  deleteButton.addEventListener("click", (e) => {
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
