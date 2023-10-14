USE s3942976_fwp_a2;

CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255)
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    account_id INT,
    movie_id INT,
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

CREATE TABLE showtimes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT,
    cinema_location VARCHAR(255) NOT NULL,
    showing_time DATETIME NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);
