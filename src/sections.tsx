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
        <pre className="ascii" aria-hidden="true">{`             | |
          .-"""""-.
        .'  _____  '.
       /  .'     '.  \\
      |  |   .-.   |  |
      |  |  ( o )  |  |
      |  |   '-'   |  |
       \\  '._____.'  /
        '.         .'
          '-.....-'
`}</pre>
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
        <p className="sub">another ball で avvy（配信アプリ）をつくっています</p>
        <p className="sub">毎日配信 / Linearでタスク管理 / 筋トレと楽器</p>
      </>
    ),
    note: "〜0:15 自己紹介。15秒で言い切る。配信アプリの会社でavvyを作っていて、そのドッグフーディングで自分も毎日配信している。仕事のタスクはLinear、空き時間は筋トレと楽器。この3つが後の「GLaDOSにやらせていること」にそのまま対応するので、ここで並べておくと次が速い。経歴は語らない",
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
    id: "what-it-does",
    content: (
      <>
        <h1>GLaDOSにやらせていること</h1>
        <ul className="links rows">
          <li>
            <span>配信</span>
            <span>今日の話題を決める</span>
          </li>
          <li>
            <span>仕事</span>
            <span>Linearのタスクを取り込む</span>
          </li>
          <li>
            <span>からだ</span>
            <span>筋トレと楽器の練習メニュー</span>
          </li>
        </ul>
      </>
    ),
    note: "1:25–1:50 デモの前置き、25秒。自己紹介で挙げた3つが、そのまま毎日の判断対象になっている。配信は今日の話題、仕事はLinearからの読み取り同期、からだは前の数日を見て部位が偏らないようにメニューを組む。これを先に言っておくと、次のデモで画面に出るものを説明せずに済む。押されたら口頭だけにしてこのスライドは飛ばす",
  },
  {
    id: "demo",
    content: <h1>デモ</h1>,
    note: "1:50–3:20 本体。今日のノート（デモ用に用意したもの）を開いて、①朝: ブランチが切られノートが生成されPRが開く ②昼: 日記を書くとAIの提案が更新されコミットされる ③夜: 1日がPRごとmainにマージされ、1日=1コミットになる、を見せる。オフライン対策: ローカルで完結。保険: 30秒録画を別ウィンドウに。ここで「配信のセトリを組むmedley generatorも、日記に書いた思いつきから当日デプロイまで行った」と一言だけ口頭で触れる——スライドには出さない。絶対に削らない",
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
    id: "skills",
    content: (
      <>
        <h1>1日を回しているスキル</h1>
        <ul className="links rows">
          <li>
            <span>朝</span>
            <span>prepare-day → linear-todo → daily-suggestion</span>
          </li>
          <li>
            <span>日中</span>
            <span>diary / show-today</span>
          </li>
          <li>
            <span>夜</span>
            <span>close-day</span>
          </li>
        </ul>
        <p className="sub">ぜんぶで14個。どれもMarkdownの手順書</p>
      </>
    ),
    note: "3:20–3:40 デモで見せた朝・昼・夜が、そのままスキル名になっている。prepare-dayがブランチを切ってノートを作りPRを開く（new-noteはこの中で呼ばれるので単独では出さない）、linear-todoがLinearからその日のタスクを読み取り同期する、diaryが日記を書いて提案を更新してcommitとpushまでやる、close-dayがそのPRをsquash mergeして1日=1コミットにする。コードではなくMarkdownの手順書なので、足すのも直すのも文章を書くだけ。linear-todoは次の「判断はLLM」の実例でもあるので、ここで名前だけ置いておくと繋がる。名前を読み上げず「こういう粒度で切ってあります」で流す。20秒",
  },
  {
    id: "anywhere",
    content: (
      <>
        <h1>どこからでも、1日を回す</h1>
        <ul className="links rows">
          <li>
            <span>iPhone / iPad mini</span>
            <span>Tailscale経由でSSH、tmuxにアタッチ</span>
          </li>
          <li>
            <span>iPad</span>
            <span>Jump Desktopでデスクトップごと</span>
          </li>
        </ul>
        <p className="sub">状態はセッションではなくGitにある</p>
      </>
    ),
    note: "3:40–4:15 経路は2つある、35秒。①iPhoneとiPad miniからはTailscale経由でMacにSSH（クライアントはTermius）、tmux new -A -s main でアタッチしてClaude Codeをそのまま動かす。切れても同じセッションに戻れる。②iPadからはJump Desktopでデスクトップごとリモート接続する。ルータもファイアウォールも触っていない。補足として、Claudeのモバイルアプリからスキルを叩く軽い経路もあり、そちらはセッションが使い捨てコンテナなのでスキル側が必ずcommitとpushまでやる。押されたら「状態はセッションではなくGitにある」の一言だけ残す",
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
    note: "4:15–5:30 技術の芯その1、75秒。【削る順②は消化済み】圧縮版なので結論から言う: 判断はLLM、書き換えは決定的で冪等なスクリプト。LLMに直接ファイルを触らせない——この分担がシステムを壊さないコツ。具体はスライドに出ているMCPサーバの1点だけ。Ginza.jsなので「書き換え側はTypeScript」は拾ってもらえるはず。外部データとの同期の詳細には踏み込まない。さらに押されたら結論の1文だけ残す",
  },
  {
    id: "handoff-problem",
    content: (
      <>
        <h1>困りごとはここ、作業はあっち</h1>
        <p className="sub">ノートに書いたタスクを、別のリポジトリまで運べなかった</p>
      </>
    ),
    note: "5:30–6:10 当初の問題。日誌に「これ直したい」と書くのはこのリポジトリ、実際に手を動かすのは別のリポジトリ。渡すたびに、背景・今どうなっているか・何をしてほしいかを手で説明し直していた。しかも日誌の記述は古くなっていることがあるので、そのまま渡すと嘘を渡すことになる。40秒",
  },
  {
    id: "handoff-sendmessage",
    content: (
      <>
        <h1>SendMessage で、隣のセッションに渡す</h1>
        <p className="sub">
          調べて <code>HANDOFF-*.md</code> を置き、向こうのセッションに知らせる
        </p>
      </>
    ),
    note: "6:10–6:55 解決。Claude Codeにセッション間メッセージングが入って楽になった。handoffスキルの流れ: ①渡す先のリポジトリを実際に調べる（日誌の思い込みではなく現状を確認）②背景・現状・Gap分析・やること・検証手順を書いた自己完結のHANDOFF-*.mdを置く ③そのリポジトリで動いているセッションを見つけてSendMessageで知らせる ④向こうが終わると返信がこちらに戻る。45秒",
  },
  {
    id: "handoff-text-only",
    content: (
      <>
        <h1>渡るのはテキストだけ</h1>
        <p className="sub">履歴もファイルも権限も渡らない。だから書面が要る</p>
      </>
    ),
    note: "6:55–7:30 含意。セッション間で渡るのはプレーンテキスト1通だけで、会話履歴もファイルも権限も一緒には行かない。だから「調べて自己完結の文書を書く」工程が必要になる——人間同士の引き継ぎと同じで、口頭の勢いは渡らない。ここが一番の学びだったと言って次へ。35秒",
  },
  {
    id: "two-weeks",
    content: <h1>2週間で、朝の「今日何やるんだっけ」が消えた</h1>,
    note: "【本番では飛ばす】前置きを1枚足したぶんをここで回収する。時間が余ったときだけ戻す。以下は戻す場合の内容。後日談、30秒。毎朝の立ち上がりの摩擦がなくなった。スキルは足すたびに翌日から使える——作って終わりではなく、毎日使うものだけが残った。【削る順①】押されたらここを落とす。芯ではないが、運用が続いている証拠なので優先度は高い",
  },
  {
    id: "operate",
    content: <h1>完成させるな、運用しろ</h1>,
    note: "7:50–9:00 まとめ。※7:30–7:50は予備枠（20秒）。前半が押していればここで吸収され、押していなければ締めに間を取れる。【削る順③】後半は落とす前提。AIがコードを書く時代、作ること自体は安くなった。価値が残るのは、運用して初めて分かる失敗と、それを直すループを持っていること。押されていなくても後半は落とす。さらに押されたら1行目で締める",
  },
  {
    id: "thanks",
    content: (
      <>
        <h1>ありがとうございました</h1>
        <ul className="links rows">
          <li>
            <span>ブログ</span>
            <span>blog.naturalclar.dev</span>
          </li>
          <li>
            <span>SendMessage</span>
            <span>code.claude.com/docs/en/cross-session-messaging</span>
          </li>
        </ul>
      </>
    ),
    note: "9:00–10:00。この1枚を出しっぱなしにして、質問は口頭で募る（「何かありますか？」）。リンクが映ったままなので、質疑の間ずっと参照できる。ブログに詳細記事を書く予定と一言。SendMessageのリンクは公式ドキュメント——「渡るのはテキストだけ」の根拠がここに書いてあるので、聞かれたらここを見てもらう。想定質問: ノートが壊れたら？（全部Gitなので戻せる）／スキルってどう書く？（Markdownの手順書、コードじゃない）／会社のタスク管理とどう繋いでる？（読み取り同期のみ・書き込みは慎重に）／料金は？（実際の使用感で答える）。会社とプロダクトの名前は自分のものなので出してよい。出さないのはチケットID・リスナー名・実際のタスク内容",
  },
];
