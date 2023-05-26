import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpException, Query, UseGuards } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { CreateQuanLyNguoiDungDto, CreateQuanTriDto } from './dto/create-quan-ly-nguoi-dung.dto';
import { UpdateQuanLyNguoiDungDto, UpdateQuanTriDto } from './dto/update-quan-ly-nguoi-dung.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginEntity } from './entities/quan-ly-nguoi-dung.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Quản Lý Người Dùng')
@Controller('/api/QuanLyNguoiDung')
export class QuanLyNguoiDungController {
  constructor(private readonly quanLyNguoiDungService: QuanLyNguoiDungService) { }

  @ApiOperation({ summary: 'Đăng Ký Tài Khoản Cho Khách Hàng', description: 'Đăng Ký Tài Khoản Cho Khách Hàng' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateQuanLyNguoiDungDto, description: 'Đăng Ký Người Dùng Là Khách Hàng' })
  @Post('/DangKy')
  create(@Body() createQuanLyNguoiDungDto: CreateQuanLyNguoiDungDto) {
    try {
      return this.quanLyNguoiDungService.create(createQuanLyNguoiDungDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Đăng Nhập Tài Khoản', description: 'Đăng Nhập Tài Khoản' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: LoginEntity, description: 'Đăng Nhập' })
  @Post('/DangNhap')
  login(@Body() body: LoginEntity) {
    try {
      return this.quanLyNguoiDungService.login(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Cập Nhật Thông Tin Tài Khoản', description: 'Cập Nhật Thông Tin Tài Khoản' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: UpdateQuanLyNguoiDungDto, description: 'Thông Tin Cập Nhật' })
  @Put('/Put-CapNhatNguoiDung')
  update(@Query('tai_khoan') id: string, @Body() updateQuanLyNguoiDungDto: UpdateQuanLyNguoiDungDto) {
    try {
      return this.quanLyNguoiDungService.update(id, updateQuanLyNguoiDungDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Xóa Tài Khoản', description: 'Xóa Tài Khoản' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Delete('/Delete-NguoiDung')
  remove(@Query('tai_khoan') id: string) {
    try {
      return this.quanLyNguoiDungService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  // Quản Trị
  @ApiOperation({ summary: 'Thêm Tài Khoản Cho Quản Trị Mới', description: 'Thêm Tài Khoản Cho Quản Trị Mới' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateQuanTriDto, description: 'Thông Tin Quản Trị Viên' })
  @Post('/Post-ThemQuanTri')
  createAdmin(@Body() createQuanLyNguoiDungDto: CreateQuanTriDto) {
    try {
      return this.quanLyNguoiDungService.createAdmin(createQuanLyNguoiDungDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Cập Nhật Tài Khoản Quản Trị', description: 'Cập Nhật Thông Tin Tài Khoản Quản Trị' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: UpdateQuanTriDto, description: 'Thông Tin Cập Nhật' })
  @Put('/Put-CapNhatQuanTri')
  updateAdmin(@Query('tai_khoan') id: string, @Body() updateQuanLyNguoiDungDto: UpdateQuanTriDto) {
    try {
      return this.quanLyNguoiDungService.updateAdmin(id, updateQuanLyNguoiDungDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
