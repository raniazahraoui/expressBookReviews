const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js"); // base de données de livres
const public_users = express.Router();

// Simuler un appel asynchrone pour obtenir tous les livres
const getAllBooks = async () => {
    return new Promise((resolve, reject) => {
        if (books) {
            resolve(books);
        } else {
            reject("No books available");
        }
    });
};

// Simuler un appel asynchrone pour obtenir un livre par ISBN
const getBookByISBN = async (isbn) => {
    return new Promise((resolve, reject) => {
        let book = books[isbn];
        if (book) {
            resolve(book);
        } else {
            reject("Book not found for ISBN: " + isbn);
        }
    });
};

// Simuler un appel asynchrone pour obtenir un livre par auteur
const getBooksByAuthor = async (author) => {
    return new Promise((resolve, reject) => {
        let filteredBooks = Object.values(books).filter(book => book.author === author);
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject("No books found by author: " + author);
        }
    });
};

// Simuler un appel asynchrone pour obtenir un livre par titre
const getBooksByTitle = async (title) => {
    return new Promise((resolve, reject) => {
        let filteredBooks = Object.values(books).filter(book => book.title === title);
        if (filteredBooks.length > 0) {
            resolve(filteredBooks);
        } else {
            reject("No books found with title: " + title);
        }
    });
};

// Tâche 10: liste de tous les livres
public_users.get('/', async (req, res) => {
    try {
        const allBooks = await getAllBooks();
        res.status(200).json(allBooks);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Tâche 11: détails du livre par ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await getBookByISBN(isbn);
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// Tâche 12: détails des livres par auteur
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const booksByAuthor = await getBooksByAuthor(author);
        res.status(200).json(booksByAuthor);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

// Tâche 13: détails des livres par titre
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const booksByTitle = await getBooksByTitle(title);
        res.status(200).json(booksByTitle);
    } catch (error) {
        res.status(404).json({ message: error });
    }
});

module.exports.general = public_users;
