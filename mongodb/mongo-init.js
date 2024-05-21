db.createUser(
   {
       user: `${ process.env.USERNAME }`,
       pwd: `${ process.env.PASSWORD }`,
       roles: [
           {
               role: ["readWrite", "dbAdmin"],
               db: `${ process.env.DATABASE }`
           }
       ]
   }
);