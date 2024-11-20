export const ENV_TEMPLATE = `# Frontend variables
NEXT_PUBLIC_APP_DOMAIN=<%- app_domain %>
NEXT_PUBLIC_APP_NAME=<%- app_name %>
NEXT_PUBLIC_APP_SHORT_DOMAIN=<%- app_short_domain %>

# supabase access vars
NEXT_PUBLIC_SUPABASE_URL=<%- supabase_url %>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<%- supabase_anon_key %>

# Backend variables

# supabase access vars
SUPABASE_SERVICE_ROLE=<%- supabase_service_role %>
SUPABASE_JWT_SECRET=<%- supabase_jwt_secret %>

# database
DATABASE_URL=<%- database_url %>

# upstash
REDIS_URL=<%- redis_url %>
REDIS_TOKEN=<%- redis_token %>

# google auth
GOOGLE_CLIENT_ID=<%- google_client_id %>
GOOGLE_SECRET_KEY=<%- google_secret_key %>
`
