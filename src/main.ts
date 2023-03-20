import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';
import * as passport from "passport";
import * as session from "express-session";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
      session({
        secret: "keyboard",
        resave: false,
        saveUninitialized: false,
      })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT);
}

void bootstrap();
