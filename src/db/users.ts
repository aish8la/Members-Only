import pool from "../config/database.js";
import { keysToCamelCase } from "../utils/utility.js";
import type { IUser, SafeUser, NewUser } from "../typings/user.js";

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
  const { rows } = await pool.query(getUserSQL);

  if (!rows[0]) {
    return null;
  }

  return keysToCamelCase(rows[0]) as SafeUser;
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
  const { rows } = await pool.query(getAllUsersSQL);

  if (!rows[0]) {
    return null;
  }

  return keysToCamelCase(rows) as SafeUser;
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
        first_name,
        last_name,
        email_address,
        password,
        is_member,
        is_admin,
        join_timestamp
      FROM users
      WHERE email_address=$1;`,
    values: [email],
  };
  const { rows } = await pool.query(getUserSQL);

  if (!rows[0]) {
    return null;
  }

  return keysToCamelCase(rows[0]) as IUser;
};

export const setMember = async (userId: number) => {
  const setMemberSQL = {
    text: `
      UPDATE users
      SET is_member=true
      WHERE id=$1;`,
    value: [userId],
  };
  const result = await pool.query(setMemberSQL);
  return result;
};
