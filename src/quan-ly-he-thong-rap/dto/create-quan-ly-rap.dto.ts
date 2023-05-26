import { ApiProperty } from "@nestjs/swagger";

export class CreateQuanLyHeThongRapDto {
    @ApiProperty({ required: true, format: 'string' })
    ten_he_thong_rap: string
    @ApiProperty({ required: true, type: 'string', format: 'binary' })
    file: Express.Multer.File;
}

export class CreateQuanLyCumRapDto {
    @ApiProperty({ required: true })
    ma_cum_rap: number
    @ApiProperty({ required: true })
    ten_cum_rap: string
    @ApiProperty({ required: true })
    dia_chi: string
}