import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIconClassName = (iconName: string) => {
  // NOTE: This regex strips special characters. 
  // Ensure your input 'iconName' handles "C++" as "cpp" or "C#" as "csharp" before calling this,
  // otherwise they might both resolve to "c".
  const normalizedIconName = iconName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const techMap: { [key: string]: string } = {
    
    javascript: "devicon-javascript-plain",
    js: "devicon-javascript-plain",
    typescript: "devicon-typescript-plain",
    ts: "devicon-typescript-plain",
    python: "devicon-python-plain",
    py: "devicon-python-plain",
    java: "devicon-java-plain",
    c: "devicon-c-plain",
    cpp: "devicon-cplusplus-plain",
    cplusplus: "devicon-cplusplus-plain",
    csharp: "devicon-csharp-plain",
    cs: "devicon-csharp-plain",
    go: "devicon-go-original-wordmark",
    golang: "devicon-go-original-wordmark",
    rust: "devicon-rust-plain",
    ruby: "devicon-ruby-plain",
    php: "devicon-php-plain",
    swift: "devicon-swift-plain",
    kotlin: "devicon-kotlin-plain",
    dart: "devicon-dart-plain",
    lua: "devicon-lua-plain",
    perl: "devicon-perl-plain",
    r: "devicon-r-plain",
    scala: "devicon-scala-plain",
    elixir: "devicon-elixir-plain",
    haskell: "devicon-haskell-plain",

    // --- Frontend / UI ---
    html: "devicon-html5-plain",
    html5: "devicon-html5-plain",
    css: "devicon-css3-plain",
    css3: "devicon-css3-plain",
    sass: "devicon-sass-original",
    scss: "devicon-sass-original",
    less: "devicon-less-plain-wordmark",
    react: "devicon-react-original",
    reactjs: "devicon-react-original",
    nextjs: "devicon-nextjs-plain",  
    next: "devicon-nextjs-original",
    vue: "devicon-vuejs-plain",
    vuejs: "devicon-vuejs-plain",
    nuxtjs: "devicon-nuxtjs-plain",
    angular: "devicon-angularjs-plain",
    angularjs: "devicon-angularjs-plain",
    svelte: "devicon-svelte-plain",
    jquery: "devicon-jquery-plain",
    bootstrap: "devicon-bootstrap-plain",
    tailwindcss: "devicon-tailwindcss-original",
    tailwind: "devicon-tailwindcss-original",
    materialui: "devicon-materialui-plain",
    mui: "devicon-materialui-plain",
    redux: "devicon-redux-original",
    webpack: "devicon-webpack-plain",
    babel: "devicon-babel-plain",
    vite: "devicon-vitejs-plain",

    // --- Backend / Frameworks ---
    nodejs: "devicon-nodejs-plain",
    node: "devicon-nodejs-plain",
    express: "devicon-express-original",
    expressjs: "devicon-express-original",
    nestjs: "devicon-nestjs-plain",
    django: "devicon-django-plain",
    flask: "devicon-flask-original",
    fastapi: "devicon-fastapi-plain",
    spring: "devicon-spring-plain",
    springboot: "devicon-spring-plain",
    laravel: "devicon-laravel-plain",
    rails: "devicon-rails-plain",
    dotnet: "devicon-dot-net-plain",
    dotnetcore: "devicon-dotnetcore-plain",

    // --- Databases ---
    sql: "devicon-azuresqldatabase-plain", // Generic SQL often uses a specific DB icon or a file icon
    mysql: "devicon-mysql-plain",
    postgresql: "devicon-postgresql-plain",
    postgres: "devicon-postgresql-plain",
    mongodb: "devicon-mongodb-plain",
    mongo: "devicon-mongodb-plain",
    sqlite: "devicon-sqlite-plain",
    redis: "devicon-redis-plain",
    mariadb: "devicon-mariadb-plain",
    oracle: "devicon-oracle-original",
    firebase: "devicon-firebase-plain",
    supabase: "devicon-supabase-plain",
    cassandra: "devicon-cassandra-plain",
    graphql: "devicon-graphql-plain",

    // --- DevOps / Cloud / Tools ---
    git: "devicon-git-plain",
    github: "devicon-github-original",
    gitlab: "devicon-gitlab-plain",
    bitbucket: "devicon-bitbucket-original",
    docker: "devicon-docker-plain",
    kubernetes: "devicon-kubernetes-plain",
    k8s: "devicon-kubernetes-plain",
    aws: "devicon-amazonwebservices-original-wordmark", // or devicon-amazonwebservices-plain-wordmark
    azure: "devicon-azure-plain",
    gcp: "devicon-googlecloud-plain",
    googlecloud: "devicon-googlecloud-plain",
    heroku: "devicon-heroku-original",
    vercel: "devicon-vercel-original", // Needs updated devicon version
    netlify: "devicon-netlify-plain", // Needs updated devicon version
    linux: "devicon-linux-plain",
    ubuntu: "devicon-ubuntu-plain",
    bash: "devicon-bash-plain",
    nginx: "devicon-nginx-original",
    apache: "devicon-apache-plain",
    jenkins: "devicon-jenkins-plain",
    jira: "devicon-jira-plain",
    vscode: "devicon-vscode-plain",
    vim: "devicon-vim-plain",
    figma: "devicon-figma-plain",

    // --- Mobile ---
    android: "devicon-android-plain",
    ios: "devicon-apple-original", // Apple logo for iOS
    flutter: "devicon-flutter-plain",
    reactnative: "devicon-react-original", // Uses React icon
    ionic: "devicon-ionic-original",
  };

  return techMap[normalizedIconName]
    ? `${techMap[normalizedIconName]} colored`
    : "devicon-devicon-plain"; // Default fallback icon
};


export const getTimestamp = (createdAt: Date | string): string => {
  const now = new Date();
  const past = new Date(createdAt);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  // 1. Check for "just now" (less than 5 seconds)
  if (diffInSeconds < 5) {
    return 'just now';
  }

  // 2. Handle Seconds
  if (diffInSeconds < minute) {
    return `${diffInSeconds} seconds ago`;
  }

  // 3. Handle Minutes
  if (diffInSeconds < hour) {
    const count = Math.floor(diffInSeconds / minute);
    return `${count} ${count === 1 ? "minute" : "minutes"} ago`;
  }

  // 4. Handle Hours
  if (diffInSeconds < day) {
    const count = Math.floor(diffInSeconds / hour);
    return `${count} ${count === 1 ? "hour" : "hours"} ago`;
  }

  // 5. Handle Days
  if (diffInSeconds < week) {
    const count = Math.floor(diffInSeconds / day);
    return `${count} ${count === 1 ? "day" : "days"} ago`;
  }

  // 6. Handle Weeks
  if (diffInSeconds < month) {
    const count = Math.floor(diffInSeconds / week);
    return `${count} ${count === 1 ? "week" : "weeks"} ago`;
  }

  // 7. Handle Months
  if (diffInSeconds < year) {
    const count = Math.floor(diffInSeconds / month);
    return `${count} ${count === 1 ? "month" : "months"} ago`;
  }

  // 8. Handle Years
  const count = Math.floor(diffInSeconds / year);
  return `${count} ${count === 1 ? "year" : "years"} ago`;
};