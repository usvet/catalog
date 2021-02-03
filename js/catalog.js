"use strict"

class ProductCard {
  constructor(id, author, price, titleBook, fullDescription, imageSrc) {
    this.id = id;
    this.author = author;
    this.price = price;
    this.titleBook = titleBook;
    this.fullDescription = fullDescription;
    this.imageSrc = imageSrc;
  }

  render() {
    if (!this.elem) {
      this.elem = document.createElement("div");
      let catalog = document.querySelector(".catalog");
      catalog.append(this.elem);
    }

    this.elem.innerHTML = `
    <div class="card border-info" data-sql-id="${this.id}">
      <img src="${this.imageSrc}" class="width="20rem" height="430rem"" alt="${this.author}">
      <div class="card-body text-center ">
        <h5 class="card-title font-weight-bold">${this.author}</h5>
        <h5 class="card-text font-weight-bold ">${this.titleBook}</h5>
        <h6>${this.price} &#8381;</h6>
        
        <button class="btn btn-primary more-button btn-block">Подробнее</button>
        <div class="d-flex flex-wrap justify-content-around">
          <button class="btn btn-secondary change-button m-1">Изменить</button>
          <button class="btn btn-info delete-button m-1">Удалить</button>
        </div>
      </div>
    </div>
    `;

    this.elem.querySelector(".more-button").onclick = this.showMore.bind(this);
    this.elem.querySelector(".change-button").onclick = this.changeInfo.bind(this);
    this.elem.querySelector(".delete-button").onclick = this.deleteCard.bind(this);
  }

  showMore() {
    modalWindow.open();
    modalWindow.title = this.author;
    modalWindow.bodyHTML = `
      <div class="row">
        <div class="col" style="background: url(${this.imageSrc}) 50%/50%; background-size: cover;" ></div>
        <div class="col text-center">
          <h2>${this.author}</h2>
          <h2>${this.titleBook}</h2>
          <h3>${this.price} &#8381;</h3>
          <p class="text-justify">${this.fullDescription}</p>
        </div>
      </div>
    `;
    
  }

  changeInfo() {
    modalWindow.open();
    modalWindow.title = "Редактировать";
    modalWindow.bodyHTML = `
    <form action="addProduct_obr.php" method="POST" class="change-form">
      <input type="hidden" name="id" value="${this.id}">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
        <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Название товара" name="author" value="${this.author}">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Цена" name="price" value="${this.price}">
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">@</span>
        </div>
        <textarea rows="3" type="text" class="form-control" placeholder="Название книги" name="title_book">${this.titleBook}</textarea>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">@</span>
        </div>
        <textarea rows="10" type="text" class="form-control" placeholder="Краткое описание" name="full_description">${this.fullDescription}</textarea>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">@</span>
        </div>
        <input type="text" class="form-control" placeholder="Ссылка на картинку" name="image_src" value="${this.imageSrc}">
      </div>
      <p class="error-text text-danger d-none"></p>
      <input type="submit" value="Изменить товар" class="btn btn-primary btn-block">
    </form>
    `
    modalWindow.elem.querySelector(".change-form").onsubmit = (event) => {
      event.preventDefault();
      this.sendChanges(modalWindow.elem.querySelector(".change-form"));
    }
  }
  
  
 deleteCard() {
    if( confirm("Вы действительно хотите удалить товар? Это действие необратимо") ) {
        fetch(`deleteProduct_obr.php?id=${this.id}`)
          .then(response => response.text())
          .then(result => {
            if(result == "ok") {
              this.elem.remove();
              modalWindow.close();
            } else {
                alert("Не удалось удалить товар");
              }
          });
    }
 }

  updateChanges(data) {
    this.author = data.get("author");
    this.price = data.get("price");
    this.titleBook = data.get("title_book");
    this.fullDescription = data.get("full_description");
    this.imageSrc = data.get("image_src");
    this.render();
    modalWindow.close();
  }

  sendChanges(form) {
    let formData = new FormData(form);
    fetch("changeProduct_obr.php",{
      method: "POST",
      body: formData,
    })
      .then(response => response.text())
      .then(result => {
        if (result == "ok") {
          this.updateChanges(formData);
        } else {
          form.querySelector(".error-text").innerHTML = result;
        }
      });
  }
}

class ModalWindow {
  constructor() {
    this.elem = document.createElement("div");
    this.elem.className = "modal-container w-75";
    this.elem.innerHTML = `
      <div class="modal-background"></div>
      <div class="modal-window" tabindex="-1">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h2 class="modal-title"></h2>
              <button type="button" class="close close-times-button">
                &times;
              </button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close-button">Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    `;
    this.elem.hidden = true;
    document.body.prepend(this.elem);

    this.title = "";
    this.bodyHTML = "";

    let closeButtons = this.elem.querySelectorAll(".close-times-button, .close-button");
    for(let button of closeButtons) {
      button.onclick = this.close.bind(this);
    }
  }

  get title() {
    return this._title;
  }
  set title(newTitle) {
    this._title = newTitle;
    this.elem.querySelector(".modal-title").innerHTML = newTitle;
  }

  get bodyHTML() {
    return this._bodyHTML;
  }

  set bodyHTML(html) {
    this._bodyHTML = html;
    this.elem.querySelector(".modal-body").innerHTML = html;
  }

  open() {
    this.elem.hidden = false;
  }

  close() {
    this.elem.hidden = true;
  }
}

const modalWindow = new ModalWindow();

loadCatalog();

function loadCatalog() {
  fetch("getAllProducts.php")
    .then(response => response.json())
    .then(result => createCards(result))
    .catch(error => console.log(error.message))
}

function createCards(products) {
  for(let product of products) {
    let card = new ProductCard(product.id, product.author, product.price, product.title_book, product.full_description, product.image_src);
    card.render();
  }
}

 