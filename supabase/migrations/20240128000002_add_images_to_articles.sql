-- Add images column to articles table to support multiple images
ALTER TABLE articles ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}';

-- Comment on column
COMMENT ON COLUMN articles.images IS 'Array of image URLs for the article gallery';
