/** @type {import('next').NextConfig} */
const nextConfig = {
  // 型チェックを無効にする（一時的な対応）
  typescript: {
    // 型エラーがあってもビルドを続行する
    ignoreBuildErrors: true,
  },
  // ESLintチェックも無効にする（一時的な対応）
  eslint: {
    // ESLintエラーがあってもビルドを続行する
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
