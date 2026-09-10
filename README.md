# Members Only

A server-rendered members-only message board built with TypeScript, Express, EJS, PostgreSQL, and Passport. Visitors can browse messages, registered users can authenticate and join the club, and administrators can remove messages.

## Features

- Sign up, log in, and log out with Passport local authentication
- Password hashing with Argon2
- PostgreSQL-backed users, messages, and sessions
- Member-only message posting
- Admin-only message deletion
- Server-side form validation with `express-validator` and `zod`
- Development watch mode and production TypeScript builds

## Requirements

- Node.js 22 or later
- PostgreSQL
- npm

## Setup

Install dependencies:

```sh
npm install
```

Create a `.env` file in the project root. All values below are required:

```env
PORT=3000
DB_URL=postgresql://username:password@localhost:5432/members_only
NODE_ENV=development
FALLBACK_HASH_GEN_STRING=replace-with-a-random-value
SESSION_SECRET=replace-with-a-random-value
ADMIN_PASSWORD=choose-an-admin-signup-password
MEMBER_PASSPHRASE=choose-a-member-passphrase
```

`DB_URL` must point to a PostgreSQL database that already exists. Initialize its tables and sample data with:

```sh
npx tsx seed/seed.ts "$DB_URL"
```

The seed script creates the `users` and `messages` tables and inserts sample users and messages. Run it only against an empty database; it is not idempotent.

## Run Locally

Start the development server:

```sh
npm run dev
```

Then open <http://localhost:3000> (or the port configured in `PORT`).

## Production Build

Compile the TypeScript source and copy the views and static assets into `dist`:

```sh
npm run build
npm start
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run the server with `tsx` watch mode |
| `npm run build` | Compile TypeScript and copy runtime assets |
| `npm start` | Run the compiled server |
| `npm run type-check` | Type-check without emitting files |
| `npm run lint` | Check the project with ESLint |
| `npm run format:check` | Check formatting with Prettier |
| `npm run format` | Format the project with Prettier |

## Routes

- `/` - View the message board
- `/auth/signup` - Create an account using the configured admin password
- `/auth/login` - Log in
- `/auth/logout` - Log out
- `/user/join` - Join the club using the configured member passphrase
- `/message/new` - Post a message as an authenticated member
- `/message/:messageId/delete` - Delete a message as an administrator

## License

This project is licensed under the ISC License. See [LICENSE](LICENSE).
