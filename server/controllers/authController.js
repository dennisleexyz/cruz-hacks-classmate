export function isAuthenticatedController(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.statusCode = 401;
    res.redirect('/not-signed-in');
  }
}
