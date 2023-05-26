import { ApiProperty } from "@nestjs/swagger"

export class CreateQuanLyPhimDto {
    @ApiProperty({required: true})
    ten_phim: string
    @ApiProperty({required: true})
    trailer: string
    @ApiProperty({required: true, default: 'yyyy-mm-dd'})
    ngay_khoi_chieu: Date
    @ApiProperty({required: true})
    dang_chieu: boolean
    @ApiProperty({required: true})
    quoc_gia: string
    @ApiProperty({required: true})
    dien_vien: string
    @ApiProperty({required: true})
    the_loai: string
    @ApiProperty({required: true})
    dao_dien: string
    @ApiProperty({required: true})
    danh_gia: number
    @ApiProperty({required: true})
    mo_ta: string
    @ApiProperty({required: true})
    hot: number
    @ApiProperty({required: false})
    thoi_luong: number | null
    @ApiProperty({ required: true, type: 'string', format: 'binary' })
    file: Express.Multer.File
}
