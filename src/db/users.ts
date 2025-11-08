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
