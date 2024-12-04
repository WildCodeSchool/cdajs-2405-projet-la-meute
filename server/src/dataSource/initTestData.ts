import { dataSource } from "./dataSource";
import { Owner } from "../entities/Owner";
import { Dog } from "../entities/Dog";
import { Trainer } from "../entities/Trainer";
import { Service } from "../entities/Service";
import { Event } from "../entities/Event";
import { Participation } from "../entities/Participation";
import { Favorite } from "../entities/Favorite";

async function createData() {
    const queryRunner = dataSource.createQueryRunner();

    if (!dataSource.isInitialized) {
        await dataSource.initialize();
        console.info("Database connection established.");
    }

    // Réinitialisation des tables et séquences
    await queryRunner.manager.query('DELETE FROM "favorite"');
    await queryRunner.manager.query('DELETE FROM "participation"');
    await queryRunner.manager.query('DELETE FROM "event"');
    await queryRunner.manager.query('DELETE FROM "service"');
    await queryRunner.manager.query('DELETE FROM "dog"');
    await queryRunner.manager.query('DELETE FROM "trainer"');
    await queryRunner.manager.query('DELETE FROM "owner"');
    await queryRunner.manager.query('DELETE FROM "user"');



    // Démarrer une transaction pour créer les données
    await queryRunner.startTransaction();

    try {
        const owner1 = new Owner();
        owner1.name = "Jean Dupont";
        owner1.email = "jean.dupont@example.com";
        owner1.password_hashed = "hashed_password_1";
        owner1.city = "Lyon";
        owner1.postal_code = '69001';
        owner1.phone_number = "0123456789";
        await queryRunner.manager.save(owner1);


        

        // Commit de la transaction
        await queryRunner.commitTransaction();
        console.info("Test data created successfully.");
    } catch (error) {
        console.error("Error creating test data:", error);
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
}

export async function initTestData() {
    await dataSource.initialize(); 
    console.info("Data source initialized. Creating test data...");
    await createData();
    console.info("Test data created successfully.");
}
