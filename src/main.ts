import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from './server';

async function main() {
  const app = await NestFactory.create(AppModule);
  const server = new Server(app);

  server.init();
  server.start();
}

main();
