import { Module } from '@nestjs/common';
import { QuanLyNguoiDungService } from './quan-ly-nguoi-dung.service';
import { QuanLyNguoiDungController } from './quan-ly-nguoi-dung.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utils/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [QuanLyNguoiDungController],
  providers: [QuanLyNguoiDungService, JwtStrategy]
})
export class QuanLyNguoiDungModule { }
