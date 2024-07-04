const firstNick = [
  "빨간",
  "파란",
  "노란",
  "초록",
  "검은",
  "흰",
  "분홍",
  "보라",
  "주황",
  "회색의",
  "기쁜",
  "슬픈",
  "행복한",
  "우울한",
  "화난",
  "놀란",
  "실망한",
  "흥분한",
  "긴장한",
  "편안한",
  "지루한",
  "두려운",
  "사랑스러운",
  "외로운",
  "고마운",
  "미안한",
  "자랑스러운",
  "부끄러운",
  "만족스러운",
  "불안한",
  "희망찬",
  "절망적인",
  "역겨운",
  "죄책감의",
  "뿌듯한",
  "억울한",
  "초조한",
  "분노한",
  "서운한",
  "안도한",
  "아쉬운",
  "황홀한",
  "충격적인",
  "안타까운",
  "질투하는",
  "속상한",
  "후회스러운",
  "망설이는",
  "초연한",
  "의심스러운",
];

const middleNick = [
  "사자",
  "호랑이",
  "코끼리",
  "기린",
  "코알라",
  "캥거루",
  "판다",
  "북극곰",
  "치타",
  "고릴라",
  "침팬지",
  "하마",
  "코뿔소",
  "재규어",
  "퓨마",
  "늑대",
  "여우",
  "수달",
  "하이에나",
  "스컹크",
  "담비",
  "말",
  "소",
  "양",
  "염소",
  "돼지",
  "토끼",
  "다람쥐",
  "너구리",
  "고양이",
  "강아지",
  "쥐",
  "햄스터",
  "고슴도치",
  "까치",
  "비둘기",
  "참새",
  "독수리",
  "매",
  "부엉이",
  "앵무새",
  "펭귄",
  "오리",
  "백조",
  "거위",
  "타조",
  "플라밍고",
  "갈매기",
  "상어",
  "고래",
];

const createRandomNick = () => {
  let firstIndex = Math.floor(Math.random() * firstNick.length);
  let middleIndex = Math.floor(Math.random() * middleNick.length);
  let lastNum = Math.floor(Math.random() * 100);
  return `${firstNick[firstIndex]}${middleNick[middleIndex]}${lastNum}`;
};

export { createRandomNick };