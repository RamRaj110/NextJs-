const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    BLOG: '/blog',
    SERVICES: '/services',
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    ASK_QUESTION: '/ask-question',
    PROFILE:(id: number) => `/profile/${id}`,
    QUESTION:(id: number) => `/question/${id}`,
    TAGS: (id: number) => `/tags/${id}`,
}

export default ROUTES;