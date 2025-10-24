-- Add Facebook API credentials to workspaces table
ALTER TABLE workspaces
ADD COLUMN facebook_access_token TEXT,
ADD COLUMN facebook_user_id TEXT,
ADD COLUMN facebook_page_id TEXT,
ADD COLUMN token_expires_at TIMESTAMP WITH TIME ZONE;

-- Add comment for clarity
COMMENT ON COLUMN workspaces.facebook_access_token IS 'Encrypted Facebook user access token';
COMMENT ON COLUMN workspaces.facebook_user_id IS 'Facebook user ID for this workspace';
COMMENT ON COLUMN workspaces.facebook_page_id IS 'Optional Facebook page ID if managing a page';
COMMENT ON COLUMN workspaces.token_expires_at IS 'When the access token expires';