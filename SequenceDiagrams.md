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
```

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
        alt Credentials matches
            Database -->> Server: credentials matches
            Server -->> Client: login completed
            Server -->> Client: send JWT token in cookies
        else Credentials dont match
            Database -->> Server: invalid credentials
            Server -->> Client: Invalid credentials(Error)
        end
    else User does not exist
        Database -->> Server: false (No user found)
        Server -->> Client: Account not found (Error)
    end
```

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