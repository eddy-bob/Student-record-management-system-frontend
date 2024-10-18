import { AddResult, UpdateResult } from "./result.type";
import request from "@/helpers/request";

class ResultService {
  base: string = "/result";
  constructor(private readonly requestMethod: typeof request) {}
  async createResult(data: AddResult[]) {
    return await this.requestMethod.post({ url: this.base, body: data });
  }

  async updateResult(data: UpdateResult, id: string) {
    return await this.requestMethod.patch({
      url: `${this.base}/:${id}`,
      body: data,
    });
  }
  async deleteResult(id: string) {
    return await this.requestMethod.delete(id);
  }
  async findResult(id: string) {
    return await this.requestMethod.get({ url: `${this.base}/:${id}` });
  }
  async findManyResults(query: string) {
    return await this.requestMethod.get({
      url: `${this.base}?${query}`,
    });
  }
}
export default new ResultService(request);
