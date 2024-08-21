import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitiesList } from './entities';
import { UsersModule } from './users/users.module';
import { UsersModule } from './modules/users/users.module';
import { UserModule } from './modules/user/user.module';
import { ListModule } from './modules/list/list.module';
import { ListItemModule } from './modules/list_item/list_item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: EntitiesList,
    }),
    UsersModule,
    UserModule,
    ListModule,
    ListItemModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
