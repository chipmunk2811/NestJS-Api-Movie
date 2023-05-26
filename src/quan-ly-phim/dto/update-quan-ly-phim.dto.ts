import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyPhimDto } from './create-quan-ly-phim.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuanLyPhimDto extends PartialType(CreateQuanLyPhimDto) {
    @ApiProperty({required: false})
    ten_phim: string
    @ApiProperty({required: false})
    trailer: string
    @ApiProperty({required: false, default: 'yyyy-mm-dd'})
    ngay_khoi_chieu: Date
    @ApiProperty({required: false})
    dang_chieu: boolean
    @ApiProperty({required: false})
    quoc_gia: string
    @ApiProperty({required: false})
    dien_vien: string
    @ApiProperty({required: false})
    the_loai: string
    @ApiProperty({required: false})
    dao_dien: string
    @ApiProperty({required: false})
    danh_gia: number
    @ApiProperty({required: false})
    mo_ta: string
    @ApiProperty({required: false})
    hot: number
    @ApiProperty({required: false})
    thoi_luong: number | null
    @ApiProperty({ required: false, type: 'string', format: 'binary' })
    file: Express.Multer.File
}
