import { ApiProperty } from "@nestjs/swagger"

export class DeleteMany {
    @ApiProperty({required: true ,example:'[999,1000]'})
    ma_lich_chieu: Array<number>
}

export class GetLichChieuTheoMaPhimVaMaCumRap {
    @ApiProperty({required: true})
    ma_phim: number
    @ApiProperty({required: true})
    ma_cum_rap: number
}