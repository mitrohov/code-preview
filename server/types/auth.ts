import jwt from 'jsonwebtoken'
import {DataBaseService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";

export interface User {
  login: string
  password: string
}

export class AuthModule extends DataBaseService {
  jwt = jwt
  maxAgeToken = '360 days';
  jwtHash = `${process.env.JWT_HASH}`
  async checkUser(login: string, password: string): Promise<number | undefined> {
    try {
      const response= await this.client.query(`
        SELECT * FROM ${DbTables.users}
        WHERE users.login = '${login}' AND users.password = '${password}';
      `)

      return response.rows[0].id;
    } catch (error) {
      console.log(error)
      return
    }
  }
  async signIn(login: string, password: string): Promise<string | undefined> {
    const id = await this.checkUser(login, password)
    if (id) {
      return this.createToken(id)
    }
    return
  }
  jwtVerify(jwt: string) {
    try {
      this.jwt.verify(jwt, this.jwtHash)
      return true
    } catch (e) {
      return false
    }
  }
  createToken(id: number): string {
    return jwt.sign({ id }, this.jwtHash, {
      expiresIn: this.maxAgeToken
    });
  }
}

export const authModule = new AuthModule()
