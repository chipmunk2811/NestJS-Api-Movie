import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { CreateQuanLyDatVeDto } from './dto/create-quan-ly-dat-ve.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản Lý Đặt Vé')
@Controller('/api/QuanLyDatVe')
export class QuanLyDatVeController {
  constructor(private readonly quanLyDatVeService: QuanLyDatVeService) { }

  @ApiOperation({ summary: 'Tất Cả Vé Đã Đặt', description: 'Lấy Thông Tin Danh Sách Vé Đã Đặt' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-TatCaDanhSachDatVe')
  getDatVe() {
    try {
      return this.quanLyDatVeService.getDatVe();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Lấy Thông Tin Vé Đã Đặt', description: 'Thông Tin Rạp Phim ' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-ThongTinVeDaDat/:ma_ve')
  findAll(@Param('ma_ve') ma_ve: number) {
    try {
      return this.quanLyDatVeService.findAll(+ma_ve);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Lấy Thông Tin Ghế Đã Đặt Theo Mã Lịch Chiếu', description: 'Danh Sách Ghế Đã Đặt Từ Khách Hàng' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-ThongTinGheDaDat/:ma_lich_chieu')
  findOne(@Param('ma_lich_chieu') id: number) {
    try {
      return this.quanLyDatVeService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Khách Hàng Đặt Vé', description: 'Khi Khách Hàng Đặt Vé Thành Công' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateQuanLyDatVeDto, description: 'Thông Tin Vé' })
  @Post('/Post-DatVe')
  create(@Body() createQuanLyDatVeDto: CreateQuanLyDatVeDto) {
    try {
      return this.quanLyDatVeService.create(createQuanLyDatVeDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @ApiOperation({ summary: 'Khách Hàng Hủy Đặt Vé', description: 'Khi Khách Hàng Hủy Đặt Vé' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Delete('/Delete-DatVe/:ma_ve')
  remove(@Param('ma_ve') id: number) {
    try {
      return this.quanLyDatVeService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
