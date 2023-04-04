import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticationController } from './authentication.controller';
import { LocalStrategy } from './local.strategy';
import { AuthenticatedGuard } from './authenticated.guard';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [
    AuthenticationService,
    PrismaService,
    LocalStrategy,
    AuthenticatedGuard,
    SessionSerializer,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
