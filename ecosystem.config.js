

module.exports = {
  apps : [{
    name   : "sit1",
    script : 'npm run start',
    env:{
     "NODE_ENV":"production",
     "DATABASE_URL":"postgresql://postgres:sicart2024@localhost:5432/sitbase?schema=public",
     "AUTH_SECRET":"57nMxzES8oWN0ZJj8VQhzpXEFJaBInCnG2AlAVXBXNo",
     "AUTH_TRUST_HOST":true
   }
  }]
}
