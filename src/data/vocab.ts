/**
 * Shared EN/JP vocabulary banks used to generate many grammatically-correct
 * sentence variants per grammar template (see questions.ts). Keeping the
 * vocab here, separate from the templates, keeps each list easy to scan
 * and reuse across levels.
 */

export interface Noun {
  en: string
  jp: string
  article: 'a' | 'an'
}

export const THINGS: Noun[] = [
  { en: 'pen', jp: 'ペン', article: 'a' },
  { en: 'bag', jp: 'かばん', article: 'a' },
  { en: 'book', jp: '本', article: 'a' },
  { en: 'cap', jp: '帽子', article: 'a' },
  { en: 'ball', jp: 'ボール', article: 'a' },
  { en: 'key', jp: '鍵', article: 'a' },
  { en: 'watch', jp: '腕時計', article: 'a' },
  { en: 'bike', jp: '自転車', article: 'a' },
  { en: 'camera', jp: 'カメラ', article: 'a' },
  { en: 'umbrella', jp: '傘', article: 'an' },
  { en: 'notebook', jp: 'ノート', article: 'a' },
  { en: 'eraser', jp: '消しゴム', article: 'an' },
  { en: 'ruler', jp: '定規', article: 'a' },
  { en: 'wallet', jp: '財布', article: 'a' },
  { en: 'phone', jp: '携帯電話', article: 'a' },
  { en: 'guitar', jp: 'ギター', article: 'a' },
  { en: 'racket', jp: 'ラケット', article: 'a' },
  { en: 'kite', jp: 'たこ', article: 'a' },
  { en: 'doll', jp: '人形', article: 'a' },
  { en: 'robot', jp: 'ロボット', article: 'a' },
]

export interface AnimalWord {
  singular: string
  plural: string
  jp: string
}

export const ANIMALS: AnimalWord[] = [
  { singular: 'dog', plural: 'dogs', jp: '犬' },
  { singular: 'cat', plural: 'cats', jp: '猫' },
  { singular: 'bird', plural: 'birds', jp: '鳥' },
  { singular: 'fish', plural: 'fish', jp: '魚' },
  { singular: 'rabbit', plural: 'rabbits', jp: 'うさぎ' },
  { singular: 'horse', plural: 'horses', jp: '馬' },
  { singular: 'lion', plural: 'lions', jp: 'ライオン' },
  { singular: 'tiger', plural: 'tigers', jp: 'トラ' },
  { singular: 'bear', plural: 'bears', jp: 'クマ' },
  { singular: 'monkey', plural: 'monkeys', jp: 'サル' },
  { singular: 'elephant', plural: 'elephants', jp: 'ゾウ' },
  { singular: 'panda', plural: 'pandas', jp: 'パンダ' },
  { singular: 'fox', plural: 'foxes', jp: 'キツネ' },
  { singular: 'cow', plural: 'cows', jp: 'ウシ' },
  { singular: 'duck', plural: 'ducks', jp: 'アヒル' },
  { singular: 'pig', plural: 'pigs', jp: 'ブタ' },
  { singular: 'sheep', plural: 'sheep', jp: 'ヒツジ' },
  { singular: 'mouse', plural: 'mice', jp: 'ネズミ' },
  { singular: 'frog', plural: 'frogs', jp: 'カエル' },
  { singular: 'turtle', plural: 'turtles', jp: 'カメ' },
]

export interface FoodWord {
  plural: string
  jp: string
}

export const FOODS: FoodWord[] = [
  { plural: 'apples', jp: 'りんご' },
  { plural: 'oranges', jp: 'オレンジ' },
  { plural: 'bananas', jp: 'バナナ' },
  { plural: 'strawberries', jp: 'いちご' },
  { plural: 'grapes', jp: 'ぶどう' },
  { plural: 'melons', jp: 'メロン' },
  { plural: 'cherries', jp: 'さくらんぼ' },
  { plural: 'peaches', jp: 'もも' },
  { plural: 'pineapples', jp: 'パイナップル' },
  { plural: 'lemons', jp: 'レモン' },
  { plural: 'tomatoes', jp: 'トマト' },
  { plural: 'carrots', jp: 'にんじん' },
  { plural: 'potatoes', jp: 'じゃがいも' },
  { plural: 'onions', jp: 'たまねぎ' },
  { plural: 'cucumbers', jp: 'きゅうり' },
  { plural: 'pumpkins', jp: 'かぼちゃ' },
  { plural: 'mangoes', jp: 'マンゴー' },
  { plural: 'cookies', jp: 'クッキー' },
  { plural: 'sandwiches', jp: 'サンドイッチ' },
  { plural: 'kiwis', jp: 'キウイ' },
]

