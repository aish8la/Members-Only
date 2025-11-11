import pool from "../config/database.js";

type User = {
  emailAddress: string;
  firstName: string;
  lastName: string | null;
  password: string;
  isMember: boolean;
  isAdmin: boolean;
};

export const addUser = async ({
  emailAddress,
  firstName,
  lastName,
  password,
  isMember,
  isAdmin,
}: User) => {
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
        first_name,
        last_name,
        email_address,
        is_member,
        is_admin,
        join_timestamp
      FROM users
      WHERE id=$1;`,
    values: [userId],
  };
  const result = await pool.query(getUserSQL);

  return result.rows[0];
};

export const getAllUsers = async () => {
  const getAllUsersSQL = `
      SELECT id,
        first_name,
        last_name,
        email_address,
        is_member,
        is_admin,
        join_timestamp
      FROM users;`;
  const result = await pool.query(getAllUsersSQL);

  return result.rows;
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
