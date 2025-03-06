# Architecture
Pour le projet PawPlanner, nous avosn chois d'utiliser une approche combinant 3 types d’architectures : une **architecture en couches** en premier lieu, combinée à une **architecture MVC (Modèle Vue Contrôleur)** et une **architecture Orientée Services (SOA)**.

Plus en détails, nous séparons entre :

- **Frontend (TypeScript, React) → Interface utilisateur**
- **Backend (Apollo Server, GraphQL) → Logique Métier**
- **Base de données (PostGreSQL) → Stockage**

Cette architecture facilite la maintenance et l’évolution de notre application.

## Architecture MVC

- **React** pour la Vue (interface utilisateur)
- **Apollo Server et GraphQL** jouent le rôle de Contrôleur en gérant les requêtes et la logique métier.
- La base de données et les modèles définis dans Apollo représentent la **couche Modèle**.

Cette architecture s’adapte bien à notre application.

## Architecture Orientée Services (SOA)

**GraphQL** centralise et expose les données sous forme de services bien définis. Cela permet aux différentes parties de l’application d’accéder aux mêmes données sans redondance.

Cette approche permet :
  
- Une **grande flexibilité** et **évolutivité**.
  
- Une **séparation claire des responsabilités** → plus facile à gérer et à maintenir.
  
- De la **scalabilité** → on peut facilement ajouter de nouvelles fonctionnalités.
  
- De la **flexibilité** → les clients (frontends) récupèrent uniquement les données dont ils ont besoin.
  
- Une **base solide pour évoluer vers une architecture microservices** si besoin (par exemple, en ajoutant un service dédié aux paiements).

## Schéma

Le schéma ci-dessous décris notre architecture :

1) **Presentation Layer (couche Frontend)** :
    - **Atomic Design** :
        - **Atoms** : Composants de base (boutons, inputs)
        - **Molecules** : Groupes d'atoms (formulaires, cards)
        - **Organisms** : Sections complexes (formulaires complets, headers)
        - **Templates** : Structures de pages réutilisables
        - **Pages** : Pages complètes assemblant tous les composants

    - **Sass styling** : 
        - Organisation modulaire du CSS, 
        - Variables et mixins pour la réutilisation

    - **React et TypeScript** :
        - Composants typés : Définition des types pour les propriétés et états des composants pour garantir la réduction d'erreurs et une meilleure lisibilité du code
        - Gestion d'état intégrée : Utilisation d'outils comme `useState` pour gérer l'état des composants de manière prévisible et réactive

2) **Service Layer (couche Backend)** :   
    - **Apollo Server et GraphQL** : 
        - API GraphQL unifiée : Point d’entrée unique regroupant plusieurs sources de données
        - Resolvers : Fonctions qui traitent les requêtes et renvoient les données
        - Type Definitions : Définition du schéma et des types de données

    - **Business Logic (Logique Métier)**:
        - Logique métier centralisée 
        - Validation des données : Vérification de la conformité des données avant traitement

3) **Data Layer** : 
    - **PostGreSQL** :
        - Base de données relationnelle : Stockage structuré des données avec relations entre les tables
        - Gestion robuste des transactions : Assure la cohérence des données et la récupération après une erreur
        - Optimisation des performances : Amélioration de la vitesse de traitement avec des index et des requêtes optimisées 

<br><br>   
    
![Architecture schema of PawPlanner](/_ressources/conception_ressources/assets/architecture/architecture_schema.svg)