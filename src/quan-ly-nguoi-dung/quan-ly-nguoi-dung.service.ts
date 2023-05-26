import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateQuanLyNguoiDungDto, CreateQuanTriDto } from './dto/create-quan-ly-nguoi-dung.dto';
import { UpdateQuanLyNguoiDungDto, UpdateQuanTriDto } from './dto/update-quan-ly-nguoi-dung.dto';
import { NguoiDung, PrismaClient } from '@prisma/client';
import { Response, typesResponse } from 'src/utils/response';
import * as bcrypt from 'bcrypt';
import { LoginEntity } from './entities/quan-ly-nguoi-dung.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient();

@Injectable()
export class QuanLyNguoiDungService {
  constructor(private jwtService: JwtService, private configService: ConfigService) { }

  async create(createQuanLyNguoiDungDto: CreateQuanLyNguoiDungDto): Promise<typesResponse<CreateQuanLyNguoiDungDto>> {
    let { tai_khoan, ho_ten, email, so_dt, mat_khau } = createQuanLyNguoiDungDto;
    const checkTK = await prisma.nguoiDung.findFirst({ where: { tai_khoan } });
    if (!checkTK) {
      mat_khau = await bcrypt.hashSync(mat_khau, 10);
      const newData = { tai_khoan, ho_ten, email, so_dt, mat_khau };
      await prisma.nguoiDung.create({ data: newData });
      const res = new Response(201, 'Đăng Ký Thành Công', newData)
      return res;
    } else {
      throw new HttpException('Mã Tài Khoản Đã Tồn Tại', HttpStatus.BAD_REQUEST);
    }
  }

  async login(body: LoginEntity): Promise<typesResponse<NguoiDung>> {
    const { tai_khoan, mat_khau } = body;
    const checkTK = await prisma.nguoiDung.findFirst({ where: { tai_khoan } });
    if (checkTK) {
      const checkMatKhau = await bcrypt.compareSync(mat_khau, checkTK.mat_khau);
      if (checkMatKhau) {
        const res = new Response(202, 'Đăng Nhập Thành Công', checkTK)
        return res;
      } else {
        throw new HttpException('Mật Khẩu Không Chính Xác', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Mã Tài Khoản Không Tồn Tại', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateQuanLyNguoiDungDto: UpdateQuanLyNguoiDungDto): Promise<typesResponse<any>> {
    let { ho_ten, email, so_dt, mat_khau_cu, mat_khau_moi } = updateQuanLyNguoiDungDto;
    const checkData = await prisma.nguoiDung.findFirst({ where: { tai_khoan: id } });
    if (checkData) {
      if (ho_ten || email || so_dt || mat_khau_cu) {
        if (mat_khau_cu && mat_khau_moi) {
          const checkMatKhau = await bcrypt.compareSync(mat_khau_cu, checkData.mat_khau);
          if (checkMatKhau) {
            mat_khau_moi = await bcrypt.hashSync(mat_khau_moi, 10);
          } else {
            throw new HttpException('Mã Khẩu Cũ Không Chính Xác', HttpStatus.BAD_REQUEST);
          }
        }
        const newData = { ho_ten, email, so_dt, mat_khau: mat_khau_moi };
        await prisma.nguoiDung.update({ where: { tai_khoan: id }, data: newData });
        const res = new Response(202, `Cập Nhật Thành Công Tài Khoản ${id}`, newData)
        return res;
      } else {
        throw new HttpException('Điền Thông Tin Cần Cập Nhật', HttpStatus.BAD_REQUEST);
      }


    } else {
      throw new HttpException('Mã Tài Khoản Không Tồn Tại', HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<typesResponse<any>> {
    const checkTK = await prisma.nguoiDung.findFirst({ where: { tai_khoan: id } });
    console.log(checkTK);
    if (checkTK) {
      await prisma.nguoiDung.delete({ where: { tai_khoan: id } });
      const res = new Response(202, `Xóa Thành Công Tài Khoản ${id}`, checkTK)
      return res;
    } else {
      throw new HttpException('Mã Tài Khoản Không Tồn Tại', HttpStatus.NOT_FOUND);
    }
  }

  async createAdmin(createQuanLyNguoiDungDto: CreateQuanTriDto): Promise<typesResponse<NguoiDung>> {
    let { tai_khoan, ho_ten, email, so_dt, mat_khau, loai_nguoi_dung } = createQuanLyNguoiDungDto;
    const checkTK = await prisma.nguoiDung.findFirst({ where: { tai_khoan } });
    if (!checkTK) {
      mat_khau = await bcrypt.hashSync(mat_khau, 10);
      let newData: any = { tai_khoan, ho_ten, email, so_dt, mat_khau, loai_nguoi_dung };
      const token = await this.jwtService.signAsync({ data: newData }, { expiresIn: "365d", secret: this.configService.get("SECRET_KEY") });
      newData = { ...newData, accessToken: token }
      await prisma.nguoiDung.create({ data: newData });
      const res = new Response(201, 'Thêm Mới Quản Trị Thành Công', newData)
      return res;
    } else {
      throw new HttpException('Mã Tài Khoản Đã Tồn Tại', HttpStatus.BAD_REQUEST);
    }
  }

  async updateAdmin(id: string, updateQuanLyNguoiDungDto: UpdateQuanTriDto): Promise<typesResponse<any>> {
    let { ho_ten, email, so_dt, loai_nguoi_dung, mat_khau_cu, mat_khau_moi } = updateQuanLyNguoiDungDto;
    const checkData = await prisma.nguoiDung.findFirst({ where: { tai_khoan: id } });
    if (checkData) {
      if (ho_ten || email || so_dt || mat_khau_cu || loai_nguoi_dung) {
        if (mat_khau_cu && mat_khau_moi) {
          const checkMatKhau = await bcrypt.compareSync(mat_khau_cu, checkData.mat_khau);
          if (checkMatKhau) {
            mat_khau_moi = await bcrypt.hashSync(mat_khau_moi, 10);
          } else {
            throw new HttpException('Mã Khẩu Cũ Không Chính Xác', HttpStatus.BAD_REQUEST);
          }
        }
        const newData = { ho_ten, email, so_dt,loai_nguoi_dung, mat_khau: mat_khau_moi };
        await prisma.nguoiDung.update({ where: { tai_khoan: id }, data: newData });
        const res = new Response(202, `Cập Nhật Thành Công Tài Khoản ${id}`, newData)
        return res;
      } else {
        throw new HttpException('Điền Thông Tin Cần Cập Nhật', HttpStatus.BAD_REQUEST);
      }


    } else {
      throw new HttpException('Mã Tài Khoản Không Tồn Tại', HttpStatus.NOT_FOUND);
    }
  }
}
