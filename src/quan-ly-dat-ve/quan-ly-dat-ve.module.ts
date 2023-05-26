import { Module } from '@nestjs/common';
import { QuanLyDatVeService } from './quan-ly-dat-ve.service';
import { QuanLyDatVeController } from './quan-ly-dat-ve.controller';

@Module({
  controllers: [QuanLyDatVeController],
  providers: [QuanLyDatVeService]
})
export class QuanLyDatVeModule {}
