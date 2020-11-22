exports.upvote = async (req, res) => {
  const { id } = req.user;

  if (req.answer) {
    req.answer.vote(id, 1);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, 1);
  return res.json(question);
};

exports.downvote = async (req, res) => {
  const { id } = req.user;

  if (req.answer) {
    req.answer.vote(id, -1);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, -1);
  return res.json(question);
};

exports.unvote = async (req, res) => {
  const { id } = req.user;

  if (req.answer) {
    req.answer.vote(id, 0);
    const question = await req.question.save();
    return res.json(question);
  }
  const question = await req.question.vote(id, 0);
  return res.json(question);
};

exports.upvoteB = async (req, res) => {
  const { id } = req.user;
  const blog = await req.blog.vote(id, 1);
  return res.json(blog);
};

exports.downvoteB = async (req, res) => {
  const { id } = req.user;

  const blog = await req.blog.vote(id, -1);
  return res.json(blog);
};

exports.unvoteB = async (req, res, next) => {
  const { id } = req.user;
  
  const blog = await req.blog.vote(id, 0);
  return res.json(blog);

};
