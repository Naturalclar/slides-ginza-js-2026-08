import type { ReactNode } from "react";

import avatar from "./assets/naturalclar.jpg";

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
        <h1>自分だけのGLaDOSをつくる</h1>
        <p className="sub">
          <code>{'import { Markdown, Git, ClaudeCode } from "./my-repo"'}</code>
        </p>
        <p className="subtitle">Naturalclar / naturalclar.dev</p>
        <div className="scroll-hint" aria-hidden="true">
          <span className="arrow-down" />
        </div>
      </>
    ),
    note: "タイトル。名乗って即次へ",
  },
  {
    id: "intro",
    content: (
      <>
        <img className="avatar" src={avatar} alt="" width={394} height={394} />
        <h1 className="intro-name">Naturalclar</h1>
        <p className="sub">naturalclar.dev / github.com/Naturalclar</p>
      </>
    ),
    note: "自己紹介。15秒以内で流す（つかみの0:30枠から借りる）。名前とリンクだけ、経歴は語らない。押されたら名乗りだけにして次へ",
  },
  {
    id: "what-to-talk-about",
    content: (
      <>
        <h1>今の時代、勉強会って何を話せばいい？</h1>
        <p className="sub">経験と一緒に、何が当たり前か分からなくなる</p>
      </>
    ),
    note: "0:15–0:40 前振り。初めて勉強会に来た頃はESLintすら分かっていなかった、という具体で入る。経験を積むほど「これは当たり前」と思って話さなくなる、その感覚のズレの話。ここで問いを立てて、次の2枚で答えを出す。押されたら口頭だけにしてこのスライドは飛ばす",
  },
  {
    id: "mob-programming",
    content: (
      <>
        <h1>見て学んだのは、ショートカットとターミナル捌きだった</h1>
        <p className="sub">考え方は調べられる。手元の動きは調べられない</p>
      </>
    ),
    note: "0:40–1:05 答えその1。新米の頃、モブプロで先人から学んだ話。実装に対する考え方はもちろんだが、大きかったのは使っているショートカットやターミナル捌きを見られたこと。考え方はネットにいくらでも落ちているが、ショートカットは知らなければ調べようがない。しかも人によって合う合わないがある。20〜25秒",
  },
  {
    id: "ai-same",
    content: (
      <>
        <h1>AIの使い方も、きっと同じ</h1>
        <p className="sub">何が自分に合うかは、見てみないと分からない</p>
      </>
    ),
    note: "1:05–1:25 答えその2、デモへの導線。AIで何かを作った記事も活用法の記事も無数にあるが、何が自分に合うかは実際に見てみないと分からない。だから今日は、自分がどうAIを使っているかをそのまま見せる、と宣言してデモに入る。「初歩的すぎると感じるかもしれない。自分ならこうする、を後で聞かせてほしい」と一言添えて質疑に伏線を張る。20秒。押されたらこの1枚に前スライドの内容をまとめて15秒で",
  },
  {
    id: "demo",
    content: <h1>デモ</h1>,
    note: "1:25–2:55 本体。今日のノート（デモ用に用意したもの）を開いて、①朝: ブランチが切られノートが生成されPRが開く ②昼: 日記を書くとAIの提案が更新されコミットされる ③夜: 1日がPRごとmainにマージされ、1日=1コミットになる、を見せる。オフライン対策: ローカルで完結。保険: 30秒録画を別ウィンドウに。絶対に削らない",
  },
  {
    id: "structure",
    content: (
      <>
        <h1>中身はこれだけ</h1>
        <p className="flow">
          Markdown のノート → スキル（手順書）→ Git
        </p>
      </>
    ),
    note: "デモ直後に1枚で全体像。ノートはただのMarkdown、スキルはただの手順書、保存はただのgit push。特別なアプリは1つもない",
  },
  {
    id: "anywhere",
    content: (
      <>
        <h1>どこからでも、1日を回す</h1>
        <p className="sub">iPad + Tailscale + Termius → tmux</p>
      </>
    ),
    note: "2:55–3:20 経路は2つある。①スマホ: Claudeのモバイルアプリからスキルを叩く。セッションは使い捨てのコンテナなので、スキル側が必ずcommitとpushまでやる——状態をセッションに置かない設計。②腰を据えるとき: iPad miniからTailscale経由でMacにSSH、Termiusで繋いでtmuxにアタッチし、Claude Codeをそのまま動かす。tmux new -A -s main なので切れても同じセッションに戻れる。ルータもファイアウォールも触っていない。20〜25秒。押されたら「状態はセッションではなくGitにある」の一言だけ残す",
  },
  {
    id: "llm-and-scripts",
    content: (
      <>
        <h1>判断はLLM、書き換えは冪等なスクリプト</h1>
        <p className="sub">
          ノートを書き換えるのは <code>Deno + TypeScript</code> の MCP サーバ
        </p>
      </>
    ),
    note: "3:20–4:55 技術の芯その1、95秒。【削る順②は消化済み】圧縮版なので結論から言う: 判断はLLM、書き換えは決定的で冪等なスクリプト。LLMに直接ファイルを触らせない——この分担がシステムを壊さないコツ。具体はスライドに出ているMCPサーバの1点だけ。Ginza.jsなので「書き換え側はTypeScript」は拾ってもらえるはず。外部データとの同期の詳細には踏み込まない。さらに押されたら結論の1文だけ残す",
  },
  {
    id: "failures",
    content: (
      <>
        <h1>失敗した話を3つ</h1>
        <p className="sub">どれも、運用して初めて出た仕様のバグ</p>
      </>
    ),
    note: "4:55–5:10 導入15秒。うまくいった話より失敗の話をする、と宣言して次へ。ここから3枚は1枚45秒ずつ。絶対に削らない",
  },
  {
    id: "failure-holiday",
    content: (
      <>
        <h1>祝日を「昨日は何もしていない」と報告された</h1>
        <p className="sub">休みの日は、空の日じゃない</p>
      </>
    ),
    note: "5:10–5:55。①前日を振り返る処理が、祝日を「タスクの記録がない日」として扱っていた。人間にとって休みは意図して休んだ日で、空白ではない。カレンダーを見ていないことが原因。日付の扱いは仕様の問題だという例",
  },
  {
    id: "failure-song",
    content: (
      <>
        <h1>「怪獣」と「怪獣の花唄」を取り違えた</h1>
        <p className="sub">曲名の部分一致は、黙って間違える</p>
      </>
    ),
    note: "5:55–6:40。②曲名を部分一致で照合していて、別の曲に当ててしまった。エラーにならず、それらしい結果が返るのが厄介なところ。会場で一番伝わる例なので、ここは間を取る",
  },
  {
    id: "failure-duplicate",
    content: (
      <>
        <h1>重複チケットを「完了」にして消そうとした</h1>
        <p className="sub">重複は、終わった仕事じゃない</p>
      </>
    ),
    note: "6:40–7:25。③重複した項目を消すのに「完了」を使おうとした。完了にすると、やった仕事として記録に残ってしまう。正しくは行ごと消す。どう消すかは仕様であって実装の細部ではない、で締めて次へ",
  },
  {
    id: "two-weeks",
    content: <h1>2週間で、朝の「今日何やるんだっけ」が消えた</h1>,
    note: "【本番では飛ばす】前半を厚くしたぶん、この45秒をここで回収する。時間が余ったときだけ戻す。以下は戻す場合の内容。後日談。毎朝の立ち上がりの摩擦がなくなった。スキルは足すたびに翌日から使える——作って終わりではなく、毎日使うものだけが残った。【削る順①】最初から落とす前提。押されていなければ戻す",
  },
  {
    id: "spinoff",
    content: (
      <>
        <h1>この運用から生まれたもの</h1>
        <p className="sub">medley generator</p>
        <ul className="links">
          <li>smashcat.dev/medley-generator/</li>
        </ul>
      </>
    ),
    note: "7:25–7:55 一例紹介、30秒厳守。配信のセトリを自動で組むWebサービス。バニラのHTML + JSでフレームワークなし、GitHub Pages。日記に書いた思いつきが当日デプロイまで行き、今も毎日使っている。日誌の記録がそのまま初期データになった。「運用のなかで思いつきが形になる」実例として30秒で流す。押されても削らない——30秒厳守で必ず触れる",
  },
  {
    id: "operate",
    content: <h1>完成させるな、運用しろ</h1>,
    note: "7:55–9:00 まとめ。【削る順③】後半は落とす前提。AIがコードを書く時代、作ること自体は安くなった。価値が残るのは、運用して初めて分かる失敗と、それを直すループを持っていること。押されていなくても後半は落とす。さらに押されたら1行目で締める",
  },
  {
    id: "links",
    content: (
      <>
        <h1 className="link-heading">リンク</h1>
        <ul className="links">
          <li>naturalclar.dev</li>
          <li>blog.naturalclar.dev</li>
          <li>smashcat.dev/medley-generator/</li>
        </ul>
      </>
    ),
    note: "最後に出しっぱなし。質疑の間ずっと映す。ブログに詳細記事を書く予定と一言",
  },
  {
    id: "qa",
    content: <h1>質疑</h1>,
    note: "9:00–10:00。想定質問: ノートが壊れたら？（全部Gitなので戻せる）／スキルってどう書く？（Markdownの手順書、コードじゃない）／会社のタスク管理とどう繋いでる？（読み取り同期のみ・書き込みは慎重に）／料金は？",
  },
];
