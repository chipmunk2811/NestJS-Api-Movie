import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuanLyPhongChieuDto } from './dto/create-quan-ly-phong-chieu.dto';
import { UpdateQuanLyPhongChieuDto } from './dto/update-quan-ly-phong-chieu.dto';
import { Ghe, PrismaClient, RapPhim } from '@prisma/client';
import { typesResponse } from 'src/utils/response';
import { Response } from 'src/utils/response';
import { CreateGheEntity } from './entities/quan-ly-phong-chieu.entity';


const prisma = new PrismaClient()
@Injectable()
export class QuanLyPhongChieuService {
  async getRapPhim(id: number): Promise<typesResponse<RapPhim[]>> {
    const checkMaCupRap = await prisma.cumRap.findFirst({ where: { ma_cum_rap: id } });
    if (checkMaCupRap) {
      const data = await prisma.rapPhim.findMany({ where: { ma_cum_rap: id } });
      const res = new Response(200, `Lấy Thành Công Thông Tin Các Rạp Phim Mã Cụm ${id}`, data)
      return res;
    } else {
      throw new HttpException('Không Tìm Thấy Mã Cụm Rạp', HttpStatus.NOT_FOUND)
    }
  }

  async postRapPhim(id: number, body: CreateQuanLyPhongChieuDto): Promise<typesResponse<RapPhim>> {
    const { ma_rap, ten_rap } = body;
    const checkMaCupRap = await prisma.cumRap.findFirst({ where: { ma_cum_rap: id } });
    if (checkMaCupRap) {
      const checkMaRap = await prisma.rapPhim.findFirst({ where: { ma_rap } });
      if (checkMaRap) {
        throw new HttpException('Mã Rạp Đã Tồn Tại', HttpStatus.BAD_REQUEST);
      } else {
        if (ma_rap && ten_rap) {
          const newData = { ma_rap, ten_rap, ma_cum_rap: id };
          await prisma.rapPhim.create({ data: newData });
          const res = new Response(201, "Đã tạo thành công phòng chiếu", newData);
          return res;
        } else {
          throw new HttpException('Vui Lòng Điền Đầy Đủ Thông Tin Cần Tạo', HttpStatus.BAD_REQUEST);
        }
      }
    } else {
      throw new HttpException('Không Tìm Thấy Mã Cụm Rạp', HttpStatus.NOT_FOUND)
    }
  }

  async putRapPhim(id: number, body: UpdateQuanLyPhongChieuDto): Promise<typesResponse<string>> {
    const checkMaRap = await prisma.rapPhim.findFirst({ where: { ma_rap: id } });
    if (checkMaRap) {
      const { ten_rap } = body;
      if (ten_rap) {
        await prisma.rapPhim.update({ where: { ma_rap: id }, data: { ten_rap } });
        const res = new Response(202, `Đã cập nhật thành công mã rạp ${id}`, ten_rap);
        return res;
      } else {
        throw new HttpException('Vui Lòng Điền Thông Tin Cần Cập Nhật', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Không Tìm Thấy Mã Rạp Phim', HttpStatus.NOT_FOUND)
    }
  }

  async getGheVaLichChieu(id: number): Promise<typesResponse<any>> {
    const checkMaRap = await prisma.rapPhim.findFirst({ where: { ma_rap: id } });
    if (checkMaRap) {
      const data = await prisma.rapPhim.findFirst({ where: { ma_rap: id }, include: { LichChieu: true, Ghe: true } })
      const res = new Response(200, `Lấy Thông Tin Ghé và Lịch Chiếu Mã Phòng ${id}`, data);
      return res;
    } else {
      throw new HttpException('Không Tìm Thấy Mã Rạp Phim', HttpStatus.NOT_FOUND)
    }
  }

  async postGhe(id: number, body: CreateGheEntity): Promise<typesResponse<Ghe>> {
    const checkMaRap = await prisma.rapPhim.findFirst({ where: { ma_rap: id } });
    if (checkMaRap) {
      const { ma_ghe, ten_ghe, loai_ghe, da_dat, ty_le_gia_ve } = body;
      if (ma_ghe && ten_ghe && loai_ghe && da_dat && ty_le_gia_ve) {
        const newData = { ma_ghe, ten_ghe, loai_ghe, ma_rap: id, da_dat, ty_le_gia_ve };
        await prisma.ghe.create({ data: newData });
        const res = new Response(201, `Tạo Thành Công Ghế Của Mã Rạp ${id}`, newData);
        return res;
      } else {
        throw new HttpException('Vui Lòng Điền Thông Tin Cần Tạo', HttpStatus.BAD_REQUEST)
      }
    } else {
      throw new HttpException('Không Tìm Thấy Mã Rạp Phim', HttpStatus.NOT_FOUND)
    }
  }

  async deleteGhe(id: number): Promise<typesResponse<any>> {
    const checkMaGhe = await prisma.ghe.findFirst({ where: { ma_ghe: id } });
    if (checkMaGhe) {
      await prisma.ghe.delete({ where: { ma_ghe: id } });
      const res = new Response(202, `Xóa Thành Công Mã Ghế ${id}`, null);
      return res;
    } else {
      throw new HttpException('Không Tìm Thấy Mã Ghế', HttpStatus.NOT_FOUND);
    }
  }
}
