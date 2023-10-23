import * as SQLite from 'expo-sqlite';

const tokenDB = SQLite.openDatabase('token.db');

export const initTokenDB = () => {
  const promise = new Promise<void>((resolve, reject) => {
    tokenDB.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS token (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          token TEXT
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const storeToken = (token: string) => {
  const promise = new Promise((resolve, reject) => {
    tokenDB.transaction(tx => {
      tx.executeSql(
        `INSERT INTO token (
          token
        ) VALUES (?)`,
        [token],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const deleteToken = () => {
  const promise = new Promise((resolve, reject) => {
    tokenDB.transaction(tx => {
      tx.executeSql(
        `DELETE FROM token`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};

export const takeToken = () => {
  const promise = new Promise((resolve, reject) => {
    tokenDB.transaction(tx => {
      tx.executeSql(
        `SELECT token FROM token ORDER BY id DESC LIMIT 1`,
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            const token: string = result.rows.item(0).token;
            resolve(token);
          } else {
            resolve('');
          }
        },
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });

  return promise;
};
