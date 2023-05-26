import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuanLyDatVeDto } from './dto/create-quan-ly-dat-ve.dto';
import { DatVe, Ghe, PrismaClient } from '@prisma/client';
import { Response, typesResponse } from 'src/utils/response';
const prisma = new PrismaClient();

@Injectable()
export class QuanLyDatVeService {
  async getDatVe(): Promise<typesResponse<any>> {
    const data = await prisma.datVe.findMany();
    const res = new Response(200, "Thông Tin Vé Đã Đặt", data)
    return res;
  }

  async findAll(ma_ve: number): Promise<typesResponse<any>> {
    const checkMaVe = await prisma.datVe.findFirst({ where: { ma_ve }, include: { Ghe: { select: { ten_ghe: true } }, LichChieu: { select: { ngay_gio_chieu: true, gia_ve: true, Phim: { select: { ten_phim: true, thoi_luong: true } }, RapPhim: { select: { ten_rap: true, CumRap: { select: { ten_cum_rap: true, dia_chi: true } } } } } } } })
    if (checkMaVe) {
      const res = new Response(201, "Thông Tin Vé Đã Đặt", checkMaVe)
      return res;
    } else {
      throw new HttpException('Chưa Có Thông Tin Đặt Vé', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number): Promise<typesResponse<Ghe[]>> {
    const lichChieu = await prisma.lichChieu.findFirst({ where: { ma_lich_chieu: id } });
    if (lichChieu) {
      // Lấy Thông Tin Các Ghé Của Lịch Chiếu
      const { ma_rap } = lichChieu;
      let Ghe = await prisma.ghe.findMany({ where: { ma_rap } });
      // Lấy Các Ghế Đã Đặt
      let maGhe = [];
      let data = await prisma.datVe.findMany({ where: { ma_lich_chieu: id }, include: { Ghe: true } });
      data.map((r) => {
        const { ma_ghe } = r.Ghe;
        maGhe = [...maGhe, ma_ghe];
      });
      // Cập Nhật Thông Tin Cho Ghé
      maGhe.map((t) => {
        const index = Ghe.findIndex((r) => r.ma_ghe == t);
        Ghe[index].da_dat = true;
      })
      const res = new Response(200, `Danh Sách Ghế Của Mã Lịch Chiếu ${id}`, Ghe)
      return res;
    } else {
      throw new HttpException('Mã Lịch Chiếu Không Chính Xác', HttpStatus.NOT_FOUND);
    }
  }

  async create(createQuanLyDatVeDto: CreateQuanLyDatVeDto): Promise<typesResponse<DatVe>> {
    const { ma_lich_chieu, ma_ghe, tai_khoan } = createQuanLyDatVeDto;
    const data = { ma_lich_chieu, ma_ghe, tai_khoan };
    const newData = await prisma.datVe.create({ data })
    const res = new Response(201, "Đặt Vé Thành Công", newData)
    return res;
  }

  async remove(id: number): Promise<typesResponse<DatVe>> {
    const checkMaVe = await prisma.datVe.findFirst({ where: { ma_ve: id } });
    if (checkMaVe) {
      await prisma.datVe.delete({ where: { ma_ve: id } });
      const res = new Response(202, "Đã Hủy Đặt Vé Thành Công", checkMaVe)
      return res;
    } else {
      throw new HttpException('Không Có Mã Vé', HttpStatus.NOT_FOUND);
    }
  }
}
