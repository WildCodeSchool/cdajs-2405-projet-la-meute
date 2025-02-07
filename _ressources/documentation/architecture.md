Pour notre projet PawPlanner, on utilise une approche combinant 3 types d’architectures : principalement on utilise une **architecture en couches**, combinée à une **architecture MVC (Modèle Vue Contrôleur)** et une **architecture Orientée Services (SOA)**.

Plus en détails, on a une séparation entre :

- **Frontend (TypeScript, React) → Interface utilisateur**
- **Backend (Apollo Server, GraphQL) → Logique Métier**
- **La base de données (PostGreSQL) → Stockage**

Cette architecture facilite la maintenance et l’évolution de notre application.

Concernant l'**architecture MVC** :

- **React** pour la Vue (interface utilisateur)
- **Apollo Server et GraphQL** jouent le rôle de Contrôleur en gérant les requêtes et la logique métier.
- La base de données et les modèles définis dans Apollo représentent la **couche Modèle**.

Ce modèle s’adapte bien à notre application PawPlanner qui se veut interactive.

Et concernant l'**architecture Orientée Services (SOA)** :

- **GraphQL** centralise et expose les données sous forme de services bien définis. Cela permet aux différentes parties de l’application d’accéder aux mêmes données sans redondance.
  
- Cette approche donne une **grande flexibilité** et **permet l’évolutivité**.
  
- **Séparation claire des responsabilités** → plus facile à gérer et à maintenir.
  
- **Scalabilité** → on peut facilement ajouter de nouvelles fonctionnalités.
  
- **Flexibilité avec GraphQL** → les clients (frontends) récupèrent uniquement les données dont ils ont besoin.
  
- **Bonne base pour évoluer vers des microservices** si besoin (par exemple, un service dédié aux paiements).
<br><br>

Le schema ci dessous montre les différents aspects de notre architecture :

1) **Presentation Layer (couche FrontEnd)** :
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
        - Composants typés : Définition des types pour les propriétés et états des composants pour garantir la réductiond d'erreurs et une meilleure lisibilité du code
        - Gestion d'état intégrée : Utilisation d'outils comme `useState` pour gérer l'état des composants de manière prévisible et réactive

2) **Service Layer (couche BackEnd)** :   
    - **Apollo Server et GraphQL** : 
        - API GraphQL unifiée : Point d’entrée unique regroupant plusieurs sources de données
        - Resolvers : Fonctions traitant les requêtes et renvoyant les données
        - Type Definitions : Définition du schéma et des types de données

    - **Business Logic (Logique Métier)**:
        - Logique métier centralisée 
        - Validation des données : Vérification de la conformité des données avant traitement

3) **Couche Data** : 
    - **PostGreSQL** :
        - Base de données relationnelle : Stockage structuré des données avec relations entre les tables
        - Gestion robuste des transactions : Assure la cohérence des données et la récupération après une erreur
        - Optimisation des performances : Amélioration de la vitesse de traitement avec des index et des requêtes optimisées 

        


<br><br>   
    
![Architecture schema of PawPlanner](/_ressources/conception_ressources/assets/architecture/architecture_schema.svg)