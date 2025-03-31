-- Create a table for saved recipes
CREATE TABLE IF NOT EXISTS saved_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS saved_recipes_user_id_idx ON saved_recipes(user_id);
CREATE INDEX IF NOT EXISTS saved_recipes_created_at_idx ON saved_recipes(created_at); 