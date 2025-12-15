import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ja } from "zod/locales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIconClassName = (iconName: string) => {
  const normalizedIconName = iconName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  const techMap:{[key:string]:string}= {
    javascript: "devicon-javascript-plain",
    react: "devicon-react-original",
    css: "devicon-css3-plain",
    html: "devicon-html5-plain",
    python: "devicon-python-plain",
    java: "devicon-java-plain",
    ruby: "devicon-ruby-plain",
    php: "devicon-php-plain",
    csharp: "devicon-csharp-plain",
    go: "devicon-go-plain",
    rust: "devicon-rust-plain",
    typescript: "devicon-typescript-plain",
  }
  return techMap[normalizedIconName] ? `${techMap[normalizedIconName]} colored` : "devicon-code-plain";
}