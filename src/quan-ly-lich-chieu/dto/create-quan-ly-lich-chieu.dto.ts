import { ApiProperty } from "@nestjs/swagger"

export class CreateQuanLyLichChieuDto {
    @ApiProperty({required:true})
    ma_rap: number
    @ApiProperty({required:true})
    ma_phim: number
    @ApiProperty({required:true, default:'yyyy-mm-ddThh:mm:ssZ'})
    ngay_gio_chieu: Date
    @ApiProperty({required:true})
    gia_ve: number
}
