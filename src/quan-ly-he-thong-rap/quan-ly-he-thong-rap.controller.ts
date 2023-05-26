import { Controller, Get, Post, Body, Param, Query, UseInterceptors, UploadedFile, Put, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-he-thong-rap.service';
import { SearchTenCumRap, SearchTenHeThong } from './entities/quan-ly-rap.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuanLyCumRapDto, CreateQuanLyHeThongRapDto } from './dto/create-quan-ly-rap.dto';
import { UpdateQuanLyCumRapDto, UpdateQuanLyHeThongRapDto } from './dto/update-quan-ly-rap.dto';
import { AuthGuard } from '@nestjs/passport';


@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: process.cwd() + '/public/imgs/logo',
    filename: (req, file, callback) => callback(null, Date.now() + '_' + file.originalname)
  })
}))

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản Lý Hệ Thống Rạp Và Cụm Rạp')
@Controller('/api/QuanLyHeThongRap')
export class QuanLyRapController {
  constructor(private readonly quanLyRapService: QuanLyRapService) { }

  // Hệ Thống Rạp
  @ApiOperation({ summary: 'Lấy Thông Tin Các Hệ Thống Rạp', description: 'Cung Cấp Các Thông Tin Hệ Thống Rạp Và Khi Tìm Kiếm Hệ Thống Cụ Thể Sẽ Cung Cấp Thêm Thông Tin Các Cụm Rạp' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-HeThongRap')
  getHeThongRap(@Query('tenHeThong') body: SearchTenHeThong) {
    try {
      return this.quanLyRapService.getHeThongRap(body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Thêm Các Hệ Thống Rạp Mới', description: 'Lưu Ý: Điền Đầy Đủ Thông Tin Trong Body' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateQuanLyHeThongRapDto, description: 'Tạo Hệ Thống Mới' })
  @Post('/Post-HeThongRap')
  postHeThongRap(@UploadedFile() file: Express.Multer.File, @Body() body: CreateQuanLyHeThongRapDto) {
    try {
      return this.quanLyRapService.postHeThongRap(file, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Cập Nhật Các Hệ Thống Rạp', description: 'Có Thể Cập Nhật Từng Thông Tin Nhưng Mã Hệ Thống Phải Chính Xác' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: true, type: UpdateQuanLyHeThongRapDto, description: 'Cập Nhật Thông Tin Hệ Thống' })
  @Put('/Update-HeThongRap/:ma_he_thong_rap')
  update(@Param('ma_he_thong_rap') ma_he_thong_rap: number, @Body() body: UpdateQuanLyHeThongRapDto, @UploadedFile() file: Express.Multer.File) {
    try {
      return this.quanLyRapService.update(+ma_he_thong_rap, body, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Cụm Rạp
  @ApiOperation({ summary: 'Lấy Thông Tin Các Cụm Rạp', description: 'Cung Cấp Các Thông Tin Cụm Rạp Và Tìm Kiếm Tên Các Cụm Rạp' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-CumRap/:ma_he_thong_rap')
  getCumRap(@Query('ten_cum_rap') body: SearchTenCumRap, @Param('ma_he_thong_rap') id: number) {
    try {
      return this.quanLyRapService.getCumRap(+id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Thêm Các Cụm Rạp Mới', description: 'Lưu Ý: ma_cum_rap Sẽ Bắt Đầu Là ma_he_thong_rap Ghép Với Số Hàng Chục (VD: CGV-Hùng Vương ma_cum_rap Là 208 Số 2 Là ma_he_thong_rap: 2 Của CGV)' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiBody({ required: true, type: CreateQuanLyCumRapDto, description: 'Tạo Mới Cụm Rạp' })
  @Post('/Post-CumRap/:ma_he_thong_rap')
  postCumRap(@Body() body: CreateQuanLyCumRapDto, @Param('ma_he_thong_rap') id: number) {
    try {
      return this.quanLyRapService.postCumRap(+id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Cập Nhật Các Cụm Rạp', description: 'Có Thể Cập Nhật Từng Thông Tin Nhưng Mã Cụm Rạp Phải Chính Xác' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiBody({ required: false, type: UpdateQuanLyCumRapDto, description: 'Cập Nhật Thông Tin Cụm Rạp' })
  @Put('/Put-CumRap/:ma_cum_rap')
  putCumRap(@Param('ma_cum_rap') id: number, @Body() body: UpdateQuanLyCumRapDto) {
    try {
      return this.quanLyRapService.putCumRap(+id, body);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

}
