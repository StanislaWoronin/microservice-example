import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(email: string) {
    return email === 'test@mail.ru'; // обращение к микросервису для проверки существования юзера
  }
}
