# Library Management App
_Current version: v1.1_

This is a simple fullstack web app for library management, built using the MERN stack.

<!-- TABLE OF CONTENTS -->

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-about-the-project">About the project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#-prerequisites">Prerequisites</a></li>
        <li><a href="#-downloading">Downloading</a></li>
        <li><a href="#-installing-and-executing-dev">Installing and executing (dev)</a></li>
      </ul>
    </li>
    <li><a href="#-help">Help</a></li>
    <li><a href="#-authors">Authors</a></li>
    <li><a href="#-file-structure">File Structure</a></li>
    <li><a href="#-gallery">Gallery</a></li>
    <li><a href="#-version-history">Version History</a></li>
    <li><a href="#-license">License</a></li>
    <li><a href="#-acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## 🔰 About the project

The system allows **Librarians** and **Members** to login to the web app (using accounts created by librarians)

Lbrarians can:
- Manage (CRUD)
  - Authors
  - Genres
  - Books
  - Borrowals
  - Users

Members can:
- View (R)
  - Authors
  - Genres
  - Books
  - Own borrowals
- Add (C)
  - Own borrowals
  
### Built with
<div style="display:inline-block">
<img alt="MongoDB"src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/databases/mongodb.svg" width="128"/>
<img alt="Node.js" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/frameworks/nodejs.svg" width="128"/>
<img alt="NPM" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/npm.svg" width="128"/>
<img alt="React" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/frameworks/react.svg" width="128"/>
<img alt="Git" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/git.svg" width="128"/>
<img alt="Github" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/cloud/github.svg" width="128"/>
<img alt="VS Code" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/text%20editors/vscode.svg" width="128"/>
<img alt="HTML" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/html.svg" width="128"/>
<img alt="CSS" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/others/css.svg" width="128"/>
<img alt="JS" src="https://github.com/yurijserrano/Github-Profile-Readme-Logos/blob/master/programming%20languages/javascript.svg" width="128"/>

</div>

<!-- GETTING STARTED -->

## ⚡ Getting Started

### ❕ Prerequisites
You need a computing environment with an up to date version of Windows/Mac OS/Linux and a working internet connection

* Git
* Node.js
* NPM
* A web browser (Chrome/Edge recommended)

### 🔻 Downloading

* Clone the code repo using **HTTPS**, SSH or Github CLI
```
git clone https://github.com/MERNRAD/LibraryManagement.git
```

### 🚀 Installing and executing (dev)

### *You will need the .env file containing the environment variables in order to use the system, please contact the <a href="#-authors">authors</a>*

1. cd to project folder (LibraryManagement)
2. Run the following commands in terminal:
  - To install NPM packages
```
npm run install
```
  - To start both server and client applications
```
npm start
```

3. Use the following demo accounts to login
- Librarian
```
Email address: testlibrarian@library.com
Password: librarian123
```

- Member
```
Email address: testmember@library.com
Password: member123
```

<!-- HELP -->

## ❓ Help

Contact authors if you need help or run into any issues

<!-- AUTHORS -->

## 👥 Authors

  - Sandul Renuja | 2020/CS/054 - 2020cs054@stu.ucsc.cmb.ac.lk
  - Abdullah Jasmin | 2020/CS/002 - 2020cs002@stu.ucsc.cmb.ac.lk
  - Ravindu Wegiriya | 2020/CS/204 - 2020cs204@stu.ucsc.cmb.ac.lk
  - Kaveesha Muthukuda | 2020/CS/118 - 2020cs118@stu.ucsc.cmb.ac.lk
  - Induwara Pathirana | 2020/CS/126 - 2020cs126@stu.ucsc.cmb.ac.lk

<!-- FILE STRUCTURE -->

###  📂 File Structure
```
.
├── client
│   ├── public
│   │   ├── assets
│   │   └── index.html
│   └── src
│       ├── hooks
│       ├── sections
│       │   ├── @dashboard
│       │   │   ├── app
│       │   │   ├── author
│       │   │   ├── book
│       │   │   ├── borrowal
│       │   │   ├── genre
│       │   │   └── user
|       │   └── auth
│       │       └── login
│       ├── utils
│       ├── App.jsx
│       ├── index.js
│       ├── constants.js
│       └── routes.js
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── index.js
│   └── passport-config.js
│
├── package.json
├── README.md
└── LICENSE.md
```
* Only the core files and directories are shown in the above tree

| No |       File Name      |             Details             |
|----|----------------------|---------------------------------|
| 1  | server/index.js      | Node.js server app entry point  |
| 2  | client/src/index.js  | Client react app entry point    |

<!-- GALLERY -->

###  📸 Gallery

![Screenshot 2022-10-27 at 15 52 48 Large](https://user-images.githubusercontent.com/49369577/198261312-d21a461a-0dd9-46a8-897c-f8c06f76ef5a.jpeg)

![Screenshot 2022-10-27 at 15 53 06 Large](https://user-images.githubusercontent.com/49369577/198261409-31625ee5-b743-4360-a54a-8c2834a26f41.jpeg)

![Screenshot 2022-10-27 at 15 53 23 Large](https://user-images.githubusercontent.com/49369577/198261440-9c43f63e-9ba4-4f16-a552-9d210f40c8df.jpeg)

![Screenshot 2022-10-27 at 15 53 31 Large](https://user-images.githubusercontent.com/49369577/198261486-fd2f6bfa-955f-4cdc-9716-091d5ba027a9.jpeg)

![Screenshot 2022-10-27 at 15 53 38 Large](https://user-images.githubusercontent.com/49369577/198261620-a6669984-8a9a-4067-b9e8-e6f716d8f76b.jpeg)

![Screenshot 2022-10-27 at 15 53 49 Large](https://user-images.githubusercontent.com/49369577/198261666-b550362c-4e69-47f4-aaf2-1bbcb278d96e.jpeg)

![Screenshot 2022-10-27 at 15 54 04 Large](https://user-images.githubusercontent.com/49369577/198261690-4bc70865-4f25-403a-a2c2-a1f0192ab02a.jpeg)

![Screenshot 2022-10-27 at 15 54 16 Large](https://user-images.githubusercontent.com/49369577/198261718-67c1800e-549c-4fe3-9219-95bcaf5302c6.jpeg)

![Screenshot 2022-10-27 at 15 54 27 Large](https://user-images.githubusercontent.com/49369577/198261796-63cc2266-c59f-42ee-91aa-ea585df55fc2.jpeg)

![Screenshot 2022-10-27 at 15 55 15 Large](https://user-images.githubusercontent.com/49369577/198261821-d5e36256-552c-4664-8018-cf9269ae768d.jpeg)


<!-- VERSION HISTORY -->

## 📄 Version History

* 1.1
    * Various bug fixes and optimizations
    * See [dev branch commit history](https://github.com/MERNRAD/LibraryManagement/commits/dev)
* 1.0
    * Initial Release
    
<!-- LICENSE -->

## 🔒 License

This project is licensed under the MIT License - see the LICENSE.md file for details

<!-- ACKNOWLEDGEMENTS -->

## 🌟 Acknowledgments

Frontend React UI Template
* [@minimal/material-kit-react](https://mui.com/store/items/minimal-dashboard-free/)
