import { ApiProperty } from "@nestjs/swagger";

export class SearchTenPhim {
    @ApiProperty({ required: false ,description: 'Tìm Kiếm Tên Phim'})
    tenPhim: string
}

export interface CreateQuanLyPhimEntity {
    ten_phim: string
    trailer: string
    ngay_khoi_chieu: Date
    dang_chieu: boolean
    quoc_gia: string
    dien_vien: string
    the_loai: string
    dao_dien: string
    danh_gia: number
    mo_ta: string
    hot: number
    thoi_luong: number | null
    hinh_anh: string
}
