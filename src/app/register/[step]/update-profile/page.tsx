import { getCurrentUser } from '@/lib/session'

import { UpdateProfileComponent } from './update-profile'

export default async function UpdateProfile() {
  const currentUser = await getCurrentUser()

  return <UpdateProfileComponent user={currentUser} />
}
