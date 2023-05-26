import { Controller, Get, Post, Body, Param, Delete, HttpStatus, HttpException, Put, Query, UseGuards } from '@nestjs/common';
import { QuanLyLichChieuService } from './quan-ly-lich-chieu.service';
import { CreateQuanLyLichChieuDto } from './dto/create-quan-ly-lich-chieu.dto';
import { UpdateQuanLyLichChieuDto } from './dto/update-quan-ly-lich-chieu.dto';
import { DeleteMany, GetLichChieuTheoMaPhimVaMaCumRap } from './entities/quan-ly-lich-chieu.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản Lý Lịch Chiếu Phim')
@Controller('/api/QuanLyLichChieu')
export class QuanLyLichChieuController {
  constructor(private readonly quanLyLichChieuService: QuanLyLichChieuService) { }

  @ApiOperation({ summary: 'Lấy Thông Tin Lịch Chiếu Theo Mã Phim', description: 'Lấy Thông Tin Lịch Chiếu Theo Mã Phim' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-LichChieuTheoMaPhim/:ma_phim')
  getLichChieuTheoMaPhim(@Param('ma_phim') id: number) {
    try {
      return this.quanLyLichChieuService.getLichChieuTheoMaPhim(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Lấy Thông Tin Lịch Chiếu Theo Mã Cụm Rạp', description: 'Lấy Thông Tin Lịch Chiếu Theo Mã Cụm Rạp' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-LichChieuTheoMaCumRap/:ma_cum_rap')
  getLichChieuTheoMaCumRap(@Param('ma_cum_rap') id: number) {
    try {
      return this.quanLyLichChieuService.getLichChieuTheoMaCumRap(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Lấy Thông Tin Lịch Chiếu Theo Mã Phim Và Mã Cụm Rạp', description: 'Lấy Thông Tin Lịch Chiếu Theo Mã Phim Và Mã Cụm Rạp' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: GetLichChieuTheoMaPhimVaMaCumRap, description: 'Tìm Kiếm Lịch Chiếu' })
  @Post('/Get-LichChieuTheoMaPhimVaMaCumRap')
  getLichChieuTheoMaPhimVaMaCumRap(@Body() body: GetLichChieuTheoMaPhimVaMaCumRap) {
    try {
      return this.quanLyLichChieuService.getLichChieuTheoMaPhimVaMaCumRap(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Tạo Lịch Chiếu Mới', description: 'Lưu Ý: Dữ Liệu Ngày (VD: 2023-05-25T06:30:00Z)' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateQuanLyLichChieuDto, description: 'Tạo Lịch Chiếu' })
  @Post('/Post-LichChieu')
  postLichChieu(@Body() createQuanLyLichChieuDto: CreateQuanLyLichChieuDto) {
    try {
      return this.quanLyLichChieuService.postLichChieu(createQuanLyLichChieuDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Cập Nhật Lịch Chiếu', description: 'Lưu Ý: Dữ Liệu Ngày (VD: 2023-05-25T06:30:00Z)' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: UpdateQuanLyLichChieuDto, description: 'Cập Nhật Thông Tin' })
  @Put('/Patch-LichChieu/:ma_lich_chieu')
  update(@Param('ma_lich_chieu') id: number, @Body() updateQuanLyLichChieuDto: UpdateQuanLyLichChieuDto) {
    try {
      return this.quanLyLichChieuService.update(+id, updateQuanLyLichChieuDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Xóa Lịch Chiếu', description: 'Xóa Lịch Chiếu' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Delete('/Delete-LichChieu/:ma_lich_chieu')
  remove(@Param('ma_lich_chieu') id: number) {
    try {
      return this.quanLyLichChieuService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Xóa Nhiều Lịch Chiếu', description: 'Xóa Nhiều Lịch Chiếu' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Delete('/Delete-LichChieuMany')
  @ApiBody({ required: true, type: DeleteMany, description: 'Xóa Cùng Lúc' })
  removeMany(@Body() body: DeleteMany) {
    try {
      return this.quanLyLichChieuService.removeMany(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
