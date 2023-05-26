import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyCumRapDto, CreateQuanLyHeThongRapDto } from './create-quan-ly-rap.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuanLyHeThongRapDto extends PartialType(CreateQuanLyHeThongRapDto) {
    @ApiProperty({ required: false, format: 'string' })
    ten_he_thong_rap: string
    @ApiProperty({ required: false, type: 'string', format: 'binary' })
    file: Express.Multer.File;
}

export class UpdateQuanLyCumRapDto extends PartialType(CreateQuanLyCumRapDto) {
    @ApiProperty({ required: false })
    ten_cum_rap: string
    @ApiProperty({ required: false })
    dia_chi: string
}