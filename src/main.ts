import 'dotenv/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

const port = process.env.PORT;

function bootstrap() {
  NestFactory.createApplicationContext(AppModule)
    .then((appContext) => {
      const seeder = appContext.get(SeederService);

      return seeder
        .seed()
        .then(() => {
          console.log('Seeding complete');
        })
        .catch((error) => {
          console.log('Seeding failed');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .then(() => NestFactory.create(AppModule))
    .then((app) => {
      app.listen(port, () => {
        console.log(`Server started running on http://localhost:${port}`);
      });
    })
    .catch((error) => {
      throw error;
    });
}
bootstrap();
