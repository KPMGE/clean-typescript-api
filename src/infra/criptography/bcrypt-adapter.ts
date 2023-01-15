import { Encrypter } from "../../data/protocols/encrypter";
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(text: string): Promise<string> {
    const hash = await bcrypt.hash(text, this.salt)
    return hash
  }
}
