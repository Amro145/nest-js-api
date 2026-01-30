import { Injectable } from "@nestjs/common";
import { CreateProfileDto } from "./dto/createProfile.dto";
@Injectable()
export class ProfilesService {
    create(createProfileDto: CreateProfileDto) {
        return  "welcome" + createProfileDto.name
    
    }
}