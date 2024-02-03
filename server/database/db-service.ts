import {client} from '~/server/database/client'
import type {QueryResult} from "pg";

export abstract class BaseApiService<Get> {
  client = client
  async getAll(queryString: string): Promise<Get[] | undefined> {
    try {
      const res: QueryResult = await this.client.query(queryString)
      return res.rows as Get[]
    } catch (error) {
      console.log(error)
      return
    }
  }

  async getOneById(queryString: string): Promise<Get | undefined> {
    try {
      const res: QueryResult = await this.client.query(queryString)
      return res.rows[0] as Get
    } catch (error) {
      console.log(error)
      return
    }
  }

  async getManyById(queryString: string): Promise<Get[] | undefined> {
    try {
      const res: QueryResult = await this.client.query(queryString)
      return res.rows as Get[]
    } catch (error) {
      console.log(error)
      return
    }
  }

  async createOne(queryString: string): Promise<QueryResult | undefined> {
    try {
      return await this.client.query(queryString)
    } catch (error) {
      console.log(error)
      return
    }
  }

  async createMany(queryString: string): Promise<QueryResult | undefined> {
    try {
      return await this.client.query(queryString)
    } catch (error) {
      console.log(error)
      return
    }
  }

  async updateMany(queryStringArr: string[]): Promise<QueryResult[] | undefined> {
    try {
      const promises: Promise<QueryResult>[] = []

      queryStringArr.forEach(queryString => {
        promises.push(this.client.query(queryString))
      })

      return await Promise.all(promises)
    } catch (error) {
      console.log(error)
      return
    }
  }

  async deleteOneById(queryString: string): Promise<QueryResult | undefined>  {
    try {
      return await this.client.query(queryString)
    } catch (error) {
      console.log(error)
      return
    }
  }

  async updateOneById(queryString: string): Promise<QueryResult | undefined> {
    try {
      return await this.client.query(queryString)
    } catch (error) {
      console.log(error)
      return
    }
  }
}

export class DataBaseService {
  client = client
}
