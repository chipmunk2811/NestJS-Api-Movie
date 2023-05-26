import { HttpException, HttpStatus, Injectable, UploadedFile } from '@nestjs/common';
import { UpdateQuanLyPhimDto } from './dto/update-quan-ly-phim.dto';
import { Response, typesResponse } from 'src/utils/response';
import { Phim, PrismaClient } from '@prisma/client';
import { CreateQuanLyPhimDto } from './dto/create-quan-ly-phim.dto';
import { CreateQuanLyPhimEntity, SearchTenPhim } from './entities/quan-ly-phim.entity';
import * as fs from 'fs';

const prisma = new PrismaClient();
@Injectable()
export class QuanLyPhimService {
  async getPhim(tenPhim: SearchTenPhim | any): Promise<typesResponse<Phim[]>> {
    if (tenPhim) {
      const data = await prisma.phim.findMany({ where: { ten_phim: { contains: tenPhim } } });
      const res = new Response(200, "Lấy Danh Sách Tất Cả Phim Theo Tên Phim Tìm Kiếm", data);
      return res;
    } if (!tenPhim || tenPhim == '') {
      const data = await prisma.phim.findMany();
      const res = new Response(200, "Lấy Danh Sách Tất Cả Phim", data);
      return res;
    } else {
      throw new HttpException('Không Tìm Thấy Thông Tin', HttpStatus.NOT_FOUND);
    }
  }

  async getDetailPhim(id: number): Promise<typesResponse<Phim>> {
    const data = await prisma.phim.findFirst({ where: { ma_phim: id }, include: { LichChieu: true, Banner: true } });
    if (data) {
      const res = new Response(200, "Lấy Thành Công Phim Và Lịch Chiếu", data);
      return res;
    } else {
      throw new HttpException('Không Tìm Thấy Thông Tin', HttpStatus.NOT_FOUND);
    }

  }

  async postPhim(body: CreateQuanLyPhimDto | any, @UploadedFile() file: Express.Multer.File): Promise<typesResponse<CreateQuanLyPhimEntity>> {
    try {
      let { ten_phim, trailer, dang_chieu, quoc_gia, dien_vien, the_loai, dao_dien, thoi_luong, danh_gia, mo_ta, hot } = body;
      thoi_luong = Number(thoi_luong);
      danh_gia = Number(danh_gia);
      hot = Number(hot);
      if (dang_chieu === 'true') {
        dang_chieu = true
      } else {
        dang_chieu = false
      }
      if (ten_phim && trailer && quoc_gia && dien_vien && the_loai && dao_dien && danh_gia && mo_ta && hot && file) {
        const hinh_anh = `http://103.97.124.164:3200/public/imgs/Picture Movie/${file.filename}`;
        const ngay_khoi_chieu = new Date(body.ngay_khoi_chieu);
        const newData = { ten_phim, trailer, ngay_khoi_chieu, dang_chieu, quoc_gia, dien_vien, the_loai, dao_dien, thoi_luong, danh_gia, mo_ta, hot, hinh_anh };
        await prisma.phim.create({ data: newData });
        const res = new Response(201, "Tạo Mới Thành Công Phim", newData);
        return res;
      } else {
        throw new HttpException('Vui Lòng Điền Thông Tin Cần Tạo', HttpStatus.BAD_REQUEST)
      }
    } catch (error) {
      fs.unlinkSync(process.cwd() + '/public/imgs/Picture Movie/' + file.filename);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateQuanLyPhimDto: UpdateQuanLyPhimDto | any, @UploadedFile() file: Express.Multer.File): Promise<typesResponse<any>> {
    try {
      const checkMaPhim = await prisma.phim.findFirst({ where: { ma_phim: id } });
      if (checkMaPhim) {
        let { ten_phim, trailer, dang_chieu, quoc_gia, dien_vien, the_loai, dao_dien, thoi_luong, danh_gia, mo_ta, hot, ngay_khoi_chieu } = updateQuanLyPhimDto;
        let message = "Cập Nhật Thành Công Phim";
        let newData: any = {};
        console.log(ten_phim, trailer, dang_chieu, quoc_gia, dien_vien, the_loai, dao_dien, thoi_luong, danh_gia, mo_ta, hot, ngay_khoi_chieu)
        if (ten_phim) {
          newData = { ...newData, ten_phim };
        } if (trailer) {
          newData = { ...newData, trailer };
        } if (ngay_khoi_chieu) {
          const ngay_khoi_chieu = new Date(updateQuanLyPhimDto.ngay_khoi_chieu);
          newData = { ...newData, ngay_khoi_chieu };
        } if (dang_chieu) {
          if (dang_chieu === 'true') {
            dang_chieu = true
          } else {
            dang_chieu = false
          }
          newData = { ...newData, dang_chieu };
        } if (quoc_gia) {
          newData = { ...newData, quoc_gia };
        } if (dien_vien) {
          newData = { ...newData, dien_vien };
        } if (the_loai) {
          newData = { ...newData, the_loai };
        } if (dao_dien) {
          newData = { ...newData, dao_dien };
        } if (thoi_luong) {
          thoi_luong = Number(thoi_luong);
          newData = { ...newData, thoi_luong };
        } if (danh_gia) {
          danh_gia = Number(danh_gia);
          newData = { ...newData, thoi_luong };
        } if (mo_ta) {
          newData = { ...newData, mo_ta };
        } if (hot) {
          hot = Number(hot);
          newData = { ...newData, hot };
        } if (file) {
          const data = await prisma.phim.findFirst({ where: { ma_phim: id } });
          let xoa_anh = data.hinh_anh;
          xoa_anh = xoa_anh.slice(26);
          fs.unlinkSync(process.cwd() + xoa_anh);
          const hinh_anh = `http://103.97.124.164:3200/public/imgs/Picture Movie/${file.filename}`;
          newData = { ...newData, hinh_anh }
          message += ' Và Cập Nhật Hình Ảnh';
        }
        await prisma.phim.update({ where: { ma_phim: id }, data: newData });
        const res = new Response(202, message, newData);
        return res;
      } else {
        throw new HttpException(`Không Tìm Thấy Mã Phim ${id}`, HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number): Promise<typesResponse<Phim>> {
    const checkMaPhim = await prisma.phim.findFirst({ where: { ma_phim: id } });
    if (checkMaPhim) {
      let xoa_anh = checkMaPhim.hinh_anh;
      xoa_anh = xoa_anh.slice(26);
      fs.unlinkSync(process.cwd() + xoa_anh);
      await prisma.phim.delete({ where: { ma_phim: id } });
      const res = new Response(202, `Đã Xóa Mã Phim ${id}`, checkMaPhim);
      return res;
    } else {
      throw new HttpException(`Không Tìm Thấy Mã Phim`, HttpStatus.NOT_FOUND);
    }
  }
}
