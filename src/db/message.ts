import pool from "../config/database.js";
import type { IMessage, MessageData, NewMessage } from "../types/appTypes.js";
import { keysToCamelCase } from "../utils/utility.js";

export const addMessage = async ({ authorId, message }: NewMessage) => {
  const insertMessageSQL = {
    text: `INSERT INTO messages (author_id, message)
            VALUES ($1, $2);`,
    values: [authorId, message],
  };
  return await pool.query(insertMessageSQL);
};

export const getAllMessages = async () => {
  const getAllSQL = `
    SELECT u.id,
      u.first_name,
      u.last_name,
      u.is_admin,
      u.is_member,
      u.join_timestamp,
      m.id,
      m.message,
      m.created_timestamp 
    FROM messages as m
    JOIN users as u ON m.author_id = u.id
    ORDER BY m.created_timestamp, m.id;`;

  const { rows } = await pool.query(getAllSQL);
  if (!rows) return null;
  return keysToCamelCase(rows) as MessageData;
};

export const deleteMessage = async (messageId: IMessage["id"]) => {
  const deleteMessageSQL = {
    text: `DELETE FROM messages
            WHERE id=$1`,
    values: [messageId],
  };
  return await pool.query(deleteMessageSQL);
};
