import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Site')
@Controller('site')
export class SiteController {
    constructor(private readonly siteService: SiteService) {}

    @Post()
    @ApiOperation({ summary: 'create site' })
    async create(@Body() createSiteDto: CreateSiteDto) {
        return await this.siteService.create(createSiteDto);
    }

    @Get()
    @ApiOperation({ summary: 'findAll site' })
    findAll() {
        return this.siteService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.siteService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
    //     return this.siteService.update(+id, updateSiteDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.siteService.remove(+id);
    // }
}
