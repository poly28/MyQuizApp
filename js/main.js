'use strict';

const question = document.getElementById('question');
const choices = document.getElementById('choices');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const scoreLabel = document.querySelector('#result > p');

// 教材で使用した選択肢
// const quizSet = shuffle([
// 	{ q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖'] },
// 	{ q: '2の8乗は？', c: ['256', '512', '1024'] },
// 	{
// 		q: '次のうち、最初にリリースされた言語は？',
// 		c: ['Python', 'JavaScript', 'HTML'],
// 	},
// ]);
const quizSet = shuffle([
	{
		q: '有名な「辛子明太子」は、何の卵巣を漬け込んだもの？',
		c: ['スケトウダラ', 'ふぐ', 'マグロ', '鮭'],
	},
	{
		q: '元軍の侵略を防ぐための「元寇防塁跡」は、誰の命令で作られた？',
		c: ['北条時宗', '北条経時', '北条時政', '北条時行'],
	},
	{
		q: '博多祇園山笠「追い山」のスタート地点となるのは？',
		c: ['櫛田神社', '愛宕神社', '竈門神社', '櫻井神社'],
	},
]);
let currentNum = 0;
let isAnswered;
let score = 0;

function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[j], arr[i]] = [arr[i], arr[j]];
	}
	return arr;
}

function checkAnswer(li) {
	// if (isAnswered === true) {
	if (isAnswered) {
		return;
	}
	isAnswered = true;
	if (li.textContent === quizSet[currentNum].c[0]) {
		li.classList.add('correct');
		score++;
	} else {
		li.classList.add('wrong');
	}
	btn.classList.remove('disabled');
}

function setQuiz() {
	isAnswered = false;
	question.textContent = quizSet[currentNum].q;
	while (choices.firstChild) {
		choices.removeChild(choices.firstChild);
	}
	const shuffledChoices = shuffle([...quizSet[currentNum].c]);

	shuffledChoices.forEach((choice) => {
		const li = document.createElement('li');
		li.textContent = choice;
		li.addEventListener('click', () => {
			checkAnswer(li);
		});
		choices.appendChild(li);
	});

	if (currentNum === quizSet.length - 1) {
		btn.textContent = 'Show Score';
	}
}

setQuiz();

btn.addEventListener('click', () => {
	if (btn.classList.contains('disabled')) {
		return;
	}
	btn.classList.add('disabled');

	if (currentNum === quizSet.length - 1) {
		result.classList.remove('hidden');
		scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
	} else {
		currentNum++;
		setQuiz();
	}
});
