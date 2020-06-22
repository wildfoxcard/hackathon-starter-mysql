CREATE TABLE IF NOT EXISTS users (
    id char(36) NOT NULL PRIMARY KEY,
    email varchar(254) NOT NULL, 
    password text DEFAULT NULL,
    password_reset_token text DEFAULT NULL,
    password_reset_expires DATETIME  DEFAULT NULL,
    email_verification_token text DEFAULT NULL,
    email_verified boolean not null default 0,

    snapchat text DEFAULT NULL,
    facebook text DEFAULT NULL,
    twitter text DEFAULT NULL,
    google text DEFAULT NULL,
    github text DEFAULT NULL,
    instagram text DEFAULT NULL,
    linkedin text DEFAULT NULL,
    steam text DEFAULT NULL,
    twitch text DEFAULT NULL,
    quickbooks text DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);

CREATE TABLE IF NOT EXISTS user_tokens (
    id char(36) NOT NULL PRIMARY KEY,   
    user_id char(36) NOT NULL,
    CONSTRAINT fk_tokens_user_id
    FOREIGN KEY (user_id) 
        REFERENCES users(id),
    kind text NOT NULL,
    accessToken text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);

CREATE TABLE IF NOT EXISTS user_profile (
    id char(36) NOT NULL PRIMARY KEY,
    user_id char(36) NOT NULL,
    CONSTRAINT fk_profile_user_id
    FOREIGN KEY (user_id) 
        REFERENCES users(id),
    name text DEFAULT NULL,
    gender text DEFAULT NULL,
    location text DEFAULT NULL,
    website text DEFAULT NULL,
    picture text DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);