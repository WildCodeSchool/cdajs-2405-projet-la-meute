/* Trainer data */
SELECT id AS trainer_id,
    lastname,
    firstname,
    email,
    phone_number,
    city,
    postal_code,
    siret,
    company_name
FROM trainer;
/* Owner data */
SELECT owner.id AS owner_id,
    owner.lastname,
    owner.firstname,
    owner.email,
    owner.phone_number,
    owner.city,
    owner.postal_code,
    count(dog.id) AS dog_count
FROM owner
    INNER JOIN dog ON dog.owner_id = owner_id
GROUP BY 
    owner.id;
/* Event data */
SELECT event.id as event_id,
    event.date,
    event.title,
    event.description,
    event.location,
    event.group_max_size,
    event.trainer_id,
    trainer.lastname as trainer_lastname,
    trainer.firstname as trainer_firstname,
    trainer.email as trainer_email,
    trainer.phone_number as trainer_phone_number,
    trainer.city as trainer_city,
    trainer.postal_code as trainer_postal_code,
    trainer.company_name as trainer_company_name
FROM event
    INNER JOIN trainer ON trainer.id = event.trainer_id;
