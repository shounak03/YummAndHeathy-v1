-- Add embedding column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS embedding vector(384);

-- Create an index for faster similarity searches
CREATE INDEX IF NOT EXISTS profiles_embedding_idx ON profiles USING ivfflat (embedding vector_cosine_ops); 