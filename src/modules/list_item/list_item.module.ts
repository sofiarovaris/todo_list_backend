import { Module } from '@nestjs/common';
import { ListItemService } from './list_item.service';
import { ListItemController } from './list_item.controller';

@Module({
  controllers: [ListItemController],
  providers: [ListItemService],
})
export class ListItemModule {}
