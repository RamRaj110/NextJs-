const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    BLOG: '/blog',
    SERVICES: '/services',
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    ASK_QUESTIONS: '/ask-questions',
    PROFILE:(id: number) => `/profile/${id}`,
    TAGS: (id: number) => `/tags/${id}`,
}

export default ROUTES;