// UIs
let bookTitle = document.querySelector("#book-title");
let bookAuthor = document.querySelector("#book-author");
let bookNumPages = document.querySelector("#book-pages");
let bookStatus = document.querySelector("#book-status");
const submit = document.querySelector("#submit button");
const books = document.querySelector("#books");

// variables
let library = [
  { title: "Nudge", author: "Richard Thaler", numPages: 100, status: "Read" },
];

// book constructor

function Book(title, author, numPages, status) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.status = status;
}

// library functionality
function addBookToLibrary() {
  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookNumPages.value,
    bookStatus.value
  );

  library.push(newBook);
  displayBook(newBook);
}

function displayBook(book) {
  let row = books.insertRow(-1);
  let title = row.insertCell(0);
  let author = row.insertCell(1);
  let numPages = row.insertCell(2);
  let status = row.insertCell(3);

  title.textContent = book.title;
  author.textContent = book.author;
  numPages.textContent = book.numPages;
  status.textContent = book.status;
}

function clearForm() {
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
