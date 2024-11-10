import { AddCourse, UpdateCourse } from "./course.type";
import request from "@/helpers/request";

class CourseService {
  base: string = "/course";
  constructor(private readonly requestMethod: typeof request) {}

  async createCourse(data: AddCourse[]) {
    return await this.requestMethod.post({ url: this.base, body: data });
  }

  async updateCourse(data: UpdateCourse, id: string) {
    return await this.requestMethod.patch({
      url: `${this.base}/${id}`,
      body: data,
    });
  }
  async deleteCourse(id: string) {
    return await this.requestMethod.delete(`${this.base}/${id}`);
  }
  async findCourse(id: string) {
    return await this.requestMethod.get({ url: `${this.base}/${id}` });
  }
  async findManyCourses(query: string) {
    return await this.requestMethod.get({
      url: `${this.base}?${query}`,
    });
  }
}
export default new CourseService(request);
