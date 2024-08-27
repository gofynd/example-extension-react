# Fynd Extension React Starter Template
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

[![Coverage Status][coveralls-badge]]([coveralls-url])

This repository is the frontend app for Fynd’s extension starter templates. **You probably don’t want to use this repository directly**, but rather through one of the example templates.


## Directory structure
Below is the structure of the project directory along with brief descriptions of the main components:

```
.
├── App.jsx                   # The main React component
├── README.md                 # Project documentation
├── dev_embed.js              # Script for embedding in development
├── fdk.ext.config.json       # Configuration file for FDK extension
├── index.html                # Main HTML file
├── index.jsx                 # Entry point for the React application
├── jest.config.mjs           # Jest configuration for unit tests
├── package-lock.json         # Lockfile for npm dependencies
├── package.json              # Project metadata and dependencies
├── pages                     # Page components
│   ├── Home.jsx              # Home page component
│   ├── NotFound.jsx          # 404 Not Found page component
│   └── style                 # Styles for page components
├── public                    # Public assets
├── router.js                 # React Router configuration
├── test                      # Test files and configurations
└── vite.config.js            # Vite configuration file contains the configuration for Vite, including server setup and proxy settings.

```

[coveralls-badge]: https://coveralls.io/repos/github/gofynd/example-extension-react/badge.svg?branch=main&&kill_cache=1
[coveralls-url]: https://coveralls.io/github/gofynd/example-extension-react?branch=main

