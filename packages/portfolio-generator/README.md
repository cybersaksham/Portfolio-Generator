# portfolio-generator

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]
[![Size][size-image]][npm-url] [![License][license-image]][npm-url]

[npm-url]: https://www.npmjs.com/package/portfolio-generator
[downloads-image]: http://img.shields.io/npm/dm/portfolio-generator.svg?style=for-the-badge
[npm-image]: http://img.shields.io/npm/v/portfolio-generator.svg?style=for-the-badge
[size-image]: http://img.shields.io/bundlephobia/min/portfolio-generator.svg?style=for-the-badge
[license-image]: http://img.shields.io/npm/l/portfolio-generator.svg?style=for-the-badge

- This package generates a bootstrap based portfolio website for you.
- Website will be using Next JS.
- You can download final generated code & deploy on vercel.
- View the template of generated website here https://bootstrapmade.com/demo/Personal/
- View my website which is also built in same template https://www.cybersaksham.co.in/
- View the full documentation of `portfolio-generator` here http://portfolio-generator.cybersaksham.co.in/

# Folder Structure

- This will be the folder structure after complete generation.

```cmd
├── Components
│   ├── About.js
│   ├── Contact.js
│   ├── Detail.js
│   ├── Header.js
│   ├── Portfolio.js
│   ├── Resume.js
│   ├── Service.js
│   └── ValidImage.js
├── Data
│   ├── About.js
│   ├── Contact.js
│   ├── Counter.js
│   ├── Portfolio.js
│   ├── Resume.js
│   └── Skills.js
├── pages
│   ├── api
│   │   └── sendMail.js
│   ├── detail
│   │   └── [id].js
│   ├── _app.js
│   ├── _document.js
│   └── index.js
├── public
│   ├── assets
│   │   ├── js
│   │   │   └── main.js
│   │   └── vendor
│   │       ├── bootstrap
│   │       │   ├── css
│   │       │   │   ├── bootstrap.css
│   │       │   │   ├── bootstrap.css.map
│   │       │   │   ├── bootstrap-grid.css
│   │       │   │   ├── bootstrap-grid.css.map
│   │       │   │   ├── bootstrap-grid.min.css
│   │       │   │   ├── bootstrap-grid.min.css.map
│   │       │   │   ├── bootstrap-grid.rtl.css
│   │       │   │   ├── bootstrap-grid.rtl.css.map
│   │       │   │   ├── bootstrap-grid.rtl.min.css
│   │       │   │   ├── bootstrap-grid.rtl.min.css.map
│   │       │   │   ├── bootstrap.min.css
│   │       │   │   ├── bootstrap.min.css.map
│   │       │   │   ├── bootstrap-reboot.css
│   │       │   │   ├── bootstrap-reboot.css.map
│   │       │   │   ├── bootstrap-reboot.min.css
│   │       │   │   ├── bootstrap-reboot.min.css.map
│   │       │   │   ├── bootstrap-reboot.rtl.css
│   │       │   │   ├── bootstrap-reboot.rtl.css.map
│   │       │   │   ├── bootstrap-reboot.rtl.min.css
│   │       │   │   ├── bootstrap-reboot.rtl.min.css.map
│   │       │   │   ├── bootstrap.rtl.css
│   │       │   │   ├── bootstrap.rtl.css.map
│   │       │   │   ├── bootstrap.rtl.min.css
│   │       │   │   ├── bootstrap.rtl.min.css.map
│   │       │   │   ├── bootstrap-utilities.css
│   │       │   │   ├── bootstrap-utilities.css.map
│   │       │   │   ├── bootstrap-utilities.min.css
│   │       │   │   ├── bootstrap-utilities.min.css.map
│   │       │   │   ├── bootstrap-utilities.rtl.css
│   │       │   │   ├── bootstrap-utilities.rtl.css.map
│   │       │   │   ├── bootstrap-utilities.rtl.min.css
│   │       │   │   └── bootstrap-utilities.rtl.min.css.map
│   │       │   └── js
│   │       │       ├── bootstrap.bundle.js
│   │       │       ├── bootstrap.bundle.js.map
│   │       │       ├── bootstrap.bundle.min.js
│   │       │       ├── bootstrap.bundle.min.js.map
│   │       │       ├── bootstrap.esm.js
│   │       │       ├── bootstrap.esm.js.map
│   │       │       ├── bootstrap.esm.min.js
│   │       │       ├── bootstrap.esm.min.js.map
│   │       │       ├── bootstrap.js
│   │       │       ├── bootstrap.js.map
│   │       │       ├── bootstrap.min.js
│   │       │       └── bootstrap.min.js.map
│   │       ├── bootstrap-icons
│   │       │   ├── fonts
│   │       │   │   ├── bootstrap-icons.woff
│   │       │   │   └── bootstrap-icons.woff2
│   │       │   ├── bootstrap-icons.css
│   │       │   ├── bootstrap-icons.json
│   │       │   └── index.html
│   │       ├── boxicons
│   │       │   ├── css
│   │       │   │   ├── animations.css
│   │       │   │   ├── boxicons.css
│   │       │   │   ├── boxicons.min.css
│   │       │   │   └── transformations.css
│   │       │   └── fonts
│   │       │       ├── boxicons.eot
│   │       │       ├── boxicons.svg
│   │       │       ├── boxicons.ttf
│   │       │       ├── boxicons.woff
│   │       │       └── boxicons.woff2
│   │       ├── glightbox
│   │       │   ├── css
│   │       │   │   ├── glightbox.css
│   │       │   │   └── glightbox.min.css
│   │       │   └── js
│   │       │       ├── glightbox.js
│   │       │       └── glightbox.min.js
│   │       ├── isotope-layout
│   │       │   ├── isotope.pkgd.js
│   │       │   └── isotope.pkgd.min.js
│   │       ├── purecounter
│   │       │   └── purecounter.js
│   │       ├── remixicon
│   │       │   ├── remixicon.css
│   │       │   ├── remixicon.eot
│   │       │   ├── remixicon.less
│   │       │   ├── remixicon.svg
│   │       │   ├── remixicon.symbol.svg
│   │       │   ├── remixicon.ttf
│   │       │   ├── remixicon.woff
│   │       │   └── remixicon.woff2
│   │       ├── swiper
│   │       │   ├── swiper-bundle.min.css
│   │       │   └── swiper-bundle.min.js
│   │       └── waypoints
│   │           └── noframework.waypoints.js
│   ├── Gallery
│   │   ├── Projects
│   │   ├── 404.webp
│   │   ├── bg.webp
│   │   └── pic.webp
│   ├── favicon.ico
│   ├── manifest.json
│   └── Resume.pdf
├── styles
│   └── globals.css
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
└── README.md

28 directories, 108 files
```

