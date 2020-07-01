-- User

CREATE TABLE IF NOT EXISTS users (
    id char(36) NOT NULL PRIMARY KEY,
    email varchar(254) NOT NULL, 
    password text DEFAULT NULL,
    password_reset_token text DEFAULT NULL,
    password_reset_expires DATETIME  DEFAULT NULL,
    email_verification_token text DEFAULT NULL,
    email_verified boolean not null default 0,
    is_admin boolean not null default 0,

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


CREATE TABLE IF NOT EXISTS user_notifications (
    id char(36) NOT NULL PRIMARY KEY,   
    user_id char(36) NOT NULL,
    CONSTRAINT fk_notifications_user_id
    FOREIGN KEY (user_id) 
        REFERENCES users(id),
    is_read boolean not null default 0,
    url text NOT NULL,
    message text NOT NULL,
    type text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);

CREATE TABLE IF NOT EXISTS user_notifications_meta (
    id char(36) NOT NULL PRIMARY KEY,
    user_id char(36) NOT NULL,
    CONSTRAINT fk_notifications_meta_user_id
    FOREIGN KEY (user_id)
        REFERENCES users(id),
    number_since_viewed int not null default 0
);


-- CLIENT

CREATE TABLE IF NOT EXISTS clients (
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

CREATE TABLE IF NOT EXISTS client_tokens (
    id char(36) NOT NULL PRIMARY KEY,   
    client_id char(36) NOT NULL,
    CONSTRAINT fk_tokens_client_id
    FOREIGN KEY (client_id) 
        REFERENCES clients(id),
    kind text NOT NULL,
    accessToken text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);

CREATE TABLE IF NOT EXISTS client_profile (
    id char(36) NOT NULL PRIMARY KEY,
    client_id char(36) NOT NULL,
    CONSTRAINT fk_profile_client_id
    FOREIGN KEY (client_id) 
        REFERENCES clients(id),
    name text DEFAULT NULL,
    gender text DEFAULT NULL,
    location text DEFAULT NULL,
    website text DEFAULT NULL,
    picture text DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);


CREATE TABLE IF NOT EXISTS client_notifications (
    id char(36) NOT NULL PRIMARY KEY,   
    client_id char(36) NOT NULL,
    CONSTRAINT fk_notifications_client_id
    FOREIGN KEY (client_id) 
        REFERENCES clients(id),
    is_read boolean not null default 0,
    url text NOT NULL,
    message text NOT NULL,
    type text NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted boolean not null default 0
);

CREATE TABLE IF NOT EXISTS client_notifications_meta (
    id char(36) NOT NULL PRIMARY KEY,
    client_id char(36) NOT NULL,
    CONSTRAINT fk_notifications_meta_client_id
    FOREIGN KEY (client_id)
        REFERENCES clients(id),
    number_since_viewed int not null default 0
);



CREATE TABLE IF NOT EXISTS server_errors (
    id char(36) NOT NULL PRIMARY KEY,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    error text not null
);
