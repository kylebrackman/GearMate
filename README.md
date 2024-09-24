<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a >
    <img src="/client/public/static-photos/gearmate-logo.png" alt="GearMate logo" width="80" height="80">
  </a>

  <h1 align="center">GearMate</h1>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]]

GearMate is an application where users can rent out various types of gear, games, or hardware, that others may just need for a few days, or just want to test out! Currently, to rent outdoor gear, outdoor enthuiasasts must go to a large, corporate, recreational store to rent out low quality equipment for too high of prices. Now, users can rent out their gear to whoever may need it!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* ![Ruby](https://img.shields.io/badge/ruby-%23CC342D.svg?style=for-the-badge&logo=ruby&logoColor=white)
* ![Rails](https://img.shields.io/badge/rails-%23CC0000.svg?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
* ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
* ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/kylebrackman/GearMate.git
   ```
2. Change directories into /client and run:
   ```sh
   npm install
   ```
3. Change directories into /backend and run: 
   ```sh
    bundle install
   ```
  ```sh
    rails db:migrate
   ```
4. To do the same in docker, create a .env file in root with the two variables: 
  1. POSTGRES_USER=<your-username>
  2. POSTGRES_PASSWORD=<your-password>
5. Following commands in order:
   ```sh
    docker-compose build
   ```
   ```sh
    docker-compose up
   ```
   ```sh
    docker exec -it gearmate_iii-backend-1 bin/rails db:migrate
   ```

### See notes.md for more helpful info.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap & Bugs
- [ ] Add request and approve flow to rental requests (in progress...).
- [ ] Add in payment gateway.
- [ ] Add user chat for coordinating item dropoffs/pickups.
- [ ] Fix Google Maps API issues.
- [ ] Add available and unavailable dates on each item calendar.
- [ ] Create "Items Being Rented" page.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Versions

- Ruby 3.3.5
- Rails 7.2.1
- React 18.3.1
- Postgresql (Postgresql@16, specifically)

<!-- CONTACT -->

## Acknowledgements
* [othneildrew Best README Template](https://github.com/othneildrew/Best-README-Template/tree/master)


## Contact

Kyle Brackman - kyle.a.brackman@gmail.com

Project Link: [https://github.com/kylebrackman/GearMate-III](https://github.com/kylebrackman/GearMate-III)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/kyle-brackman/
[product-screenshot]: images/GearMateHome.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tailwind-url]: https://tailwindcss.com/
[Tailwind]: https://img.shields.io/badge/Tailwind-Blue
[Ruby-url]: https://www.ruby-lang.org/en/
[Ruby.rb]:https://camo.githubusercontent.com/3e54bb93c9b07f26583176c6d06d716fb4979496f742fc9eed7c9c5ba8befb27/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f527562792d4343333432443f7374796c653d666c6174266c6f676f3d72756279266c6f676f436f6c6f723d626c61636b
# GearMate