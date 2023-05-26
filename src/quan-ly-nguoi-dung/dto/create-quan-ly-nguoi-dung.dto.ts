import { ApiProperty } from "@nestjs/swagger"

export class CreateQuanLyNguoiDungDto {
    @ApiProperty({ required: true })
    tai_khoan: string
    @ApiProperty({ required: true })
    ho_ten: string
    @ApiProperty({ required: true })
    email: string
    @ApiProperty({ required: true })
    so_dt: string
    @ApiProperty({ required: true })
    mat_khau: string
}

export class CreateQuanTriDto {
    @ApiProperty({ required: true })
    tai_khoan: string
    @ApiProperty({ required: true })
    ho_ten: string
    @ApiProperty({ required: true })
    email: string
    @ApiProperty({ required: true })
    so_dt: string
    @ApiProperty({ required: true })
    mat_khau: string
    @ApiProperty({ required: true })
    loai_nguoi_dung: string
}
