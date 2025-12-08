What,why NextJs??
-Just like we are use React- React is library which is use for ui. whenever we want use routing we are use additional libarary react-router-dom. 
-React use client side rendering (CSR). react break seo(search engine optamization) of our website. 

1. What is Client-Side Rendering (CSR)?
-Imagine you order food online.
-When you open the app, the app loads first.
-After loading, the app fetches data (menu, prices) from the server and shows it to you.
->The browser (client) loads a blank HTML file → React JS loads → React fetches data → React builds UI on the browser.

*In CSR:
-Server only gives a simple empty HTML file
-JavaScript runs in the browser
-Browser builds the page after downloading React bundle
-First load is slower
-But after that, navigation becomes super fast because pages load without refresh

*React (CSR only)
-Browser creates UI
-Server sends empty HTML
-Not good for SEO
-Slower first load

2. What is SSR (Server-Side Rendering)?
-Imagine you go to a restaurant and order a pizza.
-The chef prepares the pizza in the kitchen (server).
-When it arrives at your table, it is already ready to eat.
-SSR works the same way.
-The server prepares the HTML content and sends a ready-made page to the browser.

*How SSR Works -
-Browser requests a page
-Server runs the page logic (fetch API, DB calls, etc.)
-Server converts React components → HTML
-Browser receives a fully built page
-React hydrates the page (makes it interactive)

Next.js uses multiple rendering methods, not only CSR.
Next.js supports:
✔ CSR (Client Side Rendering) – same as React
✔ SSR (Server Side Rendering) – HTML generated on server
✔ SSG (Static Site Generation) – HTML generated at build time
✔ ISR (Incremental Static Regeneration) – HTML regenerated in background

So Next.js = full control over rendering, React = only CSR.
------------------------------------------------------------------------------------------------------------
Official Docs -
What is Next.js?
Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.

It also automatically configures lower-level tools like bundlers and compilers. You can instead focus on building your product and shipping quickly.

Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.

------------------------------------------------------------------------------------------------------------

By default all pages are server side renderig- means when we try to use hooks in our component then its through an errror. for solve this error we use 
"use client". That means this component is client side rendering.
