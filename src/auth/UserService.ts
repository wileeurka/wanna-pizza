import $api from "../http";
import { AxiosResponse } from "axios";

interface IUser {
  email: string;
  isActivated: boolean;
  id: string;
}

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}
