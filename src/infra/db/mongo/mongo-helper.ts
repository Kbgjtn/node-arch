import { MongoClient, Collection } from "mongodb";

export const MongoHelper = {
  client: {} as MongoClient,
  uri: "",

  async connect(uri: string): Promise<void> {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map: (data: any): any => {
    const { _id, ...rest } = data;
    return { ...rest, id: _id.toHexString() };
  },
  mapCollection: (collection: any[]): any[] => {
    return collection.map((collection) => MongoHelper.map(collection));
  },
};
