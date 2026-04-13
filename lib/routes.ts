export const routeAccess: Record<string, string[]> = {
  "/admin(.*)":   ["admin"],
  "/doctor(.*)":  ["doctor"],
  "/patient(.*)": ["patient"],
};