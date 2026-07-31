const BlogPost = require('../models/BlogPost');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// ---- Public ----

// GET /api/blog  — published posts only (list view for the marketing site)
const listPublished = asyncHandler(async (req, res) => {
  const { tag, page, limit } = req.query;
  const filter = { published: true };
  if (tag) filter.tags = tag;

  const skip = (page - 1) * limit;
  const [posts, total] = await Promise.all([
    BlogPost.find(filter)
      .select('title slug excerpt coverImage tags publishedAt')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit),
    BlogPost.countDocuments(filter),
  ]);

  res.status(200).json({
    status: 'success',
    results: posts.length,
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
    posts,
  });
});

// GET /api/blog/:slug  — a single published post by slug
const getBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, published: true }).populate(
    'author',
    'name'
  );
  if (!post) throw ApiError.notFound('Post not found');
  res.status(200).json({ status: 'success', post });
});

// ---- Admin ----

// GET /api/blog/admin/all  — every post (draft + published)
const listAll = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 }).populate('author', 'name');
  res.status(200).json({ status: 'success', results: posts.length, posts });
});

// POST /api/blog
const createPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.create({ ...req.body, author: req.user._id });
  res.status(201).json({ status: 'success', post });
});

// PATCH /api/blog/:id
const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');

  Object.assign(post, req.body);
  await post.save(); // save so slug/publishedAt hooks run
  res.status(200).json({ status: 'success', post });
});

// DELETE /api/blog/:id
const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');
  res.status(204).send();
});

module.exports = { listPublished, getBySlug, listAll, createPost, updatePost, deletePost };
