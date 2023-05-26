import { PartialType } from '@nestjs/mapped-types';
import { CreateQuanLyDatVeDto } from './create-quan-ly-dat-ve.dto';

export class UpdateQuanLyDatVeDto extends PartialType(CreateQuanLyDatVeDto) {}
