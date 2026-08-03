const BlogPost = require('../models/BlogPost');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { cloudinary, isConfigured } = require('../config/cloudinary');

// Stream an in-memory buffer to Cloudinary, resolving with the upload result.
function uploadBuffer(buffer, options) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
    stream.end(buffer);
  });
}

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

// POST /api/blog/upload-image  (admin, multipart field "file")
// Uploads an inline image for the Markdown editor and returns its URL.
const uploadImage = asyncHandler(async (req, res) => {
  if (!isConfigured()) {
    throw new ApiError(503, 'Image storage is not configured (CLOUDINARY_URL missing).');
  }
  if (!req.file) throw ApiError.badRequest('No file provided (expected field "file")');
  if (!req.file.mimetype.startsWith('image/')) {
    throw ApiError.badRequest('Only image files are allowed');
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: 'buzzaphq/blog',
    resource_type: 'image',
    use_filename: true,
    unique_filename: true,
  });

  res.status(201).json({ status: 'success', url: result.secure_url });
});

module.exports = { listPublished, getBySlug, listAll, createPost, updatePost, deletePost, uploadImage };