export const PLACES: Noun[] = [
  { en: 'park', jp: '公園', article: 'a' },
  { en: 'library', jp: '図書館', article: 'a' },
  { en: 'school', jp: '学校', article: 'a' },
  { en: 'station', jp: '駅', article: 'a' },
  { en: 'museum', jp: '博物館', article: 'a' },
  { en: 'zoo', jp: '動物園', article: 'a' },
  { en: 'pool', jp: 'プール', article: 'a' },
  { en: 'mountain', jp: '山', article: 'a' },
  { en: 'restaurant', jp: 'レストラン', article: 'a' },
  { en: 'hospital', jp: '病院', article: 'a' },
  { en: 'airport', jp: '空港', article: 'an' },
  { en: 'castle', jp: '城', article: 'a' },
  { en: 'garden', jp: '庭園', article: 'a' },
  { en: 'market', jp: '市場', article: 'a' },
  { en: 'stadium', jp: 'スタジアム', article: 'a' },
  { en: 'aquarium', jp: '水族館', article: 'an' },
  { en: 'temple', jp: 'お寺', article: 'a' },
  { en: 'shrine', jp: '神社', article: 'a' },
  { en: 'theater', jp: '劇場', article: 'a' },
  { en: 'bookstore', jp: '本屋', article: 'a' },
]

export const DESTINATIONS: { en: string; jp: string }[] = [
  { en: 'Japan', jp: '日本' },
  { en: 'Kyoto', jp: '京都' },
  { en: 'Osaka', jp: '大阪' },
  { en: 'Tokyo', jp: '東京' },
  { en: 'Hokkaido', jp: '北海道' },
  { en: 'Okinawa', jp: '沖縄' },
  { en: 'London', jp: 'ロンドン' },
  { en: 'Paris', jp: 'パリ' },
  { en: 'America', jp: 'アメリカ' },
  { en: 'Australia', jp: 'オーストラリア' },
  { en: 'Hawaii', jp: 'ハワイ' },
  { en: 'Canada', jp: 'カナダ' },
  { en: 'China', jp: '中国' },
  { en: 'Korea', jp: '韓国' },
  { en: 'Italy', jp: 'イタリア' },
  { en: 'Spain', jp: 'スペイン' },
  { en: 'Germany', jp: 'ドイツ' },
  { en: 'Egypt', jp: 'エジプト' },
  { en: 'India', jp: 'インド' },
  { en: 'Brazil', jp: 'ブラジル' },
]

export const JOBS: Noun[] = [
  { en: 'teacher', jp: '先生', article: 'a' },
  { en: 'doctor', jp: '医者', article: 'a' },
  { en: 'nurse', jp: '看護師', article: 'a' },
  { en: 'pilot', jp: 'パイロット', article: 'a' },
  { en: 'singer', jp: '歌手', article: 'a' },
  { en: 'actor', jp: '俳優', article: 'an' },
  { en: 'artist', jp: '芸術家', article: 'an' },
  { en: 'scientist', jp: '科学者', article: 'a' },
  { en: 'engineer', jp: 'エンジニア', article: 'an' },
  { en: 'chef', jp: 'シェフ', article: 'a' },
  { en: 'writer', jp: '作家', article: 'a' },
  { en: 'dancer', jp: 'ダンサー', article: 'a' },
  { en: 'athlete', jp: '選手', article: 'an' },
  { en: 'farmer', jp: '農家', article: 'a' },
  { en: 'police officer', jp: '警察官', article: 'a' },
  { en: 'firefighter', jp: '消防士', article: 'a' },
  { en: 'vet', jp: '獣医', article: 'a' },
  { en: 'dentist', jp: '歯医者', article: 'a' },
  { en: 'designer', jp: 'デザイナー', article: 'a' },
  { en: 'programmer', jp: 'プログラマー', article: 'a' },
]

export const INSTRUMENTS: { en: string; jp: string }[] = [
  { en: 'piano', jp: 'ピアノ' },
  { en: 'violin', jp: 'バイオリン' },
  { en: 'guitar', jp: 'ギター' },
  { en: 'flute', jp: 'フルート' },
  { en: 'drums', jp: 'ドラム' },
  { en: 'trumpet', jp: 'トランペット' },
  { en: 'recorder', jp: 'リコーダー' },
  { en: 'clarinet', jp: 'クラリネット' },
  { en: 'harp', jp: 'ハープ' },
  { en: 'saxophone', jp: 'サックス' },
]

