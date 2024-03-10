-- Migration SQL for creating the 'chats' table in Supabase

CREATE TABLE chats (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
    userId TEXT NOT NULL,
    path TEXT NOT NULL,
    messages JSONB NOT NULL,
    sharePath TEXT
);