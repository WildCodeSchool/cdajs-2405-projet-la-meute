import { Category } from "../entities/Category";
import { Example } from "../entities/Example";
import { dataSource } from "./dataSource";

async function createData(
    title: string,
    category: Category
) {
    const example = new Example(title);
    example.category = category;
    await dataSource.manager.save(example);
}

export async function initTestData() {
    const cat1 = new Category("Cat1");
    const cat2 = new Category("Cat2");

    await dataSource.manager.save(cat1);
    await dataSource.manager.save(cat2);

    await createData("This is a test", cat1);
    await createData("A very testy one", cat2);
}
