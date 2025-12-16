interface Author{
    id: number;
    name: string;
    image?: string;
}

interface Tag{
    id: number;
    name: string;
}

interface Question{
    id: number;
    title: string;
    content: string;
    description: string;
    tags: Tag[] ;
    author:Author;
    upvotes: number;
    answers: number;
    views: number;
    createdAt: string;
}