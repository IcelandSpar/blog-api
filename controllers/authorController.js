const prisma = require('../db/prismaClient');

const getAuthorAbout = async (req, res) => {
  const authorData = await prisma.authors.findFirst({
    where: {
      id: req.params.userId,
    },
    select: {
      id: true,
      bio: true,
      user: {
        omit: {
          password: true,
        }
      }
    }
  });
  res.json(authorData);
};



module.exports = {
getAuthorAbout,
}