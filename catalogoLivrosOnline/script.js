const books = [];

function displayBooks(booksToDisplay = books) {
    const booksDiv = document.getElementById("books");
    booksDiv.innerHTML = "";
    booksToDisplay.forEach((book, index) => {
        const bookItem = document.createElement("div");
        bookItem.innerHTML = `
            <strong>${book.titulo}</strong> - ${book.autor} (${book.ano}) - ${book.genero} - 
            Avaliação: ${book.avaliacao || 'Sem avaliação'}
            <button onclick="avaliarLivro(${index})">Avaliar</button>
        `;
        booksDiv.appendChild(bookItem);
    });
}

document.getElementById("book-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("genero").value;
    const ano = document.getElementById("ano").value;

    const novoLivro = { titulo, autor, genero, ano, avaliacao: null };
    books.push(novoLivro);
    displayBooks();
    salvarNoJson();
    e.target.reset();
});

function buscarLivro() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const resultados = books.filter(book =>
        book.titulo.toLowerCase().includes(searchTerm) ||
        book.autor.toLowerCase().includes(searchTerm) ||
        book.genero.toLowerCase().includes(searchTerm)
    );
    displayBooks(resultados);
}

function avaliarLivro(index) {
    const avaliacao = prompt("Dê uma avaliação de 1 a 5 para este livro:");
    if (avaliacao >= 1 && avaliacao <= 5) {
        books[index].avaliacao = avaliacao;
        displayBooks();
        salvarNoJson();
    } else {
        alert("Por favor, insira uma avaliação válida (1 a 5).");
    }
}

function salvarNoJson() {
    localStorage.setItem("booksCatalog", JSON.stringify(books));
}

function carregarDoJson() {
    const savedBooks = localStorage.getItem("booksCatalog");
    if (savedBooks) {
        books.push(...JSON.parse(savedBooks));
    }
    displayBooks();
}

window.onload = carregarDoJson;
