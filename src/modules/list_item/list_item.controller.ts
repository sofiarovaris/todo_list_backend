import { Controller } from '@nestjs/common';
import { ListItemService } from './list_item.service';

@Controller('list-item')
export class ListItemController {
  constructor(private readonly listItemService: ListItemService) {}
}
