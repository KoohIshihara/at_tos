const scenario = [
  {
    id: "COME_BACK",
    type: "selection",
    message: [
      "ああ、君か。また会えて嬉しいよ。",
      "またダイバース力を計測しにきたんだね？"
    ],
    selection: [
      { label: "はい", next: "COME_BACK2" },
      { label: "そうだよ", next: "COME_BACK2" }
    ]
  },
  {
    id: "COME_BACK2",
    type: "ask_tags",
    message: [
      "${diverseManNum}号さんのことを３つ以内のタグで、",
      "表現してみてください。",
      "これらのタグでダイバース力が計測されます。"
    ],
    next: "5-1"
  },
  {
    id: "START_AS_FIRST",
    type: "normal",
    message: [
      "この私を見つけてくれたのは、",
      "君がはじめてだよ。あー寂しかった。"
    ],
    next: "START",
  },
  {
    id: "START_WITH_GUYS",
    type: "normal",
    message: [
      "この私を見つけてくれたのは、",
      "君で${diverseManNumViaHere}人目になるね。"
    ],
    next: "START",
  },
  {
    id: "START",
    type: "selection",
    message: [
      "どうも、こんにちは僕の名前はダイバースマン。",
      "好きな食べ物は卵とキャラメル......。"
    ],
    selection: [
      { label: "こんにちは", next: "1-1" }
    ]
  },
  {
    id: "1-1",
    type: "normal",
    message: [
      "私が何者かって？",
      "私はあなたです。",
      "まあお話しているうちに分かってきますよ。"
    ],
    next: "1-2",
  },
  {
    id: "1-2",
    type: "normal",
    message: [
      "現在、私......というよりも私達は",
      "全部で${diverseManNum}人います。"
    ],
    next: "2-1",
  },
  {
    id: "2-1",
    type: "selection",
    message: [
      "突然ですが、あなたもダイバースマンに",
      "なってみませんか？",
      "君で${diverseManNewNum}人目だよ。"
    ],
    selection: [
      { label: "はい", next: "3-1", action: "saveUser" },
      { label: "いいよ", next: "3-1", action: "saveUser" }
    ]
  },
  {
    id: "3-1",
    type: "selection",
    message: [
      "では、ダイバースマン${diverseManNewNum}号さん。",
      "ようこそ、ダイバースマンへ。",
      "よろしくね。"
    ],
    selection: [
      { label: "よろしく", next: "4-1" }
    ]
  },
  {
    id: "4-1",
    type: "normal",
    message: [
      "では、新人ダイバースマンである",
      "あなたのダイバース力を",
      "計測してみたいとおもいます。"
    ],
    next: "4-2"
  },
  {
    id: "4-2",
    type: "ask_tags",
    message: [
      "${diverseManNewNum}号さんのことを３つ以内のタグで、",
      "表現してみてください。",
      "これらのタグでダイバース力が計測されます。"
    ],
    next: "5-1"
  },
  {
    id: "5-1",
    type: "normal",
    message: [
      "ありがとう。",
      "フフフ......。",
      "これであたしはもっと多様になりました。"
    ],
    next: "5-2"
  },
  {
    id: "5-2",
    type: "normal",
    message: [
      "さて、さっそくあなたのダイバース力を",
      "計測してみましょう。"
    ],
    action: "calc_diverse_power",
    next: "5-3"
  },
  {
    id: "5-3",
    type: "normal",
    message: [
      "・・・・・・。",
      "・・・・・・。"
    ],
    next: "5-4"
  },
  {
    id: "5-4",
    type: "normal",
    message: [
      "お前のダイバース力は・・・・・・。"
    ],
    next: "5-5"
  },
  {
    id: "5-5",
    type: "normal",
    message: [
      "${diversePower}だっ！"
    ],
    next: "5-6"
  },
  {
    id: "5-6",
    type: "normal",
    message: [
      "うん、まあまあかな"
    ],
    next: "5-7"
  },
  {
    id: "5-7",
    type: "normal",
    message: [
      "ちなみに僕の後ろに飛んでる言葉は",
      "先人のダイバースマン達のタグだよ。",
      "とっても多様だね。"
    ],
    next: "6-1"
  },
  {
    id: "6-1",
    type: "normal",
    message: [
      "これであなたも立派なダイバースマンです。",
      "こちらは他のダイバースマンから",
      "あなたへのメッセージです。"
    ],
    attachment: "quotation",
    next: "6-2"
  },
  {
    id: "6-2",
    type: "selection",
    message: [
      "君も次のダイバースマンとこの街に向けて、",
      "何かメッセージを残してみませんか？"
    ],
    selection: [
      { label: "はい", next: "8-1-1" },
      { label: "いいえ", next: "8-2" }
    ],
    attachment: "quotation"
  },
  {
    id: "8-1-1",
    type: "ask_message",
    message: [
      "ありがとう。",
      "きっと次のワタシたちも喜びます。",
      "書けたら教えてね。"
    ],
    attachment: "quotation",
    next: "8-1-2",
  },
  {
    id: "8-1-2",
    type: "normal",
    message: [
      "ありがとう。",
      "次のダイバースマンとこの街に伝えておきます。"
    ],
    attachment: "quotation",
    next: "9-1",
  },
  {
    id: "8-2",
    type: "ask_message",
    message: [
      "そうですか......",
      "では、気が向いたらまた教えて下さい。"
    ],
    next: "9-1",
  },
  {
    id: "9-1",
    type: "normal",
    message: [
      "さて、そろそろお別れだね。",
      "この度はありがとうございました。",
      "私達が排除されないように祈りましょう。"
    ],
    next: "END",
  },
  // {
  //   id: "END",
  //   type: "normal",
  //   message: [
  //     "そういや今流行りのSNSとやらをはじめたの。",
  //     "あたし達の動向はこちらでお知らせしていくよ。",
  //     "あなたが排除されるか、チェックしてみてね。"
  //   ],
  //   attachment: "follow_me"
  // }
  {
    id: "END",
    type: "normal",
    message: [
      "よければあなたのお友達にも",
      "あたし達の仲間になってもらいませんか？",
      "このページをシェアすると僕達を募集できるよ。"
    ],
    attachment: "share"
  }
]

export { scenario }