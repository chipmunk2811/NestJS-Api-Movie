import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CumRap, HeThongRap, PrismaClient } from '@prisma/client';
import { Response, typesResponse } from 'src/utils/response';
import { SearchTenCumRap, SearchTenHeThong, typesPostHeThongRap } from './entities/quan-ly-rap.entity';
import * as fs from 'fs';
import { isNullOrUndefined } from 'util';
import { CreateQuanLyCumRapDto, CreateQuanLyHeThongRapDto } from './dto/create-quan-ly-rap.dto';
import { UpdateQuanLyCumRapDto, UpdateQuanLyHeThongRapDto } from './dto/update-quan-ly-rap.dto';

const prisma = new PrismaClient()
@Injectable()
export class QuanLyRapService {

  // Hệ Thống
  async getHeThongRap(body: SearchTenHeThong | any): Promise<typesResponse<HeThongRap[]>> {
    if (body) {
      const data: HeThongRap[] = await prisma.heThongRap.findMany({ where: { ten_he_thong_rap: { contains: body } }, include: { CumRap: true } });
      const res = new Response(200, `Thông Tin Hệ Thống ${body.toUpperCase()} Và Các Rạp Của Hệ Thống`, data)
      return res;
    } if (!body || body == '') {
      const data: HeThongRap[] = await prisma.heThongRap.findMany();
      const res = new Response(200, 'Thông Tin Hệ Thống Rạp Phim', data)
      return res;
    } else {
      throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);
    }
  }

  async postHeThongRap(file: Express.Multer.File, body: CreateQuanLyHeThongRapDto): Promise<typesResponse<typesPostHeThongRap>> {
    const { ten_he_thong_rap } = body;
    if (ten_he_thong_rap && file) {
      const newData = {
        ten_he_thong_rap,
        logo: `http://103.97.124.164:3200/public/imgs/logo/${file.filename}`
      }
      await prisma.heThongRap.create({ data: newData })
      const res = new Response(201, 'Đã Thêm Mới Thành Công Hệ Thống Rạp', newData)
      return res;
    } else {
      fs.unlinkSync(process.cwd() + '/public/imgs/logo/' + file.filename)
      throw new HttpException("Vui Lòng Điền Tên Rạp Và File Logo", HttpStatus.BAD_REQUEST);
    }
  }


  async update(ma_he_thong_rap: number, body: UpdateQuanLyHeThongRapDto, file: Express.Multer.File): Promise<typesResponse<any>> {
    const data = await prisma.heThongRap.findFirst({ where: { ma_he_thong_rap } });
    if (data) {
      const { ten_he_thong_rap } = body;
      const checkFile = isNullOrUndefined(file);
      let message = "Vui Lòng Điền Tên Rạp Hoặc File Logo";
      if (!checkFile) {
        let logo = data.logo;
        logo = logo.slice(26);
        fs.unlinkSync(process.cwd() + logo);
        const filName = `http://103.97.124.164:3200/public/imgs/logo/${file.filename}`;
        await prisma.heThongRap.update({ where: { ma_he_thong_rap }, data: { logo: filName } });
        message = `Đã cập nhật mã hệ thống rạp ${ma_he_thong_rap}`;
      } if (ten_he_thong_rap) {
        await prisma.heThongRap.update({ where: { ma_he_thong_rap }, data: { ten_he_thong_rap } });
        message = `Đã cập nhật mã hệ thống rạp ${ma_he_thong_rap}`;
      }
      const res = new Response(202, message, null)
      return res;
    } else {
      throw new HttpException('Không Tìm Thấy Mã Hệ Thống Rạp', HttpStatus.NOT_FOUND);
    }
  }

  //  Cụm rạp
  async getCumRap(id: number, body: SearchTenCumRap | any): Promise<typesResponse<CumRap[]>> {
    if (body) {
      const data = await prisma.cumRap.findMany({ where: { ma_he_thong_rap: id, ten_cum_rap: { contains: body } }, include: { HeThongRap: true } });
      const { ten_he_thong_rap } = await prisma.heThongRap.findFirst({ where: { ma_he_thong_rap: id } });
      const res = new Response(200, `Thông Tin Hệ Thống Rạp ${ten_he_thong_rap}`, data)
      return res;
    } if (!body || body == '') {
      const data = await prisma.cumRap.findMany({ where: { ma_he_thong_rap: id }, include: { HeThongRap: true } });
      const { ten_he_thong_rap } = await prisma.heThongRap.findFirst({ where: { ma_he_thong_rap: id } });
      const res = new Response(200, `Thông Tin Hệ Thống Rạp ${ten_he_thong_rap}`, data)
      return res;
    } else {
      throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);
    }
  }

  async postCumRap(id: number, body: CreateQuanLyCumRapDto): Promise<typesResponse<CumRap>> {
    const checkHeThong = await prisma.heThongRap.findFirst({ where: { ma_he_thong_rap: id } });
    if (checkHeThong) {
      const { ma_cum_rap, ten_cum_rap, dia_chi } = body;
      const checkMaCum = await prisma.cumRap.findFirst({ where: { ma_cum_rap } });
      if (checkMaCum) {
        throw new HttpException('Mã Cụm Rạp Đã Tồn Tại', HttpStatus.BAD_REQUEST);
      } else {
        if (ma_cum_rap && ten_cum_rap && dia_chi) {
          const newData = { ma_cum_rap, ten_cum_rap, dia_chi, ma_he_thong_rap: id };
          await prisma.cumRap.create({ data: newData });
          const res = new Response(201, `Đã Tạo Thành Công Cụm Rạp`, newData);
          return res;
        } else {
          throw new HttpException('Vui Lòng Điền Đầy Đủ Thông Tin Cần Tạo', HttpStatus.BAD_REQUEST);
        }
      }
    } else {
      throw new HttpException('Không tìm thấy mã hệ thống', HttpStatus.NOT_FOUND);
    }
  }

  async putCumRap(id: number, body: UpdateQuanLyCumRapDto): Promise<typesResponse<any>> {
    const checkMaCum = await prisma.cumRap.findFirst({ where: { ma_cum_rap: id } });
    if (checkMaCum) {
      const { ten_cum_rap, dia_chi } = body;
      if (ten_cum_rap || dia_chi) {
        const newData = { ten_cum_rap, dia_chi };
        await prisma.cumRap.update({ where: { ma_cum_rap: id }, data: newData });
        const res = new Response(202, `Đã Cập Nhật Thành Công Cụm Rạp ${id}`, newData);
        return res;
      } else {
        throw new HttpException('Điền Nội Dung Cần Cập Nhật', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Mã Cụm Không Tồn Tại', HttpStatus.NOT_FOUND);
    }
  }
}
