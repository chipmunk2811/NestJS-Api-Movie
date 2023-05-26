import { ApiProperty } from "@nestjs/swagger"

export class CreateGheEntity {
    @ApiProperty({ required: true })
    ma_ghe: number
    @ApiProperty({ required: true })
    ten_ghe: string
    @ApiProperty({ required: true })
    loai_ghe: string
    @ApiProperty({ required: true ,default: false})
    da_dat: boolean | null
    @ApiProperty({ required: true })
    ty_le_gia_ve: number | null
}
