import pool from "../config/database.js";

export const addUser = async ({
  emailAddress,
  firstName,
  lastName,
  password,
  isMember,
  isAdmin,
}: NewUser) => {
  const addUserSQL = {
    text: `INSERT INTO users (
        email_address,
        first_name,
        last_name,
        password,
        is_member,
        is_admin
      )
    VALUES ($1, $2, $3, $4, $5, $6);`,
    values: [emailAddress, firstName, lastName, password, isMember, isAdmin],
  };

  const result = await pool.query(addUserSQL);

  return result;
};

export const getUserById = async (userId: number) => {
  const getUserSQL = {
    text: `
      SELECT id,
        first_name AS firstName,
        last_name AS lastName,
        email_address AS emailAddress,
        is_member AS isMember,
        is_admin AS isAdmin,
        join_timestamp AS joinTimestamp
      FROM users
      WHERE id=$1;`,
    values: [userId],
  };
  const { rows } = await pool.query<SafeUser>(getUserSQL);

  if (!rows[0]) {
    return null;
  }

  return rows[0];
};

export const getAllUsers = async () => {
  const getAllUsersSQL = `
      SELECT id,
        first_name AS firstName,
        last_name AS lastName,
        email_address AS emailAddress,
        is_member AS isMember,
        is_admin AS isAdmin,
        join_timestamp AS joinTimestamp
      FROM users;`;
  const { rows } = await pool.query<SafeUser>(getAllUsersSQL);

  if (!rows[0]) {
    return null;
  }

  return rows;
};

export const isEmailUsed = async (email: string) => {
  const getEmail = {
    text: `
      SELECT email_address
      FROM users
      WHERE email_address=$1;`,
    values: [email],
  };
  const result = await pool.query(getEmail);
  return result?.rowCount !== null && 0 < result?.rowCount;
};

export const getUserByEmail = async (email: string) => {
  const getUserSQL = {
    text: `
      SELECT id,
        first_name AS firstName,
        last_name AS lastName,
        email_address AS emailAddress,
        password,
        is_member AS isMember,
        is_admin AS isAdmin,
        join_timestamp AS joinTimestamp
      FROM users
      WHERE email_address=$1;`,
    values: [email],
  };
  const { rows } = await pool.query<IUser>(getUserSQL);

  if (!rows[0]) {
    return null;
  }

  return rows[0];
};
