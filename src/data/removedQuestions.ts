/**
 * Generated questions that are held back because the sentence doesn't make
 * sense, even though it's grammatical.
 *
 * The template files build sentences by pairing lists round-robin (animals ×
 * adjectives, places × activities, …), and some pairings come out absurd:
 * "That mouse is very tall.", "My elephant likes tomatoes.", "Fresh shoes
 * are sold at this hospital." A learner can't tell that a sentence is
 * nonsense on purpose, so these are dropped from the banks here.
 *
 * They're listed by id rather than removed from the templates because ids
 * come from list positions: taking an item out of a template list would
 * renumber every question after it and point players' saved review history
 * at the wrong sentences. questions.test.ts fails if an id here no longer
 * exists, so the list can't go stale.
 */

/** `<prefix>-<index>` for each listed index, e.g. range('e4-t2', 4, 6). */
const ids = (prefix: string, ...indices: number[]) => indices.map((i) => `${prefix}-${i}`)
const range = (prefix: string, from: number, to: number) =>
  ids(prefix, ...Array.from({ length: to - from + 1 }, (_, k) => from + k))

export const REMOVED_QUESTION_IDS: ReadonlySet<string> = new Set([
  // --- 英検4級 ------------------------------------------------------------
  // "That mouse is very tall.", "That lion is very kind."
  ...ids('e4-t2', 4, 6, 7, 8, 13, 14, 16, 17, 18),
  // "We play badminton in the pool.", "We play rugby in the garden."
  ...ids('e4-t8', 2, 4, 5, 7, 9),
  // "My elephant likes tomatoes.", "My fish likes strawberries."
  ...ids('e4-t10', 1, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 19),
  // "How many lions do you have?"
  ...ids('e4-t11', 6, 7, 8, 9, 10, 11, 12),
  // "There is a bike on the desk."
  ...ids('e4-t13', 7),
  // "I went to the mountain yesterday."
  ...ids('e4-t14', 7),
  // "They are playing in the hospital."
  ...ids('e4-t15', 1, 3, 4, 7, 8, 9, 10, 11, 13, 15, 16, 17, 18, 19),
  // "Where is the mountain?"
  ...ids('e4-t16', 7),
  // "This umbrella is younger than that one."
  ...ids('e4-t17', 4, 9, 14, 17, 19),
  // "I walk to the airport every day."
  ...ids('e4-t18', 4, 5, 7, 8, 9, 10, 11, 14, 15, 16, 17, 18),

  // --- 英検3級 ------------------------------------------------------------
  // "Because it was too sunny, we stayed home."
  ...ids('e3-t8', 7, 8),
  // "She can swim butterfly very well."
  ...ids('e3-t10', 9),
  // "My father arrives sooner than me."
  ...ids('e3-t18', 3),

  // --- 英検準2級 ----------------------------------------------------------
  // "The girl who is practicing tennis is my uncle."
  ...ids('ep2-t6', 2, 3, 5, 6, 8),
  // "This is the cake that he lost."
  ...ids('ep2-t7', 4),
  // "Look at the cow jumping over there."
  ...ids('ep2-t8', 2, 12, 13, 19),
  // "This song is as useful as that one."
  ...ids('ep2-t12', 2, 3, 4, 5, 6, 7, 9),
  // "He was too sleepy to sleep."
  ...ids('ep2-t13', 4, 7, 9),
  // "Fresh shoes are sold at this hospital." — none of these pairings work
  ...range('ep2-t17', 0, 9),
  // "Look at the fish sleeping under the tree."
  ...ids('ep2-t18', 3),

  // --- 英検2級 ------------------------------------------------------------
  // "This is the house where the war ended."
  ...ids('e2-t2', 5),
  // "Being shy, she drank some water."
  ...ids('e2-t4', 4, 6, 7, 8, 9),
  // "No matter how excited he is, he always keeps smiling."
  ...ids('e2-t10', 4, 7, 8, 9),
  // "She laughed as if it were funny."
  ...ids('e2-t15', 6),

  // --- 高校入試 -----------------------------------------------------------
  // "I can see an elephant running near the river."
  ...ids('kn-t3', 2, 6, 7, 10, 11, 12, 13, 19),
  // "This pig is taller than that one."
  ...ids('kn-t4', 3, 7, 15, 18, 19),
  // "Would you like some onions?"
  ...ids('kn-t5', 9, 11, 12, 13, 14, 15),
  // "This is the mountain where I first met her."
  ...ids('kn-t7', 7),
  // "I need a quiet station to study in."
  ...range('kn-t8', 2, 11),
  ...range('kn-t8', 13, 19),
  // "Please call me as soon as you arrive at the mountain."
  ...ids('kn-t9', 7),
  // "Many languages are spoken in Kyoto."
  ...ids('kn-t11', 0, 1, 2, 3, 4, 5, 7, 10, 13, 14, 15, 16, 17, 19),
  // "Japanese is spoken in many countries."
  ...ids('kn-t18', 1, 6, 7),
  // "I don't know how to speak Japanese." (for a Japanese learner)
  ...ids('kn-t19', 1),
  // "This park isn't open on Sundays, is it?"
  ...ids('kn-t23', 5),
  // "Many children were playing in the ground at that time."
  ...ids('kn-t25', 7),
  // "This letter was written by a famous author."
  ...ids('kn-t27', 3, 4),
  // "Have you ever read this song?"
  ...ids('kn-t28', 3, 4),
  // "Please tell me how to use this pen."
  ...range('kn-t30', 0, 7),
  ...range('kn-t30', 9, 13),
  ...range('kn-t30', 15, 18),
  // "My parents let me keep a lion."
  ...range('kn-t31', 5, 16),
  // "This zoo has not only dogs but also tigers." — none of these pairings work
  ...range('kn-t32', 0, 19),
])
