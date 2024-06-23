--changeset lucyr:2
INSERT INTO messages (text, created_at, chat_id, from_bot)
VALUES ('This is a message from the user 1', '05-06-2023 14:46:01', 1, false),
('This is a message from bot to the user 1', '05-06-2023 14:47:01', 1, true),
('This is a message from the user 2', '05-06-2023 14:48:01', 2, false),
('This is a message from bot to the user 2', '05-06-2023 14:49:01', 2, true),
('This is a message from the user 2', '05-06-2023 14:50:01', 2, false),
('This is a message from bot to the user 2', '05-06-2023 14:51:01', 2, true);