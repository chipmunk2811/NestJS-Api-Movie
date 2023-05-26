import { Module } from '@nestjs/common';
import { QuanLyRapService } from './quan-ly-he-thong-rap.service';
import { QuanLyRapController } from './quan-ly-he-thong-rap.controller';

@Module({
  controllers: [QuanLyRapController],
  providers: [QuanLyRapService]
})
export class QuanLyHeThongRapModule {}
