const ROUTES = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    BLOG: '/blog',
    SERVICES: '/services',
    SIGNUP: '/signup',
    SIGNIN: '/signin',
    PROFILE:(id: number) => `/profile/${id}`,
    TAGS: (id: number) => `/tags/${id}`,
}

export default ROUTES;