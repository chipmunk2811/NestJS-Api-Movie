import { ApiProperty } from "@nestjs/swagger"

export class SearchTenHeThong {
    @ApiProperty({ required: false, description: 'Tìm Kiếm Tên Của Hệ Thống Rạp' })
    tenHeThong: string
};


export interface typesPostHeThongRap {
    ten_he_thong_rap: string
    logo: string
};

export class SearchTenCumRap {
    @ApiProperty({ required: false, description: 'Tìm Kiếm Tên Của Cụm Rạp (VD: aeo Của ma_he_thong_rap: 2)' })
    ten_cum_rap: string
};