const btnAddAuthor = document.querySelector(".btn_add_author");
const inputNameAuthor = document.querySelector(".input_nameAuthor");
const inputBirthdayAuthor = document.querySelector(".input_birthdayAuthor");

const btnAddBook = document.querySelector(".btn_add_book");
const inputTitleBook = document.querySelector(".input_titleBook");
const inputIdGanre = document.querySelector(".input_idGanre");
const inputIdAuthor = document.querySelector(".input_idAuthor");
const inputQtyBooks = document.querySelector(".input_qtyBooks");

function fillTable(id) {
  fetch(`http://127.0.0.1:4000/get/${id}`)
    .then((val) => val.json())
    .then((val) => {
      const table = document.createElement("table");
      table.className = `table_${id}`;

      let table_header = document.createElement("thead");
      let tr = document.createElement("tr");

      let table_body = document.createElement("tbody");

      for (let key in val[0]) {
        const th = document.createElement("th");
        th.textContent = `${key}`;
        tr.append(th);
      }

      table_header.append(tr);
      table.append(table_header);

      val.forEach((el, index) => {
        let tr = document.createElement("tr");
        for (let key in el) {
          const th = document.createElement("th");
          th.textContent = el[key];
          tr.append(th);
        }
        table_body.append(tr);
      });

      table.append(table_body);

      document.body.append(table);

      console.log(val);
    });
}

function addAuthor(name_author, birthday_author) {
  fetch(`http://127.0.0.1:4000/post/author`, {
    method: "POST",
    body: JSON.stringify({
      name_author: name_author,
      birthday_author: birthday_author,
    }),
  })
    .then((data) => data)
      .then((data) => {
          console.log(data)
          fillTable("allAuthors")
      });
}

function addBook(title_book, id_ganre, id_author, qty_books) {
   
  fetch(`http://127.0.0.1:4000/post/book`, {
    method: "POST",
    body: JSON.stringify({
        title_book,
        id_ganre,
        id_author,
        qty_books
    }),
  })
    .then((data) => data)
      .then((data) => {
        fillTable("allBooks")
    });
}

btnAddAuthor.addEventListener("click", () => {
    document.querySelector(".table_allAuthors").remove();
    addAuthor(inputNameAuthor.value, inputBirthdayAuthor.value)    
});

btnAddBook.addEventListener("click", () => {
  document.querySelector(".table_allBooks").remove();
  addBook(inputTitleBook.value, inputIdGanre.value, inputIdAuthor.value, inputQtyBooks.value);
});

fillTable("allBooks");
