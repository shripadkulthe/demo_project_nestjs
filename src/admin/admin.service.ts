import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  getAdminData() {
    return { message: 'This is admin data' };
  }
}
