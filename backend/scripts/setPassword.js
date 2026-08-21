const bcrypt = require('bcryptjs')
const prisma = require('../src/db')

async function main() {
  const email = process.argv[2]
  const newPassword = process.argv[3]

  if (!email || !newPassword) {
    console.log('Usage: node scripts/setPassword.js <email> <newPassword>')
    process.exit(1)
  }

  const hashed = await bcrypt.hash(newPassword, 10)
  const user = await prisma.adminUser.update({
    where: { email: email.trim().toLowerCase() },
    data: { password: hashed },
  })

  console.log(`Password updated for ${user.email}`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())