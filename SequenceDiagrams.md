# Sequence Diagrams

## Table of Contents

### Authentification

1. [Registration Sequence](#registration-sequence)
2. [Login Sequence](#login-sequence)
3. [Logout Sequence](#logout-sequence)

### Visitor functions

1. [Find Trainer Sequence](#find-trainer-sequence)

### Appointment booking

1. [Create Appointment Sequence](#create-appointment-sequence)
2. [Read Appointment Sequence](#read-appointment-sequence)
3. [Update Appointment Sequence](#update-appointment-sequence)
4. [Delete Appointment Sequence](#delete-appointment-sequence)

---

## Registration Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant Guest
    participant Client
    participant Server
    participant Database

    Guest ->>+ Client: Register Form
    Client ->>+ Server: formData({credentials})
    
    Server ->>+ Database: findUserByEmail(credentials.email)
    alt User exists
        Database -->>- Server: true (User exists)
        Server -->>- Client: Email already registered (Error)
    else User does not exist
        Database -->>+ Server: false (No user found)
        Server ->>+ Database: register({credentials})
        Database -->>+ Server: Confirm registration
        Server -->>+ Client: Registration completed
    end
```

    Retours : 
    - Guest et client au même niveau me semblent étrange, on a l'impression que Guest devient Client, ce ne sont pas des éléments comparables qui ne devraient donc pas se trouver côte à côte
    - Rien n'est renvoyé au Guest en fin de parcours (pour les deux scénarios)
    - Trop technique je pense


## Login Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant Guest
    participant Client
    participant Server
    participant Database

    Guest ->>+ Client: Login Form
    Client ->>+ Server: formData({credentials})

    Server ->>+ Database: findUserByEmail(credentials.email)
    alt User exists
        Database -->> Server: true (User exists)
        Server ->>+ Database: login({credentials})
        alt Credentials match
            Database -->> Server: Credentials match
            Server -->> Client: Login completed
            Server -->> Client: Send JWT token in cookies
        else Credentials don’t match
            Database -->> Server: Invalid credentials
            Server -->> Client: Invalid credentials (Error)
        end
    else User does not exist
        Database -->> Server: false (No user found)
        Server -->> Client: Account not found (Error)
    end
```

    Retours : 
    - la logique est nickel mais il reste les problèmes soulevés avant. il manque au moins un retour vers le Guest et je pense qu'il faut le représenter autrement.
    - Tu as perdu les rectangles qui représentent le temps dans ce diag.

## Logout Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant Server

    User ->>+ Client: Logout Request
    Client ->>+ Server: logout()
    Server -->> Client: Logout completed
    Server -->> Client: Clear JWT token in cookies
```

---
---

## Find Trainer Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant User/Guest
    participant Client
    participant Server
    participant Database

    User/Guest ->>+ Client: Search dog trainer request
    Client ->> Client: Validate query
    alt Invalid query
        Client -->> User/Guest: Error: Invalid search query
    else Valid query
        Client ->>+ Server: search({query})
        
        Server ->>+ Database: findTrainerByQuery({query})
        alt Trainers found
            Database -->>+ Server: List of trainers found ([trainers])
            Server -->> Client: Return filtered trainer list
        else No trainers found
            Database -->>+ Server: Empty array (no trainers found)
            Server -->> Client: Message: No trainers found matching the search
        end
    end
```

---
---


## Create Appointment Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant Dog_Trainer
    participant Client
    participant Server
    participant Database

    Dog_Trainer ->>+ Client: Selects date, time, and service
    Client ->>+ Server: formData(appointment)
    Server ->>+ Database: checkAvailability({date, time})
    alt Slot available
        Database -->>+ Server: Slot is available
        Server ->>+ Database: create({appointment})
        Database -->> Server: Appointment confirmed
        Server -->> Client: Send confirmation
        Client -->> Dog_Trainer: Display confirmation message
    else Slot unavailable
        Database -->> Server: Slot is taken
        Server -->> Client: Error: Slot unavailable
        Client -->> Dog_Trainer: Display error message
    end
```

    Retours : 
    - Le rôle Dog_Trainer ne correspond à rien dans nos entités, il faut qu'on soit d'accord tout de suite : c'est soit trainer soit dog_trainer mais on doit garder les mêmes termes partout. Pareil pour appointment, c'est un terme qu'on utilise ? Je me souviens plus.
    - pas de s à Select



## Read Appointment Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant Dog_Owner
    participant Client
    participant Server
    participant Database

    Dog_Owner ->>+ Client: Request to view appointments
    Client ->>+ Server: getAppointments(dog_trainer.id)
    Server ->>+ Database: read(dog_trainer.id)
    alt Appointments found
        Database -->>+ Server: List of appointments found ([appointments])
        Server -->> Client: Return appointments list
    else No appointments found
        Database -->>+ Server: Empty array (no appointments found)
        Server -->> Client: Message: No appointments available
    end
```

## Update Appointment Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant Dog_Trainer
    participant Client
    participant Server
    participant Database

    Dog_Trainer ->>+ Client: Selects an appointment to update
    Client ->> Client: Display current appointment details
    Dog_Trainer ->> Client: Modify appointment information
    Client ->>+ Server: putAppointments(appointment)
    Server ->>+ Database: checkAvailability({id})
    alt Appointment found
        Database -->>+ Server: Found appointment
        Server ->>+ Database: update({appointment})
        Database -->> Server: Appointment updated
        Server -->> Client: Send confirmation
        Client -->> Dog_Trainer: Display updated appointment
    else Appointment not found
        Database -->> Server: Appointment not found
        Server -->> Client: Error: Appointment does not exist
        Client -->> Dog_Trainer: Display error message
    end
```

## Delete Appointment Sequence

[Back to Top](#table-of-contents)

```mermaid
sequenceDiagram
    participant Dog_Trainer
    participant Client
    participant Server
    participant Database

    Dog_Trainer ->>+ Client: Selects an appointment to delete
    Client ->> Dog_Trainer: Confirm deletion
    alt Confirmation
        Client ->>+ Server: deleteAppointment({appointment.id})
        Server ->>+ Database: delete({appointment.id})
        Database -->> Server: Appointment deleted
        Server -->> Client: Send confirmation
        Client -->> Dog_Trainer: Display success message
    else Cancellation
        Client -->> Dog_Trainer: Deletion canceled
    end
```

