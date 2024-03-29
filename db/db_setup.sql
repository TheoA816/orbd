DROP TABLE IF EXISTS stats;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users ( 
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    salt TEXT NOT NULL,
    refreshToken TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stats (
    id INT NOT NULL PRIMARY KEY,
    best_time NUMERIC(6, 0),
    plays INTEGER,
    FOREIGN KEY (id) references users (id)
)