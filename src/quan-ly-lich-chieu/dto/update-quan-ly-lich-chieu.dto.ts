import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyLichChieuDto } from './create-quan-ly-lich-chieu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuanLyLichChieuDto extends PartialType(CreateQuanLyLichChieuDto) {
    @ApiProperty({required:false})
    ma_rap: number
    @ApiProperty({required:false})
    ma_phim: number
    @ApiProperty({required:false, default:'yyyy-mm-ddThh:mm:ssZ'})
    ngay_gio_chieu: Date
    @ApiProperty({required:false})
    gia_ve: number
}
