// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema } from "yup";


declare module "yup"{
    class StringSchema{
        firstLetterUppercase(): this;
    }
}

export interface ObjectError {
    description: string;
    code: string;

}