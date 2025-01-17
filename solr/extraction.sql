/* Trainer data */
SELECT id AS trainer_id,
    lastname,
    firstname,
    email,
    phone_number,
    city,
    postal_code,
    role,
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
    owner.role,
    count(dog.id) AS dog_count
FROM owner
    INNER JOIN dog ON dog.owner_id = owner_id
GROUP BY 
    owner.id;
/* Event data */