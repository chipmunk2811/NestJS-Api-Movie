import { Controller, Get, Post, Body, Put, Param, Delete, Query, UseInterceptors, UploadedFile, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { QuanLyPhimService } from './quan-ly-phim.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateQuanLyPhimDto } from './dto/create-quan-ly-phim.dto';
import { UpdateQuanLyPhimDto } from './dto/update-quan-ly-phim.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchTenPhim } from './entities/quan-ly-phim.entity';
import { AuthGuard } from '@nestjs/passport';


@UseInterceptors(FileInterceptor('file', {
  storage: diskStorage({
    destination: process.cwd() + '/public/imgs/Picture Movie',
    filename: (req, file, callback) => callback(null, Date.now() + '_' + file.originalname)
  })
}))

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Quản Lý Phim')
@Controller('/api/QuanLyPhim')
export class QuanLyPhimController {
  constructor(private readonly quanLyPhimService: QuanLyPhimService) { }

  @ApiOperation({ summary: 'Lấy Thông Tin Phim', description: 'Lấy Thông Tin Phim Và Tìm Kiếm Phim Theo Tên' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-PhimVaTimKiemPhim')
  getPhim(@Query('tenPhim') tenPhim: SearchTenPhim) {
    try {
      return this.quanLyPhimService.getPhim(tenPhim);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Lấy Thông Tin Lịch Chiếu Theo Phim', description: 'Lấy Tất Cả Lịch Chiếu Theo Mã Phim' })
  @ApiResponse({ status: 200, description: 'statusCode, message, data' })
  @Get('/Get-ChiTietPhimVaLichChieu/:ma_phim')
  getDetailPhim(@Param('ma_phim') id: number) {
    try {
      return this.quanLyPhimService.getDetailPhim(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Thêm Mới Phim', description: 'Chú Ý: Các Kiểu Dữ Liệu, Thời Lượng Không Bắt Buộc Thêm Cùng Dữ Liệu Và Hot Là Vị Trí Sắp Xếp Thứ Tự Ưu Tiên Của Phim' })
  @ApiResponse({ status: 201, description: 'statusCode, message, data' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: true, type: CreateQuanLyPhimDto, description: 'Tạo Mới Phim' })
  @Post('/Post-Phim')
  postPhim(@Body() body: CreateQuanLyPhimDto, @UploadedFile() file: Express.Multer.File) {
    try {
      return this.quanLyPhimService.postPhim(body, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Cập Nhật Thông Tin Cho Phim', description: 'Chú Ý: Các Kiểu Dữ Liệu, Hot Là Vị Trí Sắp Xếp Thứ Tự Ưu Tiên Của Phim Và Xóa Dữ Liệu Ngày Khi Không Cần Cập Nhật' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ required: true, type: UpdateQuanLyPhimDto, description: 'Cập Nhật Mới Phim' })
  @Put(':ma_phim')
  update(@Param('ma_phim') id: string, @Body() updateQuanLyPhimDto: UpdateQuanLyPhimDto, @UploadedFile() file: Express.Multer.File) {
    try {
      return this.quanLyPhimService.update(+id, updateQuanLyPhimDto, file);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ summary: 'Xóa Mã Phim', description: 'Dữ Liệu Sẽ Bị Mất' })
  @ApiResponse({ status: 202, description: 'statusCode, message, data' })
  @Delete('/Delete-Phim/:ma_phim')
  remove(@Param('ma_phim') id: number) {
    try {
      return this.quanLyPhimService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
