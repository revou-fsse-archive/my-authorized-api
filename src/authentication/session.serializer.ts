import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private prisma: PrismaService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: any) => void): any {
    done(null, user.id);
  }

  async deserializeUser(
    payload: number,
    done: (err: Error, payload: User) => void,
  ): Promise<void> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: payload,
      }
    })
    done(null, user);
  }
}
