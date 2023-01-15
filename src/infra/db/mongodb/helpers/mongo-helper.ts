import { Collection, MongoClient } from "mongodb";

export const MongoHelper = {
  client: null as MongoClient,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {})
    console.log('client: ', this.client)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  async getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }
}
