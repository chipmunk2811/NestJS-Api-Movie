import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyNguoiDungDto, CreateQuanTriDto } from './create-quan-ly-nguoi-dung.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuanLyNguoiDungDto extends PartialType(CreateQuanLyNguoiDungDto) {
    @ApiProperty({ required: false })
    ho_ten: string
    @ApiProperty({ required: false })
    email: string
    @ApiProperty({ required: false })
    so_dt: string
    @ApiProperty({ required: false })
    mat_khau_cu: string
    @ApiProperty({ required: false })
    mat_khau_moi: string
}

export class UpdateQuanTriDto extends PartialType(CreateQuanTriDto) {
    @ApiProperty({ required: false })
    ho_ten: string
    @ApiProperty({ required: false })
    email: string
    @ApiProperty({ required: false })
    so_dt: string
    @ApiProperty({ required: false })
    loai_nguoi_dung: string
    @ApiProperty({ required: false })
    mat_khau_cu: string
    @ApiProperty({ required: false })
    mat_khau_moi: string
}