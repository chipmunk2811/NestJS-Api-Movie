import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyPhongChieuDto } from './create-quan-ly-phong-chieu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuanLyPhongChieuDto extends PartialType(CreateQuanLyPhongChieuDto) {
    @ApiProperty({ required: true })
    ten_rap: string
}
