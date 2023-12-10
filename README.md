# Test front Lucca

## Choix techniques

### Architecture:

3 composants :

- expense-list : la liste des dépenses dans une table paginée
- expense-edit : formulaire d'édition et de création de nouvelle dépense
- error-tracer : affichage des erreurs

3 services transverses : http-service (requetage HTML), storage-service (variables globales), error-service (gestion d'erreurs centralisé)

Note : J'ai laissé la logiques propres aux composant dans les composant. J'ai considéré qu'il fallait exporter la logique dans des services uniquement lorsqu'elle est partagée entre plusieurs composants. Un autre choix aurait été d'utiliser les composants comme des objets de liaison entre un template HTML et de la logique métier portée par des services specialisés.

### Dépendances :

Le but de l'exercice étant d'explorer les possibilités d'Angular, je n'ai utilisé aucune librairie externe en dehors de celles proposées par défault. (RxJs pour la gestion des observables, Jasmin et Karma pour les tests)

### Stratégie de test :

Tous les services et le composants sont testés unitairement. Je n'ai pas ressenti le besoin de faire des tests end-to-end à ce niveau.
Une part importante de la logique applicative étant portée par les composants, je ne pouvais pas faire l'impasse sur les tests composant. Après coup, je penses que la testabilité des tests composant est moins bonne que celles des services, donc il y a là une perte de temps évitable.

=============================== Coverage summary ===============================
Statements : 85.04% ( 91/107 )
Branches : 84.21% ( 16/19 )
Functions : 80.95% ( 34/42 )
Lines : 83.5% ( 81/97 )

Je m'étais fixé un seuil minimal de 80% de code coverage, en accord avec la loie de Pareto qui dit que les derniers 20% représentent 80% de l'effort; et que le ROI ne le justifie pas. J'imagine que ce point peut être discuté.
Pour atteindre le seuil, j'ai réalisé les tests qui me semblaient nécéssaires avant de les adapter suite à un coverage insatisfaisant.

## But de l'exercice

En vous servant de l'api fournie, vous réaliserez une application de saisie des dépenses.
Celle-ci consiste en 3 pages : la liste des dépenses, un formulaire d'édition d'une dépense et un formulaire de saisie d'une dépense.
Cette application doit être réalisée en Angular.

## Critères d'évaluation

Vous serez évalué(e) sur la maintenabilité de votre code: lisibilité, extensibilité, non-répétitivité, homogénéité.
Vous ne serez pas évalué(e) sur le design ni sur vos compétences en CSS.

Nous souhaitons juger de votre capacité de développement et de votre compréhension d'Angular et de TypeScript. Ainsi évitez les librairies qui cacheraient votre talent. Par exemple, nous vous déconseillons d'utiliser `@angular/material` pour ses composants de pagination et de tableau.

N'hésitez pas à nous fournir une explication de vos choix techniques et en particulier une justification des librairies externes, si vous choisissez d'en utiliser.

## Modèle

Une dépense peut être de 2 natures : déplacement ou restaurant. Pour un voyage, une distance (nombre entier positif non nul) est requise. Pour un restaurant un nombre d'invité (nombre entier positif ou nul) est demandé.
Les champs communs aux 2 natures sont :

- identifiant numérique (géré par l'api)
- montant (nombre positif non nul)
- date de la dépense (format yyyy-mm-dd)
- commentaire (chaîne de caractère)
- nature ('trip' ou 'restaurant')

## La liste des dépenses

La liste des dépenses affiche les dépenses fournies par l'api. Les fonctionnalités demandées pour cette liste sont :

- Une pagination simple, persistante durant l'usage de l'application.
- Tri non demandé (l'api retourne les dépenses triées par date de mise à jour).
- Au clic sur une dépense, navigation vers l'édition de cette dépense.
- Un bouton pour ajouter une dépense.

## L'édition d'une dépense

Le formulaire d'édition de dépense permet de modifier une dépense. Les fonctionnalités demandées sont :

- Les champs doivent être affichés selon les règles du modèle.
- Les champs doivent être validés selon les règles du modèle.
- A la suite d'une sauvegarde, la liste sera affichée sans que la page en cours ait changée.

## L'ajout d'une dépense

Même fonctionnement que l'édition de la dépense, mais suite à la sauvegarde, la 1ere page de la liste doit être affichée.

## API

### Utilisation

`> npm ci`

puis

`> npm run api`

### GET /expenses

- paramètres : page (nombre), limit (nombre)
- réponse (exemple) :

```json
{
  "items": [
    { "id": 50, "nature": "trip", "amount": 965, "comment": "Enim maioren.", "purchasedOn": "2022-05-12", "updatedAt": "2022-11-16T00:09:12.057Z", "distance": 988 },
    { "id": 42, "nature": "restaurant", "amount": 846, "comment": "Excepturi blanditiis at est sapiente tenetur ipsum sunt voluptate, vp.", "purchasedOn": "2022-08-08", "updatedAt": "2022-10-21T06:25:59.492Z", "invites": 2 }
  ],
  "count": 34
}
```

### GET /expenses/{id}

- paramètres : aucun
- réponse (exemple) :

```json
{ "id": 50, "nature": "trip", "amount": 965, "comment": "Enim maioren.", "purchasedOn": "2022-05-12", "updatedAt": "2022-11-16T00:09:12.057Z", "distance": 988 }
```

### POST /expenses

- paramètres : aucun
- payload (exemple) :

```json
{ "nature": "trip", "amount": 965, "comment": "Enim maioren.", "purchasedOn": "2022-05-12", "distance": 988 }
```

### PUT /expenses/{id}

- paramètres : aucun
- payload (exemple) :

```json
{ "id": 50, "nature": "trip", "amount": 965, "comment": "Enim maioren.", "purchasedOn": "2022-05-12", "distance": 988 }
```
