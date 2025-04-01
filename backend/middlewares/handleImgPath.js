export default function handleImgPath(req, res, next) {
  req.imagePath = `${req.protocol}://${req.get('host')}/img/`;
  next();
}
