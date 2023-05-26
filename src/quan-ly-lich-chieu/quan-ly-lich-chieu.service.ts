import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuanLyLichChieuDto } from './dto/create-quan-ly-lich-chieu.dto';
import { UpdateQuanLyLichChieuDto } from './dto/update-quan-ly-lich-chieu.dto';
import { Response, typesResponse } from 'src/utils/response';
import { LichChieu, PrismaClient, } from '@prisma/client';
import { DeleteMany, GetLichChieuTheoMaPhimVaMaCumRap } from './entities/quan-ly-lich-chieu.entity';
import { concat } from 'rxjs';

const prisma = new PrismaClient();
@Injectable()
export class QuanLyLichChieuService {
  async getLichChieuTheoMaPhimVaMaCumRap(body: GetLichChieuTheoMaPhimVaMaCumRap): Promise<typesResponse<any>> {
    const { ma_cum_rap, ma_phim } = body;
    const checkMaCumRap = await prisma.cumRap.findFirst({ where: { ma_cum_rap } });
    const checkMaPhim = await prisma.phim.findFirst({ where: { ma_phim } });
    if (checkMaCumRap && checkMaPhim) {
      const data = await prisma.lichChieu.findMany({ include: { RapPhim: true, Phim: true }, where: { Phim: { ma_phim }, RapPhim: { ma_cum_rap } } });
      const res = new Response(200, 'Lấy Thành Công Thông Tin Lịch Chiếu Theo Mã Phim Và Mã Cụm Rạp', data);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Phim Hoặc Mã Cụm Rạp`, HttpStatus.NOT_FOUND);
    }
  }


  async getLichChieuTheoMaPhim(id: number): Promise<typesResponse<any>> {
    const checkMaPhim = await prisma.phim.findFirst({ where: { ma_phim: id } });
    if (checkMaPhim) {
      const data = await prisma.phim.findMany({ where: { ma_phim: id }, include: { LichChieu: true } });
      const res = new Response(200, 'Lấy Thành Công Thông Tin Lịch Chiếu Theo Mã Phim', data);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Phim`, HttpStatus.NOT_FOUND);
    }
  }

  async getLichChieuTheoMaCumRap(id: number): Promise<typesResponse<any>> {
    const checkMaCumRap = await prisma.cumRap.findFirst({ where: { ma_cum_rap: id } });
    if (checkMaCumRap) {
      const data = await prisma.rapPhim.findMany({ where: { ma_cum_rap: id }, include: { LichChieu: true } });
      const res = new Response(200, 'Lấy Thành Công Thông Tin Lịch Chiếu Theo Mã Cụm Rạp', data);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Cụm Rạp`, HttpStatus.NOT_FOUND);
    }
  }

  async postLichChieu(createQuanLyLichChieuDto: CreateQuanLyLichChieuDto): Promise<typesResponse<LichChieu>> {
    let { ma_rap, ma_phim, gia_ve, ngay_gio_chieu } = createQuanLyLichChieuDto;
    const checkMaPhim = await prisma.phim.findFirst({ where: { ma_phim } });
    const checkMaRap = await prisma.rapPhim.findFirst({ where: { ma_rap }, include: { Ghe: true } });
    if (checkMaRap && checkMaPhim) {
      const data = { ma_rap, ma_phim, ngay_gio_chieu, gia_ve }
      const test = await prisma.lichChieu.create({ data });
      const res = new Response(201, 'Tạo Lịch Chiếu Thành Công', test);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Phim Hoặc Mã Rạp`, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateQuanLyLichChieuDto: UpdateQuanLyLichChieuDto): Promise<typesResponse<UpdateQuanLyLichChieuDto>> {
    const checkMaLichChieu = await prisma.lichChieu.findFirst({ where: { ma_lich_chieu: id } });
    if (checkMaLichChieu) {
      const { ma_rap, ma_phim, ngay_gio_chieu, gia_ve } = updateQuanLyLichChieuDto;
      if (ma_rap || ma_phim || ngay_gio_chieu || gia_ve) {
        const data = { ma_rap, ma_phim, ngay_gio_chieu, gia_ve };
        await prisma.lichChieu.update({ data, where: { ma_lich_chieu: id } });
        const res = new Response(202, `Cập Nhật Thành Công Lịch Chiếu ${id}`, data);
        return res;
      } else {
        throw new HttpException(`Không Tìm Thấy Thông Tin Cần Cập Nhật`, HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Lịch Chiếu`, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<typesResponse<LichChieu>> {
    const checkData = await prisma.lichChieu.findFirst({ where: { ma_lich_chieu: id } });
    if (checkData) {
      await prisma.lichChieu.delete({ where: { ma_lich_chieu: id } });
      const res = new Response(202, `Xóa Thành Công Mã Lịch Chiếu ${id}`, checkData);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Lịch Chiếu`, HttpStatus.NOT_FOUND);
    }
  }

  async removeMany(body: DeleteMany): Promise<typesResponse<any>> {
    const { ma_lich_chieu } = body;
    const data = await prisma.lichChieu.findMany();
    let checkData = false;
    ma_lich_chieu.map(maLichChieu => data.map(lichChieu => {
      if (maLichChieu == lichChieu.ma_lich_chieu) { return checkData = true; };
      return checkData;
    }
    ));
    if (checkData) {
      await prisma.lichChieu.deleteMany({ where: { ma_lich_chieu: { in: ma_lich_chieu } } });
      const res = new Response(202, `Xóa Thành Công Mã Lịch Chiếu Ngày ${ma_lich_chieu}`, null);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Lịch Chiếu`, HttpStatus.NOT_FOUND);
    }
  }
}
