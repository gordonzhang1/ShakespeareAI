<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<div align="center">

<h1 align="center">ShakespeareAI</h1>

  <p align="center">
    ShakespeareAI is a AI digital note-taking web app that quizzes you based on your handwritten notes in real-time. Press Quiz Me, and ShakespeareAI transforms your notes and drawings into a personalized set of questions, helping you retain information more effectively.
    <br />
    <a href="https://www.youtube.com/watch?v=lmbQf5aHT-o"><strong>View Demo »</strong></a>
    <br />
    <br />
    <a href="https://www.shakespeareai.ca">Visit Website</a>
    ·
    <a href="https://github.com/gordonzhang1/ShakespeareAI/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/gordonzhang1/ShakespeareAI/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
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
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

  <a href="https://github.com/gordonzhang1/ShakespeareAI">
    <img src="/src/assets/sa-cover.jpeg" alt="Logo" width="1000" height="auto">
  </a>
  <p>  ShakespeareAI is a digital notetaking app built with a React frontend and a Node.js backend. It uses Firebase for user authentication and Firestore to store user data. 
</p>

<h3>  How it works
</h3>
<p>When the user finishes taking notes and presses "Quiz Me," the app sends the handwriting to Google's Cloud Vision API to convert it into text. That text is then sent to the OpenAI API, which generates a list of questions based on the content. The questions are displayed to the user, making it easy to review and reinforce their learning.
</p>


### Built With

* [![React][React.js]][React-url]
* [![Node.js][Node.js]][Node-url]
* [![OpenAI API][OpenAI-API]][OpenAI-API-url]
* [![Cloud Vision API][GCP]][GCP-url]
* [![Firebase][Firebase]][Firebase-url]
* [![Firestore][Firestore]][Firestore-url]
* [![C++][Cpp]][Cpp-url]
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features
<ul>
  <li><strong>Digital Note-Pad:</strong> A note-taking experience that allows users to write, draw, erase, and change colour on a canvas. Additionally, users can also add new pages, delete pages, and clear pages, all which is saved to their account</li>
  <li><strong>Quiz Generation:</strong> After taking notes, users can press "Quiz Me" to generate a set of questions based on their notes.</li>
  <li><strong>User Authentication:</strong> Secure sign-in and registration using Firebase for user management, along with forgot password and update profile fuctionalities.</li>
  <li><strong>Data Storage:</strong> Store user data and notes in Firestore for easy access and management.</li>
</ul>
And more to come! 
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

<p>Want to try ShakespeareAI out? Go to <a href="https://www.shakespeareai.ca/">www.shakespeareai.ca</a> and sign up. Once logged in, write the first fact that comes to mind, and press Quiz Me</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.


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




<!-- CONTACT -->
## Contact

Gordon Zhang - g234zhan@uwaterloo.ca

Project Link: [https://github.com/gordonzhang1/ShakespeareAI](https://github.com/gordonzhang1/ShakespeareAI)

<p align="right">(<a href="#readme-top">back to top</a>)</p>






<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[contributors-url]: https://github.com/gordonzhang1/ShakespeareAI/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[forks-url]: https://github.com/gordonzhang1/ShakespeareAI/network/members
[stars-shield]: https://img.shields.io/github/stars/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[stars-url]: https://github.com/gordonzhang1/ShakespeareAI/stargazers
[issues-shield]: https://img.shields.io/github/issues/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[issues-url]: https://github.com/gordonzhang1/ShakespeareAI/issues
[license-shield]: https://img.shields.io/github/license/gordonzhang1/ShakespeareAI.svg?style=for-the-badge
[license-url]: https://github.com/gordonzhang1/ShakespeareAI/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/gordonzhang1
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
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/

[OpenAI-API]: https://img.shields.io/badge/OpenAI%20API-412991?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-API-url]: https://openai.com/api/

[GCP]: https://img.shields.io/badge/Cloud%20Vision%20API-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[GCP-url]: https://cloud.google.com/vision/

[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://firebase.google.com/

[Firestore]: https://img.shields.io/badge/Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firestore-url]: https://firebase.google.com/products/firestore/

[Cpp]: https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white
[Cpp-url]: https://isocpp.org/

