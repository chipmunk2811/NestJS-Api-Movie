import { Module } from '@nestjs/common';
import { QuanLyLichChieuService } from './quan-ly-lich-chieu.service';
import { QuanLyLichChieuController } from './quan-ly-lich-chieu.controller';

@Module({
  controllers: [QuanLyLichChieuController],
  providers: [QuanLyLichChieuService]
})
export class QuanLyLichChieuModule {}
