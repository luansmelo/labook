-- Active: 1685979559959@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	('u001', 'Fulano', 'fulano@email.com', 'fulano123', 'NORMAL'),
	('u002', 'Beltrana', 'beltrana@email.com', 'beltrana00', 'NORMAL'),
	('u003', 'Astrodev', 'astrodev@email.com', 'astrodev99', 'ADMIN');

DROP TABLE users;

CREATE TABLE posts (
    id text unique not null,
    creator_id text not null,
    content text not null,
    likes integer not null,
    dislikes integer not null,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    update_at TEXT DEFAULT (DATETIME()) NOT NULL,
    foreign key (creator_id) references users(id)
);


INSERT INTO posts (id, creator_id, content, likes, dislikes)
VALUES
	('p001', 'u002', 'eai', 0, 0),
	('p002', 'u001', 'eai123', 0, 0);

DROP TABLE posts;

CREATE TABLE likes_dislikes(
    user_id text not null,
    post_id text not null,
    like INTEGER not null,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
	('u001', 'p001', 1);

DROP TABLE likes_dislikes;

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM likes_dislikes;