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

  // change the content of the cells to correspond with the newly added book
  title.textContent = book.title;
  author.textContent = book.author;
  numPages.textContent = book.numPages;
  status.textContent = book.status;
}

function clearForm() {
  // clears the form
  bookTitle.value = "";
  bookAuthor.value = "";
  bookNumPages.value = "";
}

// event listeners
submit.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary();
  clearForm();
});
