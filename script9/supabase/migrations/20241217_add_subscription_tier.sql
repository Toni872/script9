-- Add subscription_tier column to users table if it doesn't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS subscription_tier text DEFAULT 'free';

-- Update existing users to 'free' if null
UPDATE public.users 
SET subscription_tier = 'free' 
WHERE subscription_tier IS NULL;

-- Create an index for faster querying by tier
CREATE INDEX IF NOT EXISTS users_subscription_tier_idx ON public.users (subscription_tier);

-- Comment on column
COMMENT ON COLUMN public.users.subscription_tier IS 'Tier of user subscription: free, starter, pro, enterprise';
