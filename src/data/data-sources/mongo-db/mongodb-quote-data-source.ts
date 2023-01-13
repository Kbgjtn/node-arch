import {
  NoSQLDatabaseWrapper,
  QuoteDataSource,
} from "@/data/interfaces/data-sources";
import { QuoteRequestModel, QuoteResponseModel } from "@/domain/models";
import { ObjectId } from "mongodb";

export class MongoDBQuoteDataSource implements QuoteDataSource {
  private database: NoSQLDatabaseWrapper;

  constructor(database: NoSQLDatabaseWrapper) {
    this.database = database;
  }

  async getOne(id: string): Promise<QuoteResponseModel | null> {
    const result = await this.database.find({ _id: new ObjectId(id) });

    return result.map((item) => ({
      id: item._id.toString(),
      author: { ...item.author },
      genre: {
        ...item.genre,
      },
      publishDate: item.publishDate,
      topic: item.topic,
    }))[0];
  }

  async createMany(quotes: QuoteRequestModel[]): Promise<void> {
    await this.database.insertMany(quotes);
  }

  async create(quote: QuoteRequestModel): Promise<void> {
    await this.database.insertOne(quote);
  }

  async getAll(): Promise<QuoteResponseModel[] | []> {
    const result = await this.database.find({});

    return result.map((item) => ({
      id: item._id.toString(),
      author: { ...item.author },
      genre: {
        ...item.genre,
      },
      publishDate: item.publishDate,
      topic: item.topic,
    }));
  }

  async deleteOne(id: string): Promise<void> {
    await this.database.deleteOne(id);
  }

  async updateOne(id: string, data: QuoteRequestModel): Promise<void> {
    await this.database.updateOne(id, data);
  }
}
