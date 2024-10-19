# Sequence Diagrams

## Table of Contents

1. [Registration Sequence](#registration-sequence)
2. [Login Sequence](#login-sequence)
3. [Logout Sequence](#logout-sequence)

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
        Database -->>+ Server: confirm register
        Server -->>+ Client: registration completed
    end
