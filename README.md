#Nextjs Material UI Progressive Web App (PWA) Template

Template for creating progressive web apps with [MaterialUI](https://mui.com/), [Next.js](https://nextjs.org/) and [Workbox][https://developer.chrome.com/docs/workbox/]

Working demo: https://material-pwa.vercel.app/

## Motivation

Setting up PWA's involves a lot of moving parts, so I've decided to create a template repository, that I would always keep up to date, and it will enable me to get started quickly.

## Layout

Application supports both desktop and mobile layouts.

Desktop layout has a sidebar on the left side that can open and close.
![desktop layout](./doc-assets/desktop-layout.gif)

Mobile layout has two options.

- Traditional layout with sidebar that can be swiped to open/close

![mobile layout](./doc-assets/mobile-layout.gif)

- Modern layout where menu items are layout at the bottom

## Theming

- There are two themes dark and light, and they can easily be customized.

## Onboarding slideshow

I've also included an Onboarding slideshow which is usually present in native apps. This is optional ind it can easily be removed.

//TODO - image

## Pwa

Ther real hard part of creating pwa's is service worker integration, both in the build process and in production.
Service worker functionality is implemented with the excelent [Workbox library](https://developer.chrome.com/docs/workbox/)

### service worker setup

- Service worker [`sw.js`](./src/lib/client/service-worker/sw.ts) is written in Typescript and it will be compiled togheter with the rest of the code. Workbox in combination with Next.js needs special setup [`workbox.webpack.config.js`](./workbox.webpack.config.js). Service worker will precache all the routes, images, css and google fonts. Every time the app is built new cachec manifest is created.

Offline fallbacke is provided, if `navigation` happens when there is no networker, fallback page will be shown. Please note that the fallabkac files must be pure html,css, and js (no react, or css-in-js libraries). Fallback files need to be placed in the `public` directory.

When the service worker is installed, the application will show a prompt to reolad the applactions so the new service worker can take over.

Application also has a custom prompt for the installation of the app. Please note that installation prompt only works on the deskopt OS'es and Android, no IOS.

Applicaton also has set some demo shoctus whicch show up if the application is installed. You can read more about PWA Shortcuts at [Get things done quickly with app shortcuts](https://web.dev/app-shortcuts/)

## Custom Babel.js config

There is a custom babel configuration, that enables you to have a couple of custom `env` var that can be used when compiling the application:

`__VERSION__`: app version, taken from `package.json` version,
`__DEV__`: true if application is runnin in dev mod
`__BUILD_DATE__`: app build date taken from the git commit
`__COMMIT_SHA__`: git commit sha
`__BRANCH__`: branch name,
`__COMMIT_MESSAGE__`: git commit message

If you don't need these `env` variables, you can remove babel config and use [Next.js compiler](https://nextjs.org/docs/advanced-features/compiler) which will increase compilation speed.

## Future

This template will be kept up to date. In the future I might create similar templates for [Mantine library](https://mantine.dev/) and [Chakra-UI](https://chakra-ui.com/)

If you have suggestions on how this process could be improved, feel free to open an issue or pull a request.

## Blog post

I will eventually write a blog post detailing the whole setup process. You can follow me on [Twitter](https://twitter.com/iki_xx) or on [Dev.to](https://dev.to/ivandotv)
to be notified of new blog posts.

## Useful links

If you want to learn more about create progressive web apps with great user experience make you go through these links:

- dfad
- adf
- adfa

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

Image credits (https://2.flexiple.com/scale/all-illustrations?search=app)
