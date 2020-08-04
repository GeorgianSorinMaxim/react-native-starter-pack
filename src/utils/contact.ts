import { Alert, Linking } from 'react-native'

export const contact = (email: string, subject: string, body: string) => {
  const url = `mailto:${email}?subject=${subject}&body=${body}`

  Linking.openURL(url).catch(() => {
    const message =
      'The email link could not be opened in your email client, ' +
      "this may be because you don't have an email client configured on this device. " +
      'You can email us directly using\n' +
      email

    Alert.alert(message)
  })
}
