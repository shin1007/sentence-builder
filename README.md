# 英単語ならべ

英語学習者（小学生〜高校生）向けの、英単語ならべかえ PWA ゲームです。日本語の文を見て、シャッフルされた単語タイルをタップして正しい語順の英文を組み立てます。

## 特徴

- **横画面固定**: スマホを縦に持っていても、CSS で画面を自動回転させて常に横画面でプレイできます（`useForcedLandscape` フック）。フルスクリーン + Screen Orientation API のロックも対応端末では試みます。
- **3段階の難易度**: 小学生コース（基本文型）/ 中学生コース（時制・比較級など）/ 高校生コース（関係代名詞・受動態など）。各コース 18問のプールからランダムに10問出題。
- **ゲーム性のある演出**:
  - タイマーバー（残り時間で色が変化し、残り5秒でピンチ演出＆カウント音）
  - コンボ倍率・ハート（ライフ）・スコアポップアップ
  - 正解時のコンフェッティ演出、不正解時の画面シェイク＆フラッシュ
  - ベストスコア・星評価（1〜3）をローカル保存
- **サウンドエフェクト**: 外部音声ファイルなしで、Web Audio API によりすべての効果音をリアルタイム合成。オフラインでも完全に動作します。
- **PWA**: `vite-plugin-pwa` によりオフラインキャッシュ・ホーム画面への追加に対応。

## 開発

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド（型チェック + PWA生成）
npm run preview  # ビルド結果のプレビュー
npm run lint      # oxlint
```

## アイコン生成

`public/` 内のアプリアイコン（マスカブルアイコン含む）は `scripts/icon-gen/` の HTML を Playwright でスクリーンショットして生成しています。再生成する場合:

```bash
node scripts/icon-gen/generate.cjs
```

## ディレクトリ構成

```
src/
  audio/soundEngine.ts     Web Audio API による効果音合成
  hooks/                   useSound, useForcedLandscape
  context/SoundContext.tsx サウンド状態の共有
  data/                    levels.ts, questions.ts（問題バンク）
  components/              画面・UIコンポーネント
  utils/storage.ts         ベストスコアの永続化 (localStorage)
```
