const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    // ... existing properties and methods ...
  
    static async getUsersWithBooks() {
      const connection = await sql.connect(dbConfig);
  
      try {
        const query = `
          SELECT u.id AS user_id, u.username, u.email, b.id AS book_id, b.title, b.author
          FROM Users u
          LEFT JOIN UserBooks ub ON ub.user_id = u.id
          LEFT JOIN Books b ON ub.book_id = b.id
          ORDER BY u.username;
        `;
  
        const result = await connection.request().query(query);
  
        // Group users and their books
        const usersWithBooks = {};
        for (const row of result.recordset) {
          const userId = row.user_id;
          if (!usersWithBooks[userId]) {
            usersWithBooks[userId] = {
              id: userId,
              username: row.username,
              email: row.email,
              books: [],
            };
          }
          usersWithBooks[userId].books.push({
            id: row.book_id,
            title: row.title,
            author: row.author,
          });
        }
  
        return Object.values(usersWithBooks);
      } catch (error) {
        throw new Error("Error fetching users with books");
      } finally {
        await connection.close();
      }
    }
  
    // ... other methods ...
  }
  
  module.exports = User;