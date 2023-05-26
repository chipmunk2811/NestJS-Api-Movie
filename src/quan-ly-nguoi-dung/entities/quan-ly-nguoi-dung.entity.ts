import { ApiProperty } from "@nestjs/swagger"

export class LoginEntity {
    @ApiProperty({required:true})
    tai_khoan: string
    @ApiProperty({required:true})
    mat_khau: string
}
