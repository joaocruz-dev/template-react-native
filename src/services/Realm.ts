import Realm from 'realm'

export default async () => {
  const realm = await Realm.open({
    path: 'app'
  })

  return realm
}
