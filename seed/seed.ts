import { Pool } from "pg";
import * as argon2 from "argon2";

if (process.argv.length <= 2) {
  console.log("Provide a db url");
  process.exit(0);
}
const dbConnectionString = process.argv[2];

const pool = new Pool({ connectionString: dbConnectionString });

const users = [
  {
    emailAddress: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    password: "hashedPassword123",
    isMember: true,
    isAdmin: false,
  },
  {
    emailAddress: "sarah.lee@example.com",
    firstName: "Sarah",
    lastName: "Lee",
    password: "hashedPassword456",
    isMember: true,
    isAdmin: true,
  },
  {
    emailAddress: "michael.c@example.com",
    firstName: "Michael",
    lastName: null,
    password: "hashedPassword789",
    isMember: false,
    isAdmin: false,
  },
];

const messages = [
  {
    authorId: "john.doe@example.com",
    message:
      "Hey everyone, I’ve been working on the new feature update and it’s taking a bit longer than expected. The logic around input validation got more complex than I anticipated, and I had to refactor a few components. I’ll post an update later today once the tests pass.",
  },
  {
    authorId: "sarah.lee@example.com",
    message:
      "Just finished reviewing the pull request from yesterday. Overall it looks solid, but there are a few places where we could improve readability and consistency. I’ve left comments directly on the diff. Let me know once the revisions are pushed.",
  },
  {
    authorId: "michael.c@example.com",
    message:
      "Does anyone know why the authentication middleware keeps throwing a session undefined error? It only happens on the initial page load but not on subsequent requests. I’ve checked the configuration, and everything seems correct.",
  },
  {
    authorId: "john.doe@example.com",
    message:
      "Quick update: the validation refactor is now complete. I split the logic into smaller reusable functions and introduced a central schema mapping to reduce duplication. The codebase feels much cleaner now and all tests are passing.",
  },
  {
    authorId: "sarah.lee@example.com",
    message:
      "I’m planning to deploy the latest changes to the staging environment tonight. If anyone has pending updates or wants something included in this batch, please let me know before 9 PM. After deployment, I’ll run through a full smoke test to verify stability.",
  },
  {
    authorId: "michael.c@example.com",
    message:
      "Thanks to everyone who helped troubleshoot the session issue earlier. It turned out to be a missing configuration key in my environment file. Once I corrected that, everything started working correctly again. Appreciate the support!",
  },
];

const createUserTable = `CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255),
    email_address VARCHAR ( 255 ) NOT NULL UNIQUE,
    password varchar ( 255 ) NOT NULL,
    is_member BOOLEAN NOT NULL DEFAULT false,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    join_timestamp timestamptz DEFAULT CURRENT_TIMESTAMP
);`;

const createMessageTable = `
CREATE TABLE messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id INTEGER REFERENCES users (id) NOT NULL,
    message VARCHAR (2000),
    created_timestamp timestamptz DEFAULT CURRENT_TIMESTAMP
);`;

const addUserSQL = `INSERT INTO users (
        email_address,
        first_name,
        last_name,
        password,
        is_member,
        is_admin
      )
    VALUES ($1, $2, $3, $4, $5, $6);`;

const addMessage = `INSERT INTO messages (author_id, message)
            SELECT u.id, $2 FROM users u WHERE u.email_address = $1;`;

const seedDb = async () => {
  const client = await pool.connect();
  try {
    console.log("Seeding Data.....");
    await client.query("BEGIN");
    await client.query(createUserTable);
    await client.query(createMessageTable);
    for (const user of users) {
      await client.query({
        text: addUserSQL,
        values: [
          user.emailAddress,
          user.firstName,
          user.lastName,
          await argon2.hash(user.password),
          user.isMember,
          user.isAdmin,
        ],
      });
    }
    for (const message of messages) {
      await client.query({
        text: addMessage,
        values: [message.authorId, message.message],
      });
    }
    client.query("COMMIT");
    console.log("done");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error);
  } finally {
    client.release();
  }
  process.exit(0);
};

seedDb();
