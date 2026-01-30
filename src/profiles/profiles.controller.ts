import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateProfileDto } from './dto/createProfile.dto';

@Controller('profiles')
export class ProfilesController {
    @Get()
    findAll() {
        return "this is return all profiles";
    }
    // @Get()
    // findAll(@Query('age') age: number) {
    //     return [{age}];
    // }
    @Get("/:id")
    findOne(@Param ('id') id: string) {
        return  {id};
    }
    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return {
            name: createProfileDto.name,
            description: createProfileDto.description,
            age: createProfileDto.age
        }
    }
}