export const LANGUAGES: { en: string; jp: string }[] = [
  { en: 'English', jp: '英語' },
  { en: 'Japanese', jp: '日本語' },
  { en: 'French', jp: 'フランス語' },
  { en: 'Spanish', jp: 'スペイン語' },
  { en: 'German', jp: 'ドイツ語' },
  { en: 'Chinese', jp: '中国語' },
  { en: 'Korean', jp: '韓国語' },
  { en: 'Italian', jp: 'イタリア語' },
  { en: 'Russian', jp: 'ロシア語' },
  { en: 'Portuguese', jp: 'ポルトガル語' },
]

export const FAMILY: { en: string; jp: string }[] = [
  { en: 'sister', jp: '姉' },
  { en: 'brother', jp: '兄' },
  { en: 'mother', jp: '母' },
  { en: 'father', jp: '父' },
  { en: 'friend', jp: '友達' },
  { en: 'teacher', jp: '先生' },
  { en: 'classmate', jp: 'クラスメート' },
  { en: 'cousin', jp: 'いとこ' },
  { en: 'uncle', jp: 'おじ' },
  { en: 'aunt', jp: 'おば' },
]

export const ADJ_STATE: { en: string; jp: string }[] = [
  { en: 'tired', jp: '疲れて' },
  { en: 'busy', jp: '忙しくて' },
  { en: 'sick', jp: '具合が悪くて' },
  { en: 'scared', jp: '怖がって' },
  { en: 'sleepy', jp: '眠くて' },
  { en: 'sad', jp: '悲しくて' },
  { en: 'nervous', jp: '緊張して' },
  { en: 'excited', jp: '興奮して' },
  { en: 'shy', jp: '恥ずかしがって' },
  { en: 'cold', jp: '寒くて' },
]

export const PLACE_TYPES: { en: string; jp: string }[] = [
  { en: 'restaurant', jp: 'レストラン' },
  { en: 'cafe', jp: 'カフェ' },
  { en: 'hotel', jp: 'ホテル' },
  { en: 'supermarket', jp: 'スーパー' },
  { en: 'bookstore', jp: '本屋' },
  { en: 'park', jp: '公園' },
  { en: 'hospital', jp: '病院' },
  { en: 'school', jp: '学校' },
  { en: 'gym', jp: 'ジム' },
  { en: 'movie theater', jp: '映画館' },
]

export const SPORTS_PLAY: { en: string; jp: string }[] = [
  { en: 'soccer', jp: 'サッカー' },
  { en: 'baseball', jp: '野球' },
  { en: 'basketball', jp: 'バスケットボール' },
  { en: 'tennis', jp: 'テニス' },
  { en: 'volleyball', jp: 'バレーボール' },
  { en: 'badminton', jp: 'バドミントン' },
  { en: 'hockey', jp: 'ホッケー' },
  { en: 'golf', jp: 'ゴルフ' },
  { en: 'handball', jp: 'ハンドボール' },
  { en: 'rugby', jp: 'ラグビー' },
  { en: 'dodgeball', jp: 'ドッジボール' },
  { en: 'table tennis', jp: '卓球' },
]

export const PLACES_OUTDOOR: { en: string; jp: string }[] = [
  { en: 'park', jp: '公園' },
  { en: 'gym', jp: '体育館' },
  { en: 'field', jp: '広場' },
  { en: 'stadium', jp: 'スタジアム' },
  { en: 'yard', jp: '庭' },
  { en: 'pool', jp: 'プール' },
  { en: 'court', jp: 'コート' },
  { en: 'ground', jp: 'グラウンド' },
  { en: 'playground', jp: '遊び場' },
  { en: 'garden', jp: '庭園' },
]

export const DAYS_OF_WEEK: { en: string; jp: string }[] = [
  { en: 'Monday', jp: '月曜日' },
  { en: 'Tuesday', jp: '火曜日' },
  { en: 'Wednesday', jp: '水曜日' },
  { en: 'Thursday', jp: '木曜日' },
  { en: 'Friday', jp: '金曜日' },
  { en: 'Saturday', jp: '土曜日' },
  { en: 'Sunday', jp: '日曜日' },
]

export const OBJECTS_WRITTEN: Noun[] = [
  { en: 'book', jp: '本', article: 'a' },
  { en: 'novel', jp: '小説', article: 'a' },
  { en: 'poem', jp: '詩', article: 'a' },
  { en: 'song', jp: '歌', article: 'a' },
  { en: 'letter', jp: '手紙', article: 'a' },
  { en: 'story', jp: '物語', article: 'a' },
  { en: 'article', jp: '記事', article: 'an' },
  { en: 'play', jp: '戯曲', article: 'a' },
  { en: 'essay', jp: 'エッセイ', article: 'an' },
  { en: 'textbook', jp: '教科書', article: 'a' },
]
