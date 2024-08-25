import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import List from '../../entities/list.entity';
import { UserModule } from '../user/user.module';
import ListItem from '../../entities/list_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, ListItem]), UserModule],
  controllers: [ListController],
  providers: [ListService],
  exports: [ListService],
})
export class ListModule {}
