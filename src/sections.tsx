import type { ReactNode } from "react";

export interface Section {
  /**
   * Stable identity for React's key. Navigation does not use this — slide
   * position is still the array index (and the URL hash is that index, 1-based)
   * — so renaming an id is safe, but it must stay unique.
   */
  id: string;
  content: ReactNode;
  note: string;
}

export const sections: Section[] = [
  {
    id: "title",
    content: (
      <>
        <h1>思いついた日にリリースする個人開発</h1>
        <p className="subtitle">Naturalclar / naturalclar.dev</p>
        <div className="scroll-hint" aria-hidden="true">
          <span className="arrow-down" />
        </div>
      </>
    ),
    note: "タイトル。名乗って即次へ",
  },
  {
    id: "hook",
    content: (
      <h1>配信で毎回、次に何を弾くか迷っていた</h1>
    ),
    note: "0:00\u20130:30 つかみ。長引かせない。共感を1つ取れれば十分",
  },
  {
    id: "demo",
    content: (
      <h1>デモ</h1>
    ),
    note: "0:30\u20132:00 本体。\u2460生成ボタン\u2192セトリが出る \u2461もう一度\u2192違うセトリ \u2462コピーして「これを配信で使っている」。オフライン対策: ローカルcloneを開いて待機。保険: 30秒録画を別ウィンドウに",
  },
  {
    id: "structure",
    content: (
      <>
        <h1>中身はこれだけ</h1>
        <p className="flow">
          <code>songs.json</code> → 生成ロジック → セトリ
        </p>
      </>
    ),
    note: "デモ直後に1枚で全体像。ここで初めて構造の話",
  },
  {
    id: "no-framework",
    content: (
      <>
        <h1>フレームワークは入っていない</h1>
        <p className="sub">バニラ HTML + JS / GitHub Pages</p>
      </>
    ),
    note: "2:00\u20134:00。「入れなかった」ではなく「要らなかった」。必要になる場面が来なかったという話にする。押されたら後半を削る",
  },
  {
    id: "deploy-day",
    content: (
      <h1>思いついた日にデプロイした</h1>
    ),
    note: "4:00\u20136:00。押されたら最初に削るスライド。「毎日書いていた記録が、そのまま初期データになった」が言えると強い。【削る順①】",
  },
  {
    id: "three-days-later",
    content: (
      <h1>3日後、迷わなくなった</h1>
    ),
    note: "6:00\u20137:30 後日談。デモと並ぶ芯、絶対に削らない。作ったことより使い続けていることが効く",
  },
  {
    id: "takeaway",
    content: (
      <h1>毎日困っていることを1つ潰すほうが早い</h1>
    ),
    note: "7:30\u20139:00 まとめ。zero JS の流れ: トレンドに乗ったのではなく、トレンドが向かっている先にたまたま先にいた。押されたら後半を削る。【削る順③】",
  },
  {
    id: "links",
    content: (
      <>
        <h1 className="link-heading">リンク</h1>
        <ul className="links">
          <li>github.com/Naturalclar/medley-generator</li>
          <li>smashcat.dev/medley-generator/</li>
          <li>naturalclar.dev</li>
        </ul>
      </>
    ),
    note: "最後に出しっぱなし。質疑の間ずっと映す",
  },
  {
    id: "qa",
    content: (
      <h1>質疑</h1>
    ),
    note: "9:00\u201310:00。想定質問: 曲データはどう増やしてる？／生成ロジックは？（弾ける曲中心+練習中を1曲）／なぜWeb？（どの端末からでも開ける）",
  },
];
