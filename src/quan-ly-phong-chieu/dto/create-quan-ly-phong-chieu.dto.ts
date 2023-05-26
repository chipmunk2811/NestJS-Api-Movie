import { ApiProperty } from "@nestjs/swagger"

export class CreateQuanLyPhongChieuDto {
    @ApiProperty({required: true})
    ma_rap: number
    @ApiProperty({required: true})
    ten_rap: string
}

