import { Category } from "./Category";

export interface Example {
    id: number,
    title: string,
    category?: Category
}