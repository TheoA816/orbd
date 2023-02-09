CREATE TABLE IF NOT EXISTS users ( 
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    best_time NUMERIC(2, 3),
    plays INTEGER,
    FOREIGN KEY (id) references users (id)
)