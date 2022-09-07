class Book {
  constructor(title, author, lidoEm) {
    this.title = title;
    this.author = author;
    this.lidoEm = lidoEm;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        lidoEm: '31/01/2020'
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        lidoEm: '14/06/2021'
      }
    ]

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));    
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.lidoEm}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');    
    div.classList.add("alert", className);
    div.append(document.createTextNode(message));

    const form = document.querySelector('#book-form');
    form.insertAdjacentElement('beforebegin', div);

    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#lido-em').value = '';
  }
}

// Event: Display Books
//document.addEventListener('DOMContentLoaded')
window.addEventListener('load', () => {
  UI.displayBooks();
})

// Event: Add a Book
const form = document.querySelector('#book-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const lidoEm = document.querySelector('#lido-em').value;
  const book = new Book(title, author, lidoEm);
  
  // Validate fields
  if (!title || !author || !lidoEm) {
    return UI.showAlert('Preencha todos os campos', 'alert-danger');
  } 

  UI.addBookToList(book);
  UI.showAlert('Livro adicionado com sucesso', 'alert-success');
  UI.clearFields();
})

// Event: Remove a Book
const table = document.querySelector('#book-list')

table.addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  UI.showAlert('Livro removido', 'alert-success');
})

