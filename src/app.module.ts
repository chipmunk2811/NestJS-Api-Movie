import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuanLyHeThongRapModule } from './quan-ly-he-thong-rap/quan-ly-he-thong-rap.module';
import { QuanLyPhimModule } from './quan-ly-phim/quan-ly-phim.module';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { QuanLyDatVeModule } from './quan-ly-dat-ve/quan-ly-dat-ve.module';
import { QuanLyPhongChieuModule } from './quan-ly-phong-chieu/quan-ly-phong-chieu.module';
import { QuanLyLichChieuModule } from './quan-ly-lich-chieu/quan-ly-lich-chieu.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [QuanLyHeThongRapModule, QuanLyPhimModule, QuanLyNguoiDungModule, QuanLyDatVeModule, QuanLyPhongChieuModule, QuanLyLichChieuModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
