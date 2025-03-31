-- Create generated_recipes table
CREATE TABLE IF NOT EXISTS generated_recipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipes JSONB NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster user queries
CREATE INDEX IF NOT EXISTS generated_recipes_user_id_idx ON generated_recipes(user_id);

-- Create index for faster timestamp queries
CREATE INDEX IF NOT EXISTS generated_recipes_generated_at_idx ON generated_recipes(generated_at); 