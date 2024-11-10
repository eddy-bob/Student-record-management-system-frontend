import { AddStudent, UpdateStudent } from "./student.type";
import request from "@/helpers/request";

class StudentService {
  base: string = "/student";
  constructor(private readonly requestMethod: typeof request) {}
  async createStudent(data: AddStudent[]) {
    return await this.requestMethod.post({ url: this.base, body: data });
  }

  async updateStudent(data: UpdateStudent, id: string) {
    return await this.requestMethod.patch({
      url: `${this.base}/${id}`,
      body: data,
    });
  }
  async deleteStudent(id: string) {
    return await this.requestMethod.delete(`${this.base}/${id}`);
  }
  async findStudent(query: string) {
    return await this.requestMethod.get({ url: `${this.base}?${query}` });
  }
  async findManyStudents(query: string) {
    return await this.requestMethod.get({
      url: `${this.base}/all?${query}`,
    });
  }
}
export default new StudentService(request);
