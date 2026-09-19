import type { LevelId, Question } from '../types'

export const QUESTIONS: Record<LevelId, Question[]> = {
  elementary: [
    { id: 'e1', jp: 'これは私のペンです。', words: ['This', 'is', 'my', 'pen.'], note: 'This is 〜.' },
    { id: 'e2', jp: 'あの犬はとても大きいです。', words: ['That', 'dog', 'is', 'very', 'big.'], note: '形容詞' },
    { id: 'e3', jp: '私はりんごが好きです。', words: ['I', 'like', 'apples.'], note: 'I like 〜.' },
    { id: 'e4', jp: 'これはあなたのカバンですか？', words: ['Is', 'this', 'your', 'bag?'], note: 'Is this 〜?' },
    { id: 'e5', jp: '私は毎朝、朝食を食べます。', words: ['I', 'eat', 'breakfast', 'every', 'morning.'], note: '現在形' },
    { id: 'e6', jp: '彼女は上手にピアノを弾きます。', words: ['She', 'plays', 'the', 'piano', 'well.'], note: '三人称単数 s' },
    { id: 'e7', jp: 'これは何ですか？', words: ['What', 'is', 'this?'], note: '疑問詞 What' },
    { id: 'e8', jp: '私たちは公園でサッカーをします。', words: ['We', 'play', 'soccer', 'in', 'the', 'park.'], note: '場所を表す in' },
    { id: 'e9', jp: 'あなたは何色が好きですか？', words: ['What', 'color', 'do', 'you', 'like?'], note: 'Do you 〜?' },
    { id: 'e10', jp: '私のねこは魚が好きです。', words: ['My', 'cat', 'likes', 'fish.'], note: '三人称単数 s' },
    { id: 'e11', jp: 'あなたは何匹犬を飼っていますか？', words: ['How', 'many', 'dogs', 'do', 'you', 'have?'], note: 'How many 〜?' },
    { id: 'e12', jp: '彼は速く走ることができます。', words: ['He', 'can', 'run', 'fast.'], note: '助動詞 can' },
    { id: 'e13', jp: 'これらは私の本です。', words: ['These', 'are', 'my', 'books.'], note: '複数形' },
    { id: 'e14', jp: '今何時ですか？', words: ['What', 'time', 'is', 'it?'], note: '時刻の言い方' },
    { id: 'e15', jp: '私の誕生日は5月です。', words: ['My', 'birthday', 'is', 'in', 'May.'], note: '月を表す in' },
    { id: 'e16', jp: '彼らは公園で遊んでいます。', words: ['They', 'are', 'playing', 'in', 'the', 'park.'], note: '現在進行形' },
    { id: 'e17', jp: 'あなたはどこに住んでいますか？', words: ['Where', 'do', 'you', 'live?'], note: 'Where 〜?' },
    { id: 'e18', jp: '私は毎日学校へ歩いて行きます。', words: ['I', 'walk', 'to', 'school', 'every', 'day.'], note: '現在形' },
  ],
  juniorHigh: [
    { id: 'j1', jp: '私は昨日図書館へ行きました。', words: ['I', 'went', 'to', 'the', 'library', 'yesterday.'], note: '過去形' },
    { id: 'j2', jp: '彼は来週日本を訪れるつもりです。', words: ['He', 'is', 'going', 'to', 'visit', 'Japan', 'next', 'week.'], note: 'be going to' },
    { id: 'j3', jp: 'このかばんはあのかばんより高いです。', words: ['This', 'bag', 'is', 'more', 'expensive', 'than', 'that', 'one.'], note: '比較級' },
    { id: 'j4', jp: '机の上に本が一冊あります。', words: ['There', 'is', 'a', 'book', 'on', 'the', 'desk.'], note: 'There is/are' },
    { id: 'j5', jp: '私は新しい自転車が欲しいです。', words: ['I', 'want', 'to', 'buy', 'a', 'new', 'bike.'], note: 'want to 〜' },
    { id: 'j6', jp: '私たちは宿題を終わらせなければなりません。', words: ['We', 'have', 'to', 'finish', 'our', 'homework.'], note: 'have to 〜' },
    { id: 'j7', jp: 'あなたは昨夜何をしていましたか？', words: ['What', 'were', 'you', 'doing', 'last', 'night?'], note: '過去進行形' },
    { id: 'j8', jp: '雨が降っていたので、私たちは家にいました。', words: ['Because', 'it', 'was', 'raining,', 'we', 'stayed', 'home.'], note: '理由の because' },
    { id: 'j9', jp: 'もし明日晴れたら、私たちは泳ぎに行きます。', words: ['If', 'it', 'is', 'sunny', 'tomorrow,', 'we', 'will', 'go', 'swimming.'], note: '条件の if' },
    { id: 'j10', jp: '彼女はとても上手に英語を話すことができます。', words: ['She', 'can', 'speak', 'English', 'very', 'well.'], note: '助動詞 can' },
    { id: 'j11', jp: '私は先週新しい映画を見ました。', words: ['I', 'watched', 'a', 'new', 'movie', 'last', 'week.'], note: '過去形' },
    { id: 'j12', jp: 'この山は日本で一番高いです。', words: ['This', 'mountain', 'is', 'the', 'tallest', 'in', 'Japan.'], note: '最上級' },
    { id: 'j13', jp: '彼らは今、体育館でバスケットボールをしています。', words: ['They', 'are', 'playing', 'basketball', 'in', 'the', 'gym', 'now.'], note: '現在進行形' },
    { id: 'j14', jp: 'あなたは将来何になりたいですか？', words: ['What', 'do', 'you', 'want', 'to', 'be', 'in', 'the', 'future?'], note: 'want to be' },
    { id: 'j15', jp: '駅の近くに新しいレストランがあります。', words: ['There', 'is', 'a', 'new', 'restaurant', 'near', 'the', 'station.'], note: 'There is/are' },
    { id: 'j16', jp: '私は明日までにこのレポートを終える必要があります。', words: ['I', 'need', 'to', 'finish', 'this', 'report', 'by', 'tomorrow.'], note: 'need to 〜' },
    { id: 'j17', jp: '彼は去年ギターの弾き方を学びました。', words: ['He', 'learned', 'how', 'to', 'play', 'the', 'guitar', 'last', 'year.'], note: 'how to 〜' },
    { id: 'j18', jp: '私の姉は私より早く起きます。', words: ['My', 'sister', 'gets', 'up', 'earlier', 'than', 'me.'], note: '比較級' },
  ],
  highSchool: [
    { id: 'h1', jp: 'この本は多くの人々によって読まれています。', words: ['This', 'book', 'is', 'read', 'by', 'many', 'people.'], note: '受動態' },
    { id: 'h2', jp: '私は今までにそんなに美しい景色を見たことがありません。', words: ['I', 'have', 'never', 'seen', 'such', 'a', 'beautiful', 'view', 'before.'], note: '現在完了' },
    { id: 'h3', jp: '彼が話している男性は私の先生です。', words: ['The', 'man', 'who', 'is', 'talking', 'is', 'my', 'teacher.'], note: '関係代名詞 who' },
    { id: 'h4', jp: '私が昨日買った本はとても面白いです。', words: ['The', 'book', 'that', 'I', 'bought', 'yesterday', 'is', 'very', 'interesting.'], note: '関係代名詞 that' },
    { id: 'h5', jp: '彼はとても疲れていたので、早く寝ました。', words: ['He', 'was', 'so', 'tired', 'that', 'he', 'went', 'to', 'bed', 'early.'], note: 'so 〜 that' },
    { id: 'h6', jp: '雨が降っていたけれども、彼らは試合を続けました。', words: ['Although', 'it', 'was', 'raining,', 'they', 'continued', 'the', 'game.'], note: '譲歩の although' },
    { id: 'h7', jp: '彼女は将来医者になりたいと言いました。', words: ['She', 'said', 'that', 'she', 'wanted', 'to', 'be', 'a', 'doctor.'], note: '間接話法' },
    { id: 'h8', jp: 'この問題はあの問題よりずっと難しいです。', words: ['This', 'problem', 'is', 'much', 'more', 'difficult', 'than', 'that', 'one.'], note: '比較級の強調' },
    { id: 'h9', jp: '音楽を聞くことは私にとって一番の楽しみです。', words: ['Listening', 'to', 'music', 'is', 'my', 'greatest', 'pleasure.'], note: '動名詞主語' },
    { id: 'h10', jp: '私たちが訪れた都市はとても美しかったです。', words: ['The', 'city', 'that', 'we', 'visited', 'was', 'very', 'beautiful.'], note: '関係代名詞 that' },
    { id: 'h11', jp: 'この橋は100年前に建てられました。', words: ['This', 'bridge', 'was', 'built', 'a', 'hundred', 'years', 'ago.'], note: '受動態' },
    { id: 'h12', jp: '彼は忙しすぎてパーティーに来ることができませんでした。', words: ['He', 'was', 'too', 'busy', 'to', 'come', 'to', 'the', 'party.'], note: 'too 〜 to' },
    { id: 'h13', jp: '私はあなたが正しいと思います。', words: ['I', 'think', 'that', 'you', 'are', 'right.'], note: '接続詞 that' },
    { id: 'h14', jp: '何か冷たい飲み物はいかがですか？', words: ['Would', 'you', 'like', 'something', 'cold', 'to', 'drink?'], note: '不定詞の形容詞的用法' },
    { id: 'h15', jp: 'その知らせを聞いて、私はとても驚きました。', words: ['Hearing', 'the', 'news,', 'I', 'was', 'very', 'surprised.'], note: '分詞構文' },
    { id: 'h16', jp: 'これは私が今までに読んだ中で一番面白い本です。', words: ['This', 'is', 'the', 'most', 'interesting', 'book', 'I', 'have', 'ever', 'read.'], note: '最上級+現在完了' },
    { id: 'h17', jp: '彼が言ったことは本当ではありませんでした。', words: ['What', 'he', 'said', 'was', 'not', 'true.'], note: '関係代名詞 what' },
    { id: 'h18', jp: 'その少女は英語だけでなくフランス語も話せます。', words: ['The', 'girl', 'can', 'speak', 'not', 'only', 'English', 'but', 'also', 'French.'], note: 'not only 〜 but also' },
  ],
}

export function pickQuestions(levelId: LevelId, count: number): Question[] {
  const pool = [...QUESTIONS[levelId]]
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool.slice(0, Math.min(count, pool.length))
}
