# Poxs

Showcasing your 3d models with lighting settings equilavent to setting up a lighting box or display box

## Installation

- Use package manager to install dependencies

```bash
pnpm install
```

or

```bash
yarn install
```

or

```bash
npm install
```

- Create Hanko Account

  - [Hanko homepage](https://www.hanko.io/)

- Follow steps from the documentation to create Project

  - [Hanko docs](https://docs.hanko.io/setup-hanko-cloud)

- Create supabase account and project

  - [Supabase homepage](https://supabase.com/)

- Retrieve Supabase secrets including

  - Supabase url
  - Supabase api key
  - Subapase jwt

- Setup database relations

  - ![relations table](https://fspmetepgxthrrapcawe.supabase.co/storage/v1/object/public/thumbnail/Screen%20Shot%202023-10-27%20at%2011.12.28.png)

- Configure env (.env)

```
PUBLIC_HANKO_API_URL=[your-hanko-api-url]
PUBLIC_SUPABASE_URL=[your-supabase-url]
PUBLIC_SUPABASE_API_KEY=[your-supabase-api-key]
PUBLIC_SUPABASE_JWT=[your-supabase-jwt]
```

- Start project

```
pnpm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
