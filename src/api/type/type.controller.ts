import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeService } from './type.service';

@ApiTags('Type')
@Controller('type')
export class TypeController {
    constructor(private readonly typeService: TypeService) {}

    @Post()
    @ApiOperation({ summary: 'create type' })
    async create(@Body() createTypeDto: CreateTypeDto) {
        return await this.typeService.create(createTypeDto);
    }

    // @Get()
    // findAll() {
    //   return this.typeService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.typeService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    //   return this.typeService.update(+id, updateTypeDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.typeService.remove(+id);
    // }
}
