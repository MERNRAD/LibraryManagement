# Library Management App
_Current version: v1.1_

This is a simple fullstack web app for library management, built using the MERN stack.

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

### Prerequisites
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

###  📂 File Structure *
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
