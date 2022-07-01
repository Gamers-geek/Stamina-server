# Stamina-server

Stamina-server est un projet sous license MIT pour l'instant, permettant de faire fonctionner la fonction multijoueur du jeu [Stamina-client](https://github.com/Stamina-Organization/Stamina-client). C'est un serveur master ||ce n'est pas le véritable terme||, c'est à dire qu'il s'occupera de tous ce qui se passe dans le jeu et qu'il est le seul à valider ou non les actions qui se passent en jeu. Cela permets de réduire la triche.

## Configuration

Le fichier de configuration `config.js` se présente de la manière suivante :
```js
module.exports = {
    port: 2025,
    debugEnabled: true,
    maxPeople: "2"
}
``` 
Le serveur utilise par défaut le port 2025. Ce port peut-être modifié à n'importe quel moment en modifiant les valeurs dans le fichier `config.js`.
Vous pouvez activer ou désactiver quand vous voulez le système de débug en changeant la valeur de `debugEnabled`.
Vous pouvez aussi limiter le nombre de personnes qui peuvent se connecter aux serveurs en modifiant la valeur de `maxPeople`. 
> Actuellement c'est en **String** mais ça devrait fonctionner avec des **int** normalement.

