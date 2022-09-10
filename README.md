<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
![](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)
![](https://img.shields.io/discord/880133347446247574?label=Discord&style=for-the-badge)





<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">project_title</h3>

  <p align="center">
    project_description
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/github_username/repo_name">View Demo</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Report Bug</a>
    ·
    <a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Stamina-server est un projet sous license MIT pour l'instant, permettant de faire fonctionner la fonction multijoueur du jeu [Stamina-client](https://github.com/Stamina-Organization/Stamina-client). C'est un serveur master, c'est à dire qu'il s'occupera de tous ce qui se passe dans le jeu et qu'il est le seul à valider ou non les actions qui se passent en jeu.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

Le fichier de configuration `config.js` se présente de la manière suivante :

```ts
export namespace Configuration {
	export class config {
		static port: number = 2025
		static debugEnabled: boolean = true
		static maxPlayer: number = 20
		static version: string = "Prototype V2 TypeScript"
		static physicTicAmount: number = 50
		static outputLog: string|null = "./log.txt"
	}
}
```

Pour utiliser le système de configuration dans votre module (feature à venir), il faut importer le namespace Configuration : `import Configuration from 'lechemin'` et ensuite l'utiliser comme ça : `Configuration.config.port`

Le serveur utilise par défaut le port 2025. Ce port peut-être modifié à n'importe quel moment en modifiant les valeurs dans le fichier `config.js`.

Vous pouvez activer ou désactiver quand vous voulez le système de débug en changeant la valeur de `debugEnabled`. Par défaut il est activé pour que vous puissez recevoir tt votre déboguage dans la console.

Vous pouvez aussi limiter le nombre de personnes qui peuvent se connecter aux serveurs en modifiant la valeur de `maxPlayer`.

`physicTicAmount` est le nombre de fois par seconde que toute la logique du serveur va se lancer. C'est à dire le calcul des IAs, la gestion des ressources, de l'économie et des guildes et l'envoi des données aux joueurs

`outputLog` est l'endroit où vous voulez que la sauvegarde des logs arrive. (feature à venir)

> Une documentation plus complète arrivera plus tard.

### Prerequisites


Node.js v18.7

[Stamina-client](https://github.com/Stamina-Organization/Stamina-client)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Serveur résilient
- [ ] Gestionnaire de versions de paquets
- [ ] Serveur peu gourmand en ressource

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distribué sous license MIT pour l'instant. `LICENSE.txt` pour plus d'informations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Twitter - [@Stamina Studio](https://twitter.com/Stamina_Studio) - stamina.organization@gmail.com

Lien du projet : [https://github.com/Stamina-Organization/Stamina-server](https://github.com/Stamina-Organization/Stamina-server)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Stamina-Organization/Stamina-server.svg?style=for-the-badge
[contributors-url]: https://github.com/Stamina-Organization/Stamina-server/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Stamina-Organization/Stamina-server.svg?style=for-the-badge
[forks-url]: https://github.com/Stamina-Organization/Stamina-server/network/members
[stars-shield]: https://img.shields.io/github/stars/Stamina-Organization/Stamina-server.svg?style=for-the-badge
[stars-url]: https://github.com/Stamina-Organization/Stamina-server/stargazers
[issues-shield]: https://img.shields.io/github/issues/Stamina-Organization/Stamina-server.svg?style=for-the-badge
[issues-url]: https://github.com/Stamina-Organization/Stamina-server/issues
[license-shield]: https://img.shields.io/github/license/Stamina-Organization/Stamina-server.svg?style=for-the-badge
[license-url]: https://github.com/Stamina-Organization/Stamina-server/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 