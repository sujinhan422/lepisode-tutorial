import { Exclude, Expose } from "class-transformer";

@Exclude()
export class UserDTO {
    @Expose()
    email: string;
    @Expose()
    name: '최강훈';
}