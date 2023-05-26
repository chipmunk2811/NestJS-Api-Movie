import { Module } from '@nestjs/common';
import { QuanLyPhongChieuService } from './quan-ly-phong-chieu.service';
import { QuanLyPhongChieuController } from './quan-ly-phong-chieu.controller';

@Module({
  controllers: [QuanLyPhongChieuController],
  providers: [QuanLyPhongChieuService]
})
export class QuanLyPhongChieuModule {}
