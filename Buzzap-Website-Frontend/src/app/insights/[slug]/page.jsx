'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { getPostBySlug } from '@/lib/api';
import MarkdownContent from '@/components/MarkdownContent';
import './article.css';

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

export default function ArticlePage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getPostBySlug(slug)
      .then((data) => setPost(data.post))
      .catch((err) => {
        if (err.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <main className="article-page">
      <div className="article-glow" />
      <div className="article-container">
        <Link href="/insights" className="article-back">
          <ArrowLeft size={15} /> All insights
        </Link>

        {loading ? (
          <p className="article-status">Loading…</p>
        ) : notFound || !post ? (
          <div className="article-status">
            <h1 className="article-title">Article not found</h1>
            <p>This post may have been unpublished or moved.</p>
          </div>
        ) : (
          <article>
            {post.tags?.length > 0 && (
              <div className="article-tags">
                {post.tags.map((t) => (
                  <span key={t} className="article-tag">{t}</span>
                ))}
              </div>
            )}
            <h1 className="article-title">{post.title}</h1>
            <div className="article-meta">
              {post.author?.name && <span>{post.author.name}</span>}
              {post.author?.name && <span className="article-meta-sep">·</span>}
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            {post.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.coverImage} alt={post.title} className="article-cover" />
            )}

            {/* Rich Markdown content: text, images, and youtube/video embeds. */}
            <div className="article-content">
              <MarkdownContent content={post.content} />
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
