import {
  AddOperator,
  UpdateOperator,
  UpdateOperatorAsSuperAdmin,
} from "./operator.type";
import request from "@/helpers/request";

class OperatorService {
  base: string = "/operator";
  constructor(private readonly requestMethod: typeof request) {}
  async createOperator(data: AddOperator) {
    return await this.requestMethod.post({ url: this.base, body: data });
  }

  async deleteOperator(id: string) {
    return await this.requestMethod.delete(id);
  }
  async updateOperator(id: string, data: UpdateOperatorAsSuperAdmin) {
    return await this.requestMethod.patch({
      url: `${this.base}/${id}`,
      body: data,
    });
  }
  async updateSelfOperator(data: UpdateOperator) {
    return await this.requestMethod.patch({
      url: `${this.base}/self`,
      body: data,
    });
  }
  async findOperator(id: string) {
    return await this.requestMethod.get({ url: `${this.base}/:${id}` });
  }
  async findManyOperators(query: string) {
    return await this.requestMethod.get({
      url: `${this.base}?${query}`,
    });
  }
}
export default new OperatorService(request);