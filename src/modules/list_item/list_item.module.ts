import { Module } from '@nestjs/common';
import { ListItemService } from './list_item.service';
import { ListItemController } from './list_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ListItem from 'src/entities/list_item.entity';
import { ListModule } from '../list/list.module';

@Module({
  imports: [TypeOrmModule.forFeature([ListItem]), ListModule],
  controllers: [ListItemController],
  providers: [ListItemService],
})
export class ListItemModule {}
