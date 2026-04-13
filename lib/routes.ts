type RouteAccessProps = {
    [key: string]: string[];
};

export const routeAccess = {
    "/admin(.*)": ['admin'],
    "/patient(.*)": ['admin', 'patient', 'doctor'],
};
