

module.exports = {
  apps : [{
    name   : "sit1",
    script : "npm",
    args:"run start",
    watch: true,
    env: {
      "DATABASE_URL":"postgresql://postgres:123jao@localhost:5432/cit-2.0?schema=public",
      "AUTH_SECRET":"57nMxzES8oWN0ZJj8VQhzpXEFJaBInCnG2AlAVXBXNo"
    }
  }]
}
