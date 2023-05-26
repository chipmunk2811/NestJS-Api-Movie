import { ApiProperty } from "@nestjs/swagger"

export class CreateQuanLyDatVeDto {
   @ApiProperty({ required: true })
   tai_khoan: string
   @ApiProperty({ required: true })
   ma_lich_chieu: number
   @ApiProperty({ required: true })
   ma_ghe: number
}




