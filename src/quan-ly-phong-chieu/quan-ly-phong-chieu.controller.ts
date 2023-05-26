import { Controller, Get, Post, Body, Param, Delete, Query, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { QuanLyPhongChieuService } from './quan-ly-phong-chieu.service';
import { CreateQuanLyPhongChieuDto } from './dto/create-quan-ly-phong-chieu.dto';
import { UpdateQuanLyPhongChieuDto } from './dto/update-quan-ly-phong-chieu.dto';
import { CreateGheEntity } from './entities/quan-ly-phong-chieu.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản Lý Rạp Chiếu Phim Và Ghế Trong Rạp Chiếu')
@Controller('/api/QuanLyPhongChieu')
export class QuanLyPhongChieuController {
  constructor(private readonly quanLyPhongChieuService: QuanLyPhongChieuService) { }

  // Phòng chiếu
  @ApiOperation({ summary: 'Lấy Thông Tin Các Rạp Chiếu Phim', description: 'Lấy Thông Tin Có Bao Nhiêu Phòng Chiếu Của Cụm Rạp' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-PhongChieu/:ma_cum_rap')
  getRapPhim(@Param('ma_cum_rap') id: number) {
    try {
      return this.quanLyPhongChieuService.getRapPhim(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Thêm Các Rạp Chiếu Phim Mới', description: 'Lưu Ý: ma_rap Sẽ bắt Đầu Là ma_cum_rap Kết Nối Với Hàng Chục' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateQuanLyPhongChieuDto, description: 'Tạo Mới Rạp Phim' })
  @Post('/Post-PhongChieu/:ma_cum_rap')
  postRapPhim(@Param('ma_cum_rap') id: number, @Body() body: CreateQuanLyPhongChieuDto) {
    try {
      return this.quanLyPhongChieuService.postRapPhim(+id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Cập Nhật Rạp Chiếu Phim', description: 'Cập Nhật Tên Của Rạp Phim' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: UpdateQuanLyPhongChieuDto, description: 'Cập Nhật Thông Tin' })
  @Put('/Put-PhongChieu/:ma_rap')
  putRapPhim(@Param('ma_rap') id: string, @Body() body: UpdateQuanLyPhongChieuDto) {
    try {
      return this.quanLyPhongChieuService.putRapPhim(+id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Lấy ghế, lịch chiếu
  @ApiOperation({ summary: 'Lấy Thông Tin Các Ghế Trong Rạp Và Kèm Lịch Chiếu', description: 'Lấy Thông Tin Các Ghé Và Kèm Lịch Chiếu Của Rạp' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Get('/Get-GheVaLichChieu/:ma_rap')
  getGheVaLichChieu(@Param('ma_rap') id: number) {
    try {
      return this.quanLyPhongChieuService.getGheVaLichChieu(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Thêm Các Ghế Mới', description: 'Thêm Ghế Cho Phòng Chiếu, ma_ghe Bắt Đầu Bằng ma_rap Kết Nối Với Hàng Trăm'})
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateGheEntity, description: 'Thêm Ghế' })
  @Post('/Post-Ghe/:ma_rap')
  postGhe(@Param('ma_rap') id: number, @Body() body: CreateGheEntity) {
    try {
      return this.quanLyPhongChieuService.postGhe(+id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Xóa Ghế', description: 'Ghế Sẽ Bị Xóa'})
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Delete('/Delete-Ghe/:ma_ghe')
  deleteGhe(@Param('ma_ghe') id: number) {
    try {
      return this.quanLyPhongChieuService.deleteGhe(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
