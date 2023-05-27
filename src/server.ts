import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';
import { PrismaService } from './prisma/prisma.service';

export class Server {
  constructor(private readonly app: INestApplication) {}

  init() {
    this.app.useGlobalPipes(new ValidationPipe());

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Reflectiz REST API')
      .setDescription('REST API Documentation')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup('/docs', this.app, document);
  }

  async start() {
    await this.app.listen(config.PORT, () => {
      console.log(`Server is running at ${config.HOST} 🚀`);
    });

    const prismaService = this.app.get(PrismaService);
    await prismaService.enableShutdownHooks(this.app);
  }
}
