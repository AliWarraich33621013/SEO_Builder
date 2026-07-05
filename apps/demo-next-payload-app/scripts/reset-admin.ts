import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

const EMAIL = 'admin@seobuilder.local'
const PASSWORD = 'Admin@123456!'

async function resetAdmin() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: EMAIL } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: { password: PASSWORD },
    })
    console.log(`Updated password for existing user: ${EMAIL}`)
  } else {
    await payload.create({
      collection: 'users',
      data: { email: EMAIL, password: PASSWORD },
    })
    console.log(`Created admin user: ${EMAIL}`)
  }

  process.exit(0)
}

resetAdmin().catch((err) => {
  console.error(err)
  process.exit(1)
})
