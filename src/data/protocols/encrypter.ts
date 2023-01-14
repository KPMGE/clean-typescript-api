export interface Encrypter {
  encrypt(text: string): Promise<string>
}