# Data Files

- These files contain data varying user to user.
- User have to enter data corresponding to each file.
- Visit https://github.com/cybersaksham/Portfolio-Generator/tree/master/DataFilesMD to see each data file information

```cmd
├── Data
│   ├── About.js
│   ├── Contact.js
│   ├── Counter.js
│   ├── Portfolio.js
│   ├── Resume.js
│   └── Skills.js
└── public
    ├── Gallery
    │   ├── Projects
    │   ├── 404.webp
    │   ├── bg.webp
    │   └── pic.webp
    ├── favicon.ico
    ├── manifest.json
    └── Resume.pdf

4 directories, 12 files
```

# After Generation

## Create .env file

- Create `.env` file at root level.
- Generate OAuth client credentials for an email id at Google Developer Console.
- Add these values in that file.
- `FRONTEND_URL` is passed to enable cors features. It will allow backend requests only from given frontend.
- All these values are necesary in order to enable contact form in website.
- Adding this file is optional. If you don't add this file then people will not be able to contact you directly by your website.

```bash
# .env file
FRONTEND_URL=<Url where frontend is hosted>
MAIL_USERNAME=<Your email id>
MAIL_PASSWORD=<Your email password>
OAUTH_CLIENTID=<Generated OAuth Client ID>
OAUTH_CLIENT_SECRET=<Generated OAuth Client Secret>
OAUTH_REFRESH_TOKEN=<Generated OAuth Refresh Token>
```

## Run the Website (Development)

```bash
npm i
npm run dev
# Go to http://localhost:3000
```

## Run the Website (Build)

```bash
npm i
npm run build
npm run start
# Go to http://localhost:3000
```

## Upload to Github

```bash
# Create repository at github and copy the link
git init
git remote add <paste link here>
git add .
git commit -m "Initial commit"
git push -u origin master
```

## Deploy to Vercel

- Go to https://vercel.com/dashboard & create account with github.
- Import the repository in which you have uploaded code of website
- Add environment variables as mentioned earlier in vercel also if you want to enable contact feature in website.
- Deploy and done.

# In Future

These features may be added in future.

- Service section
- Different templates
- Other custom features

If you have any feature that may be added to the website then you can fork this repository, add that feature & create a pull request here.
