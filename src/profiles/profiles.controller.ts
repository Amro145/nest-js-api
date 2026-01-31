import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto';
import { ProfilesService } from './profiles.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(private readonly ProfilesService: ProfilesService) { }
    @Get()
    findAll() {
        return "this is return all profiles";
    }
    @Get("/:id")
    findOne(@Param('id') id: string) {
        return id;
    }
    @Post()
    create(@Body() createProfileDto: CreateProfileDto, @Req() req, @Res() res) {
        res.status(200).send(req.body)
        return this.ProfilesService.create(createProfileDto)
    }


}
