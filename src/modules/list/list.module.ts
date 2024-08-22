import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import List from 'src/entities/list.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([List]), UserModule],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
