interface SignWithOAuthParams {
  provider: "github" | "google";
  providerAccountId: string;
  user: {
    email: string;
    name: string;
    image: string;
    username: string;
  };
}

interface AuthCredentials {
  name: string;
  username: string;
  email: string;
  password: string;
}

type IUserDoc = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
};

type IAccountDoc = {
  userId: string;
  name: string;
  provider: string;
  providerAccountId: string;
  password?: string;
};

type ITagDoc = {
  id: string;
  name: string;
  questionCount: number;
};

export interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}
export interface EditQuestionParams extends CreateQuestionParams {
  questionId: string;
}

export interface getQuestionsParams {
  questionId: string;
}

interface GetTagQuestionsParams extends Omit<PaginatedSearchParams, "filter"> {
  tagId: string;
}
